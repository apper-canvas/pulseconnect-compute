import { useState } from 'react'
import { motion } from 'framer-motion'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  const conversations = [
    {
      id: 1,
      user: {
        id: 2,
        name: 'Alex Rodriguez',
        username: 'alex_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: 'Hey! How\'s the new project coming along?',
      timestamp: '2m',
      unread: 2
    },
    {
      id: 2,
      user: {
        id: 3,
        name: 'Maya Patel',
        username: 'maya_artist',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        isOnline: false
      },
      lastMessage: 'Love the new artwork you shared!',
      timestamp: '1h',
      unread: 0
    },
    {
      id: 3,
      user: {
        id: 4,
        name: 'Chris Johnson',
        username: 'chris_travel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: 'The photos from Japan are incredible!',
      timestamp: '3h',
      unread: 1
    }
  ]

  const messages = selectedChat ? [
    {
      id: 1,
      senderId: selectedChat.user.id,
      content: 'Hey! How\'s the new project coming along?',
      timestamp: '2:30 PM',
      isOwn: false
    },
    {
      id: 2,
      senderId: 1,
      content: 'It\'s going great! Just finished the main components.',
      timestamp: '2:32 PM',
      isOwn: true
    },
    {
      id: 3,
      senderId: selectedChat.user.id,
      content: 'That\'s awesome! Can\'t wait to see the final result.',
      timestamp: '2:33 PM',
      isOwn: false
    }
  ] : []

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    // In a real app, this would send the message via API
    console.log('Sending message:', newMessage)
    setNewMessage('')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-surface-50"
    >
      <div className="h-full flex">
        {/* Conversations List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <Text variant="heading" size="xl" weight="bold" className="mb-4">
              Messages
            </Text>
            <div className="relative">
              <Input
                placeholder="Search conversations..."
                icon="Search"
                iconPosition="left"
                className="w-full"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {conversations.map((conversation, index) => (
              <motion.button
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedChat(conversation)}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-200 ${
                  selectedChat?.id === conversation.id ? 'bg-primary/10 border-r-2 border-primary' : ''
                }`}
              >
                <Avatar
                  src={conversation.user.avatar}
                  alt={conversation.user.name}
                  size="md"
                  isOnline={conversation.user.isOnline}
                />
                
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <Text weight="semibold" className="truncate">
                      {conversation.user.name}
                    </Text>
                    <Text size="xs" color="gray-500">
                      {conversation.timestamp}
                    </Text>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Text size="sm" color="gray-600" className="truncate">
                      {conversation.lastMessage}
                    </Text>
                    {conversation.unread > 0 && (
                      <div className="w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center ml-2">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-6 bg-white border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={selectedChat.user.avatar}
                    alt={selectedChat.user.name}
                    size="md"
                    isOnline={selectedChat.user.isOnline}
                  />
                  <div className="flex-1">
                    <Text weight="semibold">{selectedChat.user.name}</Text>
                    <Text size="sm" color="gray-500">@{selectedChat.user.username}</Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" icon="Phone" />
                    <Button variant="ghost" size="sm" icon="Video" />
                    <Button variant="ghost" size="sm" icon="MoreHorizontal" />
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-primary text-white'
                          : 'bg-white shadow-sm border border-gray-200'
                      }`}
                    >
                      <Text size="sm" className="break-words">
                        {message.content}
                      </Text>
                      <Text 
                        size="xs" 
                        color={message.isOwn ? 'white' : 'gray-500'} 
                        className="mt-1 opacity-70"
                      >
                        {message.timestamp}
                      </Text>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" icon="Paperclip" />
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="ghost" size="sm" icon="Smile" />
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="sm" 
                    icon="Send"
                    disabled={!newMessage.trim()}
                  />
                </form>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center">
                <ApperIcon name="MessageCircle" size={64} className="text-gray-300 mx-auto mb-4" />
                <Text variant="heading" weight="semibold" color="gray-600" className="mb-2">
                  Select a conversation
                </Text>
                <Text size="sm" color="gray-500">
                  Choose a conversation from the sidebar to start messaging.
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Messages