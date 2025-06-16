import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { postService } from '@/services'
import { toast } from 'react-toastify'

const PostComposer = ({ onPostCreated, className = '' }) => {
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const currentUser = {
    Id: 1,
    displayName: 'Sarah Chen',
    username: 'sarah_chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b787?w=400&h=400&fit=crop&crop=face'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      toast.error('Please write something to share')
      return
    }

    setIsPosting(true)
    try {
      // Extract hashtags from content
      const hashtagRegex = /#\w+/g
      const hashtags = content.match(hashtagRegex) || []
      
      const newPost = {
        authorId: currentUser.Id,
        content: content.trim(),
        location: location.trim(),
        hashtags,
        media: [] // For now, we'll handle media upload later
      }

      const createdPost = await postService.create(newPost)
      
      // Reset form
      setContent('')
      setLocation('')
      setShowOptions(false)
      
      toast.success('Post shared successfully!')
      onPostCreated?.(createdPost)
    } catch (error) {
      toast.error('Failed to share post')
    } finally {
      setIsPosting(false)
    }
  }

  const characterLimit = 280
  const remainingChars = characterLimit - content.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.displayName}
            size="md"
          />
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 bg-transparent"
              rows={3}
              maxLength={characterLimit}
            />
            
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <ApperIcon name="MapPin" size={16} className="text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </motion.div>
            )}
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 hover:text-primary transition-colors duration-200"
                  title="Add photo"
                >
                  <ApperIcon name="Camera" size={20} />
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 hover:text-primary transition-colors duration-200"
                  title="Add video"
                >
                  <ApperIcon name="Video" size={20} />
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowOptions(!showOptions)}
                  className={`transition-colors duration-200 ${
                    showOptions ? 'text-primary' : 'text-gray-500 hover:text-primary'
                  }`}
                  title="Add location"
                >
                  <ApperIcon name="MapPin" size={20} />
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 hover:text-primary transition-colors duration-200"
                  title="Add emoji"
                >
                  <ApperIcon name="Smile" size={20} />
                </motion.button>
              </div>
              
              <div className="flex items-center space-x-4">
                {content.length > 0 && (
                  <Text 
                    size="sm" 
                    color={remainingChars < 20 ? 'error' : 'gray-500'}
                    weight="medium"
                  >
                    {remainingChars}
                  </Text>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!content.trim() || isPosting}
                  className="min-w-[80px]"
                >
                  {isPosting ? 'Sharing...' : 'Share'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default PostComposer