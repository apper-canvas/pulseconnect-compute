import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import UserCard from '@/components/molecules/UserCard'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { userService } from '@/services'
import { toast } from 'react-toastify'

const RightSidebar = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadRightSidebarData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [suggested, online] = await Promise.all([
          userService.getSuggested(),
          userService.getOnlineUsers()
        ])
        setSuggestedUsers(suggested)
        setOnlineUsers(online.slice(0, 5))
      } catch (err) {
        setError(err.message || 'Failed to load data')
        toast.error('Failed to load sidebar data')
      } finally {
        setLoading(false)
      }
    }

    loadRightSidebarData()
  }, [])

if (loading) {
    return (
      <aside className="w-full h-full bg-surface-50 p-6 overflow-y-auto scrollbar-thin">
        <div className="space-y-6">
          {/* Suggested Users Skeleton */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Now Skeleton */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    )
  }

if (error) {
    return (
      <aside className="w-full h-full bg-surface-50 p-6 overflow-y-auto scrollbar-thin">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-gray-300 mx-auto mb-4" />
          <Text weight="medium" color="gray-600">
            Failed to load sidebar data
          </Text>
          <Text size="sm" color="gray-500" className="mt-2">
            {error}
          </Text>
        </div>
      </aside>
    )
  }

return (
    <aside className="w-full h-full bg-surface-50 p-6 overflow-y-auto scrollbar-thin">
      <div className="space-y-6">
        {/* Suggested Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ApperIcon name="UserPlus" size={18} className="text-primary" />
              <Text variant="heading" weight="semibold">Who to follow</Text>
            </div>
            <Button variant="ghost" size="sm">
              See all
            </Button>
          </div>
          
          <div className="space-y-4">
            {suggestedUsers.map((user, index) => (
              <motion.div
                key={user.Id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <UserCard user={user} showFollowButton={true} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Now */}
        {onlineUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-2 mb-4">
              <ApperIcon name="Users" size={18} className="text-success" />
              <Text variant="heading" weight="semibold">Active Now</Text>
            </div>
            
            <div className="space-y-3">
              {onlineUsers.map((user, index) => (
                <motion.div
                  key={user.Id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
                >
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <Text size="sm" weight="medium" className="truncate">
                      {user.displayName}
                    </Text>
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <Text variant="heading" weight="semibold" className="mb-4">Quick Actions</Text>
          
          <div className="space-y-3">
            <Button variant="outline" size="sm" icon="Settings" className="w-full justify-start">
              Settings & Privacy
            </Button>
            <Button variant="outline" size="sm" icon="HelpCircle" className="w-full justify-start">
              Help Center
            </Button>
            <Button variant="outline" size="sm" icon="Users" className="w-full justify-start">
              Invite Friends
            </Button>
          </div>
        </motion.div>
      </div>
    </aside>
  )
}

export default RightSidebar