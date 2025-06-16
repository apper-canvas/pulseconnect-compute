import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { formatDistanceToNow } from 'date-fns'

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState([])

  const tabs = [
    { id: 'all', label: 'All', icon: 'Bell' },
    { id: 'mentions', label: 'Mentions', icon: 'AtSign' },
    { id: 'likes', label: 'Likes', icon: 'Heart' },
    { id: 'follows', label: 'Follows', icon: 'UserPlus' }
  ]

  const mockNotifications = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Maya Patel',
        username: 'maya_artist',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
      },
      action: 'liked your post',
      content: 'Just finished designing a new mobile app interface!',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false
    },
    {
      id: 2,
      type: 'follow',
      user: {
        name: 'Alex Rodriguez',
        username: 'alex_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      action: 'started following you',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: false
    },
    {
      id: 3,
      type: 'comment',
      user: {
        name: 'Chris Johnson',
        username: 'chris_travel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      },
      action: 'commented on your post',
      content: 'This looks amazing! Love the color scheme.',
      originalPost: 'Just finished designing a new mobile app interface!',
      timestamp: '2024-01-15T08:45:00Z',
      isRead: true
    },
    {
      id: 4,
      type: 'mention',
      user: {
        name: 'Emma Wilson',
        username: 'emma_chef',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
      },
      action: 'mentioned you in a post',
      content: 'Check out @sarah_chen amazing design work!',
      timestamp: '2024-01-14T20:30:00Z',
      isRead: true
    },
    {
      id: 5,
      type: 'like',
      user: {
        name: 'Alex Rodriguez',
        username: 'alex_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      action: 'liked your story',
      timestamp: '2024-01-14T18:20:00Z',
      isRead: true
    }
  ]

  useEffect(() => {
    setNotifications(mockNotifications)
  }, [])

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'mentions':
        return notifications.filter(n => n.type === 'mention')
      case 'likes':
        return notifications.filter(n => n.type === 'like')
      case 'follows':
        return notifications.filter(n => n.type === 'follow')
      case 'all':
      default:
        return notifications
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { name: 'Heart', color: 'text-red-500' }
      case 'follow':
        return { name: 'UserPlus', color: 'text-blue-500' }
      case 'comment':
        return { name: 'MessageCircle', color: 'text-green-500' }
      case 'mention':
        return { name: 'AtSign', color: 'text-purple-500' }
      default:
        return { name: 'Bell', color: 'text-gray-500' }
    }
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface-50"
    >
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Text variant="heading" size="2xl" weight="bold" className="mb-2">
              Notifications
            </Text>
            {unreadCount > 0 && (
              <Text size="sm" color="gray-600">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </Text>
            )}
          </div>
          
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        {/* Tabs */}
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

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center"
            >
              <ApperIcon name="Bell" size={48} className="text-gray-300 mx-auto mb-4" />
              <Text variant="heading" weight="semibold" color="gray-600" className="mb-2">
                No notifications
              </Text>
              <Text size="sm" color="gray-500">
                You're all caught up! New notifications will appear here.
              </Text>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const icon = getNotificationIcon(notification.type)
              const timeAgo = formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-colors duration-200 ${
                    !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
                  }`}
                >
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Avatar
                        src={notification.user.avatar}
                        alt={notification.user.name}
                        size="md"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center`}>
                        <ApperIcon name={icon.name} size={12} className={icon.color} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Text size="sm" className="break-words">
                            <span className="font-semibold">{notification.user.name}</span>{' '}
                            <span className="text-gray-600">{notification.action}</span>
                          </Text>
                          
                          {notification.content && (
                            <Text size="sm" color="gray-600" className="mt-1 break-words">
                              "{notification.content}"
                            </Text>
                          )}
                          
                          {notification.originalPost && (
                            <Text size="sm" color="gray-500" className="mt-1 break-words">
                              On: "{notification.originalPost}"
                            </Text>
                          )}
                        </div>
                        
                        <Text size="xs" color="gray-500" className="ml-4 whitespace-nowrap">
                          {timeAgo}
                        </Text>
                      </div>
                      
                      <div className="flex items-center space-x-3 mt-3">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        
                        {notification.type === 'follow' && (
                          <Button variant="primary" size="sm">
                            Follow back
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Notifications