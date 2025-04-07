import React, { useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiClock,
  FiSettings,
  FiMap,
  FiNavigation,
  FiX,
  FiStar,
  FiHome,
  FiBriefcase,
  FiMapPin
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const YandexMapSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");

  const favorites = [
    { id: 1, name: "Home", address: "Tashkent, Yunusobod 12", icon: <FiHome />, color: "text-blue-500" },
    { id: 2, name: "Work", address: "Tashkent, Mirobod 45", icon: <FiBriefcase />, color: "text-purple-500" },
    { id: 3, name: "Gym", address: "Tashkent, Chilonzor 23", icon: <FiMapPin />, color: "text-red-500" }
  ];

  const history = [
    { id: 1, query: "Tashkent Center", time: "2 hours ago" },
    { id: 2, query: "Magic City", time: "Yesterday" },
    { id: 3, query: "Navoiy Theater", time: "3 days ago" }
  ];

  const quickFilters = [
    { name: "Restaurant", icon: "🍽️" },
    { name: "Store", icon: "🛒" },
    { name: "Hospital", icon: "🏥" },
    { name: "Park", icon: "🌳" },
    { name: "ATM", icon: "💳" },
    { name: "Gas Station", icon: "⛽" },
    { name: "Cafe", icon: "☕" },
    { name: "Hotel", icon: "🏨" }
  ];

  return (
    <div className={`fixed top-0 left-0 h-full z-50 flex ${isOpen ? "w-72 md:w-80" : "w-16"}`}>
      {/* Sidebar Container */}
      <motion.div 
        className={`bg-white dark:bg-gray-900 shadow-xl flex flex-col h-full w-full rounded-r-xl overflow-hidden border-r border-gray-200 dark:border-gray-800`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gradient-to-tr from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full absolute -right-3 top-5 shadow-lg z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FiX size={18} /> : <FiMap size={18} />}
        </motion.button>

        {/* Header */}
        <div className="p-4 border-b dark:border-gray-800 flex items-center">
          <div className={`bg-green-500 p-2 rounded-lg ${isOpen ? "mr-3" : "mx-auto"}`}>
            <FiMap className="text-white" size={20} />
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Yandex Maps</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Explore your city</p>
            </motion.div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b dark:border-gray-800">
          {[
            { id: "search", icon: FiSearch, label: "Search" },
            { id: "favorites", icon: FiHeart, label: "Saved" },
            { id: "history", icon: FiClock, label: "History" }
          ].map(({ id, icon: Icon, label }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-3 flex items-center justify-center text-sm font-medium relative ${
                activeTab === id
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Icon className={`${isOpen ? "mr-2" : ""}`} />
              {isOpen && label}
              {activeTab === id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"
                  layoutId="underline"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            {activeTab === "search" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 pl-10 border rounded-xl dark:bg-gray-800 dark:border-gray-700 bg-gray-50 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  />
                  <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
                </div>

                <motion.button 
                  className="w-full flex items-center p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-200 transition-all"
                  whileHover={{ x: 5 }}
                >
                  <FiNavigation className="mr-3 text-green-500" />
                  <span>My Current Location</span>
                </motion.button>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
                    <FiStar className="mr-2 text-yellow-500" />
                    Quick Filters
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {quickFilters.map((item) => (
                      <motion.button
                        key={item.name}
                        className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 rounded-xl transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xl mb-1">{item.icon}</span>
                        <span className="text-xs">{item.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "favorites" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {favorites.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 rounded-xl transition-all cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg ${item.color} bg-opacity-20 mr-3`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.address}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 rounded-xl transition-all cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{item.query}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                      </div>
                      <button className="text-gray-400 hover:text-green-500 transition-colors">
                        <FiNavigation />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-3 border-t dark:border-gray-800">
          <motion.button 
            className="w-full flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <FiSettings className={isOpen ? "mr-2" : ""} />
            {isOpen && "Settings"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default YandexMapSidebar;