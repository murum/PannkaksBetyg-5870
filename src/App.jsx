import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { restaurants as initialRestaurants } from './data/restaurants';
import RestaurantCard from './components/RestaurantCard';
import RatingForm from './components/RatingForm';
import AddRestaurantForm from './components/AddRestaurantForm';
import { db } from './firebase';
import { collection, getDocs, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [globalRatings, setGlobalRatings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Hämta alla restauranger
        const restaurantsRef = collection(db, 'restaurants');
        const snapshot = await getDocs(restaurantsRef);
        
        // Om det inte finns några restauranger, lägg till startdata
        if (snapshot.empty) {
          console.log('Initierar startdata...');
          for (const restaurant of initialRestaurants) {
            await setDoc(doc(restaurantsRef, restaurant.id.toString()), restaurant);
          }
          setRestaurants(initialRestaurants);
        } else {
          const loadedRestaurants = [];
          snapshot.forEach((doc) => {
            loadedRestaurants.push(doc.data());
          });
          setRestaurants(loadedRestaurants);
        }

        // Hämta betyg
        const ratingsSnapshot = await getDocs(collection(db, 'ratings'));
        const ratingsData = {};
        ratingsSnapshot.forEach((doc) => {
          ratingsData[doc.id] = doc.data();
        });
        setGlobalRatings(ratingsData);
      } catch (error) {
        console.error("Error initializing data:", error);
        alert('Ett fel uppstod vid hämtning av data.');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleRatingSubmit = async (rating) => {
    try {
      const restaurantRef = doc(db, 'ratings', selectedRestaurant.id.toString());
      const ratingDoc = await getDoc(restaurantRef);
      
      let newRating;
      if (ratingDoc.exists()) {
        const currentRating = ratingDoc.data();
        newRating = {
          totalVotes: (currentRating.totalVotes || 0) + 1,
          criteria: Object.entries(rating).reduce((acc, [key, value]) => {
            const current = currentRating.criteria?.[key] || { sum: 0, count: 0 };
            acc[key] = {
              sum: current.sum + value,
              count: current.count + 1
            };
            return acc;
          }, {})
        };
        await updateDoc(restaurantRef, newRating);
      } else {
        newRating = {
          totalVotes: 1,
          criteria: Object.entries(rating).reduce((acc, [key, value]) => {
            acc[key] = { sum: value, count: 1 };
            return acc;
          }, {})
        };
        await setDoc(restaurantRef, newRating);
      }

      setGlobalRatings(prev => ({
        ...prev,
        [selectedRestaurant.id]: newRating
      }));
    } catch (error) {
      console.error("Error updating rating:", error);
      alert('Det gick inte att spara betyget. Försök igen senare.');
    }
    
    setSelectedRestaurant(null);
  };

  const handleAddRestaurant = async (newRestaurant) => {
    try {
      await setDoc(doc(db, 'restaurants', newRestaurant.id.toString()), newRestaurant);
      setRestaurants(prev => [...prev, newRestaurant]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert('Det gick inte att lägga till restaurangen. Försök igen senare.');
    }
  };

  const getAverageRating = (restaurantId) => {
    const rating = globalRatings[restaurantId];
    if (!rating) return { average: 0, votes: 0 };

    let totalSum = 0;
    let totalCount = 0;

    Object.values(rating.criteria || {}).forEach(criterion => {
      if (criterion.count > 0) {
        totalSum += criterion.sum;
        totalCount += criterion.count;
      }
    });

    return {
      average: totalCount > 0 ? (totalSum / totalCount).toFixed(1) : 0,
      votes: rating.totalVotes || 0
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dormy-light flex items-center justify-center">
        <div className="text-dormy-text text-xl">Laddar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dormy-light py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-7xl"
      >
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-6xl md:text-7xl font-display font-black text-dormy-text mb-4 tracking-tight"
          >
            Pannkaks<span className="text-dormy-primary">recensioner</span>
          </motion.h1>
          <p className="text-xl text-dormy-muted font-body mb-8">
            Hitta och betygsätt Sveriges bästa pannkakor
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowAddForm(true)}
            className="bg-dormy-primary text-white px-6 py-3 rounded-xl font-body font-medium flex items-center gap-2 mx-auto"
          >
            <FaPlus /> Lägg till restaurang
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={handleRestaurantSelect}
              rating={getAverageRating(restaurant.id)}
            />
          ))}
        </div>

        {selectedRestaurant && (
          <RatingForm
            restaurant={selectedRestaurant}
            onSubmit={handleRatingSubmit}
            onClose={() => setSelectedRestaurant(null)}
          />
        )}

        {showAddForm && (
          <AddRestaurantForm
            onSubmit={handleAddRestaurant}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </motion.div>
    </div>
  );
}

export default App;