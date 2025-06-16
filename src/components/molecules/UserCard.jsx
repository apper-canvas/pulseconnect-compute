import { motion } from 'framer-motion'
import { useState } from 'react'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import { userService } from '@/services'
import { toast } from 'react-toastify'

const UserCard = ({ user, showFollowButton = true, className = '' }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      if (isFollowing) {
        await userService.unfollow(user.Id)
        setIsFollowing(false)
        toast.success('Unfollowed successfully')
      } else {
        await userService.follow(user.Id)
        setIsFollowing(true)
        toast.success('Following!')
      }
    } catch (error) {
      toast.error('Failed to update follow status')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <Avatar
          src={user.avatar}
          alt={user.displayName}
          size="lg"
          isOnline={user.isOnline}
        />
        
        <div className="flex-1 min-w-0">
          <Text variant="heading" weight="semibold" className="truncate">
            {user.displayName}
          </Text>
          <Text size="sm" color="gray-500" className="truncate">
            @{user.username}
          </Text>
          {user.bio && (
            <Text size="sm" color="gray-600" className="mt-1 line-clamp-2">
              {user.bio}
            </Text>
          )}
        </div>
        
        {showFollowButton && (
          <Button
            variant={isFollowing ? "outline" : "primary"}
            size="sm"
            onClick={handleFollow}
            disabled={isLoading}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="text-center">
          <Text weight="semibold" size="sm">{user.posts}</Text>
          <Text size="xs" color="gray-500">Posts</Text>
        </div>
        <div className="text-center">
          <Text weight="semibold" size="sm">{user.followers}</Text>
          <Text size="xs" color="gray-500">Followers</Text>
        </div>
        <div className="text-center">
          <Text weight="semibold" size="sm">{user.following}</Text>
          <Text size="xs" color="gray-500">Following</Text>
        </div>
      </div>
    </motion.div>
  )
}

export default UserCard