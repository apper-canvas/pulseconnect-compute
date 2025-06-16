import { motion } from 'framer-motion'
import Avatar from '@/components/atoms/Avatar'
import Text from '@/components/atoms/Text'

const StoryItem = ({ story, user, isAddStory = false, onClick, className = '' }) => {
  if (isAddStory) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`flex flex-col items-center space-y-2 p-2 ${className}`}
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-purple flex items-center justify-center">
                <span className="text-white text-lg font-bold">+</span>
              </div>
            </div>
          </div>
        </div>
        <Text size="xs" weight="medium" color="gray-600" className="text-center">
          Add Story
        </Text>
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center space-y-2 p-2 ${className}`}
    >
      <div className="relative">
        <div className="w-16 h-16 p-0.5 bg-gradient-purple rounded-full">
          <img
            src={user?.avatar}
            alt={user?.displayName}
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
        {story?.viewCount > 0 && (
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
            <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
              <Text size="xs" color="white" weight="bold">
                {story.viewCount > 99 ? '99+' : story.viewCount}
              </Text>
            </div>
          </div>
        )}
      </div>
      <Text size="xs" weight="medium" color="gray-600" className="text-center truncate w-16">
        {user?.displayName?.split(' ')[0] || 'User'}
      </Text>
    </motion.button>
  )
}

export default StoryItem