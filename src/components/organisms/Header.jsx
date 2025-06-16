import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'
import { routes } from '@/config/routes'

const Header = ({ onSearchOpen }) => {
  const [notifications] = useState(3)

  const searchSuggestions = [
    'sarah_chen',
    'maya_artist', 
    'chris_travel',
    '#TechTuesday',
    '#Photography',
    '#Travel'
  ]

  return (
    <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between max-w-full">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-purple rounded-lg flex items-center justify-center">
            <Text color="white" weight="bold" size="lg">P</Text>
          </div>
          <Text variant="heading" weight="bold" size="xl" color="gray-900">
            PulseConnect
          </Text>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {Object.values(routes).map(route => (
            <NavLink
              key={route.id}
              to={route.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`
              }
            >
              <ApperIcon name={route.icon} size={18} />
              <Text weight="medium">{route.label}</Text>
            </NavLink>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <SearchBar
            placeholder="Search users, posts, hashtags..."
            suggestions={searchSuggestions}
            showSuggestions={true}
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button - Mobile */}
          <Button
            variant="ghost"
            size="sm"
            icon="Search"
            onClick={onSearchOpen}
            className="md:hidden"
          />

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 hover:text-primary transition-colors duration-200"
          >
            <ApperIcon name="Bell" size={20} />
            {notifications > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center"
              >
                {notifications}
              </motion.div>
            )}
          </motion.button>

          {/* Messages */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-primary transition-colors duration-200"
          >
            <ApperIcon name="MessageCircle" size={20} />
          </motion.button>

          {/* Profile Menu */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 p-1"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b787?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </motion.button>
        </div>
      </div>
    </header>
  )
}

export default Header