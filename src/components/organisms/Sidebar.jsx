import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import UserCard from '@/components/molecules/UserCard'
import HashtagList from '@/components/molecules/HashtagList'
import Text from '@/components/atoms/Text'
import ApperIcon from '@/components/ApperIcon'
import { userService } from '@/services'
import { toast } from 'react-toastify'

const Sidebar = () => {
  const [currentUser] = useState({
    Id: 1,
    displayName: 'Sarah Chen',
    username: 'sarah_chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b787?w=400&h=400&fit=crop&crop=face',
    followers: 1247,
    following: 342,
    posts: 89
  })

  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSidebarData = async () => {
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

    loadSidebarData()
  }, [])

  if (loading) {
    return (
      <aside className="w-full h-full bg-surface-50 p-6 overflow-y-auto scrollbar-thin">
        <div className="space-y-6">
          {/* User Stats Skeleton */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Skeleton */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
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
            Failed to load sidebar
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
        {/* Current User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="text-center">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <Text variant="heading" weight="semibold" className="mb-1">
              {currentUser.displayName}
            </Text>
            <Text size="sm" color="gray-500" className="mb-4">
              @{currentUser.username}
            </Text>
            
            <div className="flex justify-between text-center">
              <div>
                <Text weight="semibold">{currentUser.posts}</Text>
                <Text size="xs" color="gray-500">Posts</Text>
              </div>
              <div>
                <Text weight="semibold">{currentUser.followers}</Text>
                <Text size="xs" color="gray-500">Followers</Text>
              </div>
              <div>
                <Text weight="semibold">{currentUser.following}</Text>
                <Text size="xs" color="gray-500">Following</Text>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trending Hashtags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <HashtagList />
        </motion.div>

        {/* Suggested Users */}
        {suggestedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-2 mb-4">
              <ApperIcon name="UserPlus" size={18} className="text-primary" />
              <Text variant="heading" weight="semibold">Suggested for you</Text>
            </div>
            
            <div className="space-y-3">
              {suggestedUsers.map((user, index) => (
                <motion.div
                  key={user.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <UserCard user={user} showFollowButton={true} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Active Now */}
        {onlineUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
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
      </div>
    </aside>
  )
}

export default Sidebar