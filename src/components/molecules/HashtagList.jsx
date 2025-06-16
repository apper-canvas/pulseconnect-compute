import { motion } from 'framer-motion'
import Text from '@/components/atoms/Text'
import ApperIcon from '@/components/ApperIcon'

const HashtagList = ({ hashtags = [], title = "Trending", className = '' }) => {
  const trendingHashtags = [
    { tag: '#TechTuesday', posts: 1247 },
    { tag: '#Photography', posts: 892 },
    { tag: '#Travel', posts: 634 },
    { tag: '#Design', posts: 456 },
    { tag: '#Coding', posts: 234 }
  ]

  const displayHashtags = hashtags.length > 0 ? hashtags : trendingHashtags

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <ApperIcon name="TrendingUp" size={18} className="text-primary" />
        <Text variant="heading" weight="semibold">{title}</Text>
      </div>
      
      <div className="space-y-3">
        {displayHashtags.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
            className="w-full text-left p-2 rounded-lg transition-colors duration-200"
          >
            <Text 
              weight="semibold" 
              color="primary" 
              className="hover:text-secondary transition-colors duration-200"
            >
              {typeof item === 'string' ? item : item.tag}
            </Text>
            {typeof item === 'object' && item.posts && (
              <Text size="sm" color="gray-500">
                {item.posts} posts
              </Text>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default HashtagList