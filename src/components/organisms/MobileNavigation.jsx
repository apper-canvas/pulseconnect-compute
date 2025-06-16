import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { routes } from '@/config/routes'

const MobileNavigation = () => {
  return (
    <nav className="flex-shrink-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around h-16 px-4">
        {Object.values(routes).map(route => (
          <NavLink
            key={route.id}
            to={route.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center space-y-1"
              >
                <ApperIcon 
                  name={route.icon} 
                  size={20}
                  className={isActive ? 'text-primary' : 'text-gray-500'}
                />
                <span className={`text-xs font-medium ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`}>
                  {route.label}
                </span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileNavigation