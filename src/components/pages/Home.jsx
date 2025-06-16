import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PostComposer from '@/components/organisms/PostComposer'
import StoriesCarousel from '@/components/organisms/StoriesCarousel'
import PostCard from '@/components/molecules/PostCard'
import Text from '@/components/atoms/Text'
import ApperIcon from '@/components/ApperIcon'
import { postService, userService } from '@/services'
import { toast } from 'react-toastify'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadFeedData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [allPosts, allUsers] = await Promise.all([
          postService.getAll(),
          userService.getAll()
        ])
        setPosts(allPosts)
        setUsers(allUsers)
      } catch (err) {
        setError(err.message || 'Failed to load feed')
        toast.error('Failed to load feed')
      } finally {
        setLoading(false)
      }
    }

    loadFeedData()
  }, [])

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev])
  }

  const getPostAuthor = (authorId) => {
    return users.find(user => user.Id === authorId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50">
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          {/* Stories Skeleton */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-20 mb-4"></div>
              <div className="flex space-x-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="w-12 h-3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Post Composer Skeleton */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="animate-pulse">
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Skeleton */}
          {[...Array(3)].map((_, i) => (
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
                <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                <div className="flex justify-between">
                  <div className="flex space-x-6">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
              </div>
            </div>
          ))}
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface-50"
    >
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Stories */}
        <StoriesCarousel />

        {/* Post Composer */}
        <PostComposer onPostCreated={handlePostCreated} />

        {/* Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center"
            >
              <ApperIcon name="MessageSquare" size={48} className="text-gray-300 mx-auto mb-4" />
              <Text variant="heading" weight="semibold" color="gray-600" className="mb-2">
                No posts yet
              </Text>
              <Text size="sm" color="gray-500" className="mb-4">
                Be the first to share something with your followers!
              </Text>
            </motion.div>
          ) : (
            posts.map((post, index) => {
              const author = getPostAuthor(post.authorId)
              return (
                <motion.div
                  key={post.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard post={post} author={author} />
                </motion.div>
              )
            })
          )}
        </div>

        {/* Load More Indicator */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <Text size="sm" color="gray-500">
              You're all caught up! 🎉
            </Text>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Home