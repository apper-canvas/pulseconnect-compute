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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSuggestedUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const users = await userService.getSuggested()
        setSuggestedUsers(users)
      } catch (err) {
        setError(err.message || 'Failed to load suggested users')
        toast.error('Failed to load suggestions')
      } finally {
        setLoading(false)
      }
    }

    loadSuggestedUsers()
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
            Failed to load suggestions
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

        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-4">
            <ApperIcon name="TrendingUp" size={18} className="text-primary" />
            <Text variant="heading" weight="semibold">What's happening</Text>
          </div>
          
          <div className="space-y-4">
            {[
              { topic: 'Technology', posts: '1.2K posts' },
              { topic: 'Photography', posts: '892 posts' },
              { topic: 'Travel', posts: '634 posts' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
              >
                <Text size="sm" color="gray-500">Trending in Technology</Text>
                <Text weight="semibold" className="mt-1">{item.topic}</Text>
                <Text size="sm" color="gray-500">{item.posts}</Text>
              </motion.div>
            ))}
          </div>
        </motion.div>

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