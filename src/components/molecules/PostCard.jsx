import { motion } from 'framer-motion'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import ApperIcon from '@/components/ApperIcon'
import { postService } from '@/services'
import { toast } from 'react-toastify'

const PostCard = ({ post, author, className = '' }) => {
  const [likes, setLikes] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      if (isLiked) {
        await postService.unlike(post.Id)
        setLikes(prev => prev - 1)
        setIsLiked(false)
      } else {
        await postService.like(post.Id)
        setLikes(prev => prev + 1)
        setIsLiked(true)
      }
    } catch (error) {
      toast.error('Failed to update like')
    } finally {
      setIsLoading(false)
    }
  }

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <Avatar
          src={author?.avatar}
          alt={author?.displayName}
          size="md"
          isOnline={author?.isOnline}
        />
        <div className="flex-1 min-w-0">
          <Text variant="heading" weight="semibold" className="truncate">
            {author?.displayName}
          </Text>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>@{author?.username}</span>
            <span>•</span>
            <span>{timeAgo}</span>
            {post.location && (
              <>
                <span>•</span>
                <span className="flex items-center">
                  <ApperIcon name="MapPin" size={12} className="mr-1" />
                  {post.location}
                </span>
              </>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" icon="MoreHorizontal" />
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <Text className="break-words whitespace-pre-wrap mb-3">
          {post.content}
        </Text>
        
        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.hashtags.map((hashtag, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-primary hover:text-secondary cursor-pointer"
              >
                {hashtag}
              </motion.span>
            ))}
          </div>
        )}
        
        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className="rounded-lg overflow-hidden">
            {post.media.map((media, index) => (
              <img
                key={index}
                src={media.url}
                alt="Post media"
                className="w-full h-auto max-h-96 object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            disabled={isLoading}
            className={`flex items-center space-x-2 transition-colors duration-200 ${
              isLiked ? 'text-secondary' : 'text-gray-500 hover:text-secondary'
            }`}
          >
            <ApperIcon 
              name={isLiked ? "Heart" : "Heart"} 
              size={18} 
              className={isLiked ? "fill-current" : ""}
            />
            <Text size="sm" weight="medium">{likes}</Text>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors duration-200"
          >
            <ApperIcon name="MessageCircle" size={18} />
            <Text size="sm" weight="medium">{post.comments}</Text>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors duration-200"
          >
            <ApperIcon name="Share" size={18} />
            <Text size="sm" weight="medium">{post.shares}</Text>
          </motion.button>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-500 hover:text-primary transition-colors duration-200"
        >
          <ApperIcon name="Bookmark" size={18} />
        </motion.button>
      </div>
    </motion.article>
  )
}

export default PostCard