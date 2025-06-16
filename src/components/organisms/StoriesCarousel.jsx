import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StoryItem from '@/components/molecules/StoryItem'
import Text from '@/components/atoms/Text'
import ApperIcon from '@/components/ApperIcon'
import { storyService, userService } from '@/services'
import { toast } from 'react-toastify'

const StoriesCarousel = ({ className = '' }) => {
  const [stories, setStories] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true)
      setError(null)
      try {
        const [allStories, allUsers] = await Promise.all([
          storyService.getAll(),
          userService.getAll()
        ])
        
        // Group stories by user and get the latest one for each user
        const userStoriesMap = new Map()
        allStories.forEach(story => {
          if (!userStoriesMap.has(story.userId) || 
              new Date(story.createdAt) > new Date(userStoriesMap.get(story.userId).createdAt)) {
            userStoriesMap.set(story.userId, story)
          }
        })
        
        const latestStories = Array.from(userStoriesMap.values())
        setStories(latestStories)
        setUsers(allUsers)
      } catch (err) {
        setError(err.message || 'Failed to load stories')
        toast.error('Failed to load stories')
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [])

  const handleStoryClick = async (story) => {
    try {
      await storyService.view(story.Id)
      // Update view count in local state
      setStories(prev => prev.map(s => 
        s.Id === story.Id 
          ? { ...s, viewCount: s.viewCount + 1 }
          : s
      ))
      toast.success('Story viewed!')
    } catch (error) {
      toast.error('Failed to view story')
    }
  }

  const handleAddStory = () => {
    // In a real app, this would open a story creation modal
    toast.info('Story creation feature coming soon!')
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="w-12 h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center ${className}`}>
        <ApperIcon name="AlertCircle" size={24} className="text-gray-300 mx-auto mb-2" />
        <Text size="sm" color="gray-500">Failed to load stories</Text>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <ApperIcon name="Play" size={18} className="text-primary" />
        <Text variant="heading" weight="semibold">Stories</Text>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {/* Add Story Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StoryItem
            isAddStory={true}
            onClick={handleAddStory}
          />
        </motion.div>
        
        {/* User Stories */}
        {stories.map((story, index) => {
          const user = users.find(u => u.Id === story.userId)
          return (
            <motion.div
              key={story.Id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <StoryItem
                story={story}
                user={user}
                onClick={() => handleStoryClick(story)}
              />
            </motion.div>
          )
        })}
        
        {stories.length === 0 && (
          <div className="flex items-center justify-center w-full py-8">
            <div className="text-center">
              <ApperIcon name="Camera" size={32} className="text-gray-300 mx-auto mb-2" />
              <Text size="sm" color="gray-500">No stories yet</Text>
              <Text size="xs" color="gray-400">Be the first to share a story!</Text>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default StoriesCarousel