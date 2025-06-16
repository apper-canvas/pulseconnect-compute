import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { userService, postService } from '@/services'

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'all', label: 'All', icon: 'Search' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'posts', label: 'Posts', icon: 'FileText' },
    { id: 'hashtags', label: 'Hashtags', icon: 'Hash' }
  ]

  const popularHashtags = [
    '#TechTuesday', '#Photography', '#Travel', '#Design', '#Coding'
  ]

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  useEffect(() => {
    if (query.length > 0) {
      searchContent()
    }
  }, [query, activeTab])

  const searchContent = async () => {
    setLoading(true)
    try {
      const [allUsers, allPosts] = await Promise.all([
        userService.getAll(),
        postService.getAll()
      ])

      const filteredUsers = allUsers.filter(user =>
        user.displayName.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
      )

      const filteredPosts = allPosts.filter(post =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        (post.hashtags && post.hashtags.some(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        ))
      )

      setUsers(filteredUsers)
      setPosts(filteredPosts)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderResults = () => {
    if (!query) {
      return (
        <div className="space-y-6">
          <div>
            <Text variant="heading" weight="semibold" className="mb-4">
              Popular hashtags
            </Text>
            <div className="flex flex-wrap gap-2">
              {popularHashtags.map((hashtag, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setQuery(hashtag)}
                  className="px-3 py-2 bg-gray-100 text-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  {hashtag}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3 p-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }

    const showUsers = activeTab === 'all' || activeTab === 'users'
    const showPosts = activeTab === 'all' || activeTab === 'posts'

    return (
      <div className="space-y-6">
        {showUsers && users.length > 0 && (
          <div>
            <Text variant="heading" weight="semibold" className="mb-4">
              Users
            </Text>
            <div className="space-y-3">
              {users.slice(0, 5).map((user, index) => (
                <motion.div
                  key={user.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.displayName}
                    size="md"
                    isOnline={user.isOnline}
                  />
                  <div className="flex-1 min-w-0">
                    <Text weight="semibold" className="truncate">
                      {user.displayName}
                    </Text>
                    <Text size="sm" color="gray-500" className="truncate">
                      @{user.username}
                    </Text>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {showPosts && posts.length > 0 && (
          <div>
            <Text variant="heading" weight="semibold" className="mb-4">
              Posts
            </Text>
            <div className="space-y-3">
              {posts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <Text className="line-clamp-2 mb-2">
                    {post.content}
                  </Text>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <ApperIcon name="Heart" size={14} />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ApperIcon name="MessageCircle" size={14} />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {users.length === 0 && posts.length === 0 && (
          <div className="text-center py-12">
            <ApperIcon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
            <Text weight="medium" color="gray-600">
              No results found
            </Text>
            <Text size="sm" color="gray-500" className="mt-2">
              Try adjusting your search terms
            </Text>
          </div>
        )}
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <Input
                type="text"
                placeholder="Search users, posts, hashtags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                icon="Search"
                iconPosition="left"
                className="flex-1"
                autoFocus
              />
              <Button variant="ghost" size="sm" icon="X" onClick={onClose} />
            </div>

            {/* Tabs */}
            <div className="flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
          </div>

          {/* Results */}
          <div className="p-6 overflow-y-auto max-h-96 scrollbar-thin">
            {renderResults()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SearchOverlay