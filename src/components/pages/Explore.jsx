import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PostCard from '@/components/molecules/PostCard'
import HashtagList from '@/components/molecules/HashtagList'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { postService, userService } from '@/services'
import { toast } from 'react-toastify'

const Explore = () => {
  const [trendingPosts, setTrendingPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('trending')

  const categories = [
    { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
    { id: 'recent', label: 'Recent', icon: 'Clock' },
    { id: 'popular', label: 'Popular', icon: 'Heart' },
    { id: 'photos', label: 'Photos', icon: 'Camera' }
  ]

  useEffect(() => {
    const loadExploreData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [posts, allUsers] = await Promise.all([
          postService.getTrending(),
          userService.getAll()
        ])
        setTrendingPosts(posts)
        setUsers(allUsers)
      } catch (err) {
        setError(err.message || 'Failed to load explore data')
        toast.error('Failed to load explore content')
      } finally {
        setLoading(false)
      }
    }

    loadExploreData()
  }, [])

  const getPostAuthor = (authorId) => {
    return users.find(user => user.Id === authorId)
  }

  const getFilteredPosts = () => {
    switch (selectedCategory) {
      case 'recent':
        return [...trendingPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'popular':
        return [...trendingPosts].sort((a, b) => b.likes - a.likes)
      case 'photos':
        return trendingPosts.filter(post => post.media && post.media.length > 0)
      case 'trending':
      default:
        return trendingPosts
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="flex space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Posts Skeleton */}
            <div className="lg:col-span-2 space-y-6">
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
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="mb-3">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

  const filteredPosts = getFilteredPosts()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface-50"
    >
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Text variant="heading" size="2xl" weight="bold" className="mb-6">
            Explore
          </Text>
          
          {/* Category Filters */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                size="sm"
                icon={category.icon}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center"
                >
                  <ApperIcon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
                  <Text variant="heading" weight="semibold" color="gray-600" className="mb-2">
                    No posts found
                  </Text>
                  <Text size="sm" color="gray-500">
                    Try a different category or come back later for new content.
                  </Text>
                </motion.div>
              ) : (
                filteredPosts.map((post, index) => {
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Hashtags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <HashtagList />
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center space-x-2 mb-4">
                <ApperIcon name="TrendingUp" size={18} className="text-primary" />
                <Text variant="heading" weight="semibold">Trending Topics</Text>
              </div>
              
              <div className="space-y-4">
                {[
                  { topic: 'Tech Innovation', category: 'Technology', posts: '2.1K' },
                  { topic: 'Digital Art', category: 'Creative', posts: '1.8K' },
                  { topic: 'Remote Work', category: 'Lifestyle', posts: '1.5K' },
                  { topic: 'Sustainability', category: 'Environment', posts: '1.2K' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
                  >
                    <Text size="sm" color="gray-500">Trending in {item.category}</Text>
                    <Text weight="semibold" className="mt-1">{item.topic}</Text>
                    <Text size="sm" color="gray-500">{item.posts} posts</Text>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Explore