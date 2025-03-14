import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUsers } from 'react-icons/fa';

const RestaurantCard = ({ restaurant, onSelect, rating }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff' }}
      className="bg-white rounded-2xl shadow-morph overflow-hidden cursor-pointer transition-all duration-300"
      onClick={() => onSelect(restaurant)}
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-display font-bold text-dormy-text mb-2">
          {restaurant.name}
        </h3>
        <p className="text-dormy-muted font-body mb-3">{restaurant.location}</p>
        <p className="text-dormy-text font-body mb-4">{restaurant.description}</p>
        
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-dormy-primary text-white px-4 py-2 rounded-xl font-body font-medium flex items-center gap-2"
          >
            <FaStar /> Betygsätt
          </motion.button>
          
          {rating.votes > 0 && (
            <div className="flex items-center gap-3">
              <span className="bg-dormy-highlight text-white px-3 py-1 rounded-xl text-sm font-bold flex items-center gap-1">
                <FaStar className="text-sm" /> {rating.average}
              </span>
              <span className="text-dormy-muted text-sm flex items-center gap-1">
                <FaUsers /> {rating.votes}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;