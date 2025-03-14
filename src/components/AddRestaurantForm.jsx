import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload } from 'react-icons/fa';

const AddRestaurantForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
    adminPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.adminPassword === 'admin123') { // I praktiken skulle detta hanteras säkrare
      onSubmit({
        id: Date.now(), // Enkelt sätt att generera unika ID
        name: formData.name,
        location: formData.location,
        description: formData.description,
        image: formData.image
      });
    } else {
      alert('Felaktigt administratörslösenord');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-pancake-brown mb-4">
          Lägg till ny restaurang
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Restaurangnamn</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Plats</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Beskrivning</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Bild URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Administratörslösenord</label>
            <input
              type="password"
              value={formData.adminPassword}
              onChange={(e) => setFormData({...formData, adminPassword: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="bg-pancake-brown text-white px-4 py-2 rounded-lg hover:bg-opacity-90 flex-1 flex items-center justify-center gap-2"
            >
              <FaUpload />
              Lägg till restaurang
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddRestaurantForm;