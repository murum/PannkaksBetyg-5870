// ... tidigare imports ...

const RatingForm = ({ restaurant, onSubmit, onClose }) => {
  // ... tidigare state och funktioner ...

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-morph p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-display font-bold text-dormy-text mb-6">
          Betygsätt {restaurant.name}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(criteria).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <label className="block text-dormy-text font-body font-medium">
                {label}
              </label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaStar
                      className={`text-3xl cursor-pointer ${
                        star <= ratings[key]
                          ? 'text-dormy-primary'
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleRatingChange(key, star)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="bg-dormy-primary text-white px-6 py-3 rounded-xl font-body font-medium flex-1"
            >
              Skicka betyg
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-dormy-text px-6 py-3 rounded-xl font-body font-medium"
            >
              Avbryt
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RatingForm;