import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PostCard from '@/components/molecules/PostCard'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { postService, userService } from '@/services'
import { toast } from 'react-toastify'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('posts')

  const tabs = [
    { id: 'posts', label: 'Posts', icon: 'Grid3X3' },
    { id: 'media', label: 'Media', icon: 'Image' },
    { id: 'likes', label: 'Likes', icon: 'Heart' }
  ]

  // Current user data (in a real app, this would come from auth context)
  const currentUserId = 1

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [userData, allPosts] = await Promise.all([
          userService.getById(currentUserId),
          postService.getAll()
        ])
        
        // Filter posts by current user
        const userPosts = allPosts.filter(post => post.authorId === currentUserId)
        
        setUser(userData)
        setPosts(userPosts)
      } catch (err) {
        setError(err.message || 'Failed to load profile')
        toast.error('Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [currentUserId])

  const getFilteredContent = () => {
    switch (activeTab) {
      case 'media':
        return posts.filter(post => post.media && post.media.length > 0)
      case 'likes':
        return [] // In a real app, this would be posts the user liked
      case 'posts':
      default:
        return posts
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Profile Header Skeleton */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
            <div className="animate-pulse">
              <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto md:mx-0"></div>
                <div className="flex-1 text-center md:text-left">
                  <div className="h-8 bg-gray-200 rounded w-48 mx-auto md:mx-0 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto md:mx-0 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-64 mx-auto md:mx-0 mb-6"></div>
                  <div className="flex justify-center md:justify-start space-x-8 mb-6">
                    <div className="text-center">
                      <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="animate-pulse">
                  <div className="flex space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-gray-300 mx-auto mb-4" />
          <Text variant="heading" weight="semibold" color="gray-600" className="mb-2">
            Something went wrong
          </Text>
          <Text size="sm" color="gray-500" className="mb-4">
            {error}
          </Text>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  const filteredContent = getFilteredContent()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface-50"
    >
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative mx-auto md:mx-0">
              <Avatar
                src={user?.avatar}
                alt={user?.displayName}
                size="2xl"
                className="w-32 h-32"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <ApperIcon name="Camera" size={16} />
              </motion.button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <Text variant="heading" size="2xl" weight="bold" className="mb-2">
                {user?.displayName}
              </Text>
              <Text size="lg" color="gray-600" className="mb-4">
                @{user?.username}
              </Text>
              
              {user?.bio && (
                <Text color="gray-700" className="mb-6 max-w-md">
                  {user.bio}
                </Text>
              )}
              
              {/* Stats */}
              <div className="flex justify-center md:justify-start space-x-8 mb-6">
                <div className="text-center">
                  <Text variant="heading" weight="bold" size="xl">
                    {user?.posts || 0}
                  </Text>
                  <Text size="sm" color="gray-600">Posts</Text>
                </div>
                <div className="text-center">
                  <Text variant="heading" weight="bold" size="xl">
                    {user?.followers || 0}
                  </Text>
                  <Text size="sm" color="gray-600">Followers</Text>
                </div>
                <div className="text-center">
                  <Text variant="heading" weight="bold" size="xl">
                    {user?.following || 0}
                  </Text>
                  <Text size="sm" color="gray-600">Following</Text>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-center md:justify-start space-x-4">
                <Button variant="primary" icon="Edit">
                  Edit Profile
                </Button>
                <Button variant="outline" icon="Share">
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <div className="flex space-x-1 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ApperIcon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {filteredContent.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center"
            >
              <ApperIcon 
                name={activeTab === 'posts' ? 'FileText' : activeTab === 'media' ? 'Image' : 'Heart'} 
                size={48} 
                className="text-gray-300 mx-auto mb-4" 
              />
              <Text variant="heading" weight="semibold" color="gray-600" className="mb-2">
                No {activeTab} yet
              </Text>
              <Text size="sm" color="gray-500">
                {activeTab === 'posts' 
                  ? 'Share your first post to get started!'
                  : activeTab === 'media'
                  ? 'Share photos and videos to see them here.'
                  : 'Posts you like will appear here.'
                }
              </Text>
            </motion.div>
          ) : (
            filteredContent.map((post, index) => (
              <motion.div
                key={post.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard post={post} author={user} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Profile