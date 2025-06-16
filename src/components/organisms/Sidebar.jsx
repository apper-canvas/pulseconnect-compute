import React, { useState } from "react";
import { motion } from "framer-motion";
import HashtagList from "@/components/molecules/HashtagList";
import Text from "@/components/atoms/Text";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = () => {
  const [currentUser] = useState({
    Id: 1,
    displayName: 'Sarah Chen',
    username: 'sarah_chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b787?w=400&h=400&fit=crop&crop=face',
    followers: 1247,
    following: 342,
posts: 89
  });

  const [error] = useState(null);

  if (error) {
    return (
      <aside className="w-full h-full bg-surface-50 p-6 overflow-y-auto scrollbar-thin">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-gray-300 mx-auto mb-4" />
          <Text weight="medium" color="gray-600">
            Failed to load sidebar
          </Text>
          <Text size="sm" color="gray-500" className="mt-2">
            {error}
          </Text>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full h-full bg-surface-50 p-6 overflow-y-auto scrollbar-thin">
      <div className="space-y-6">
        {/* Current User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="text-center">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <Text variant="heading" weight="semibold" className="mb-1">
              {currentUser.displayName}
            </Text>
            <Text size="sm" color="gray-500" className="mb-4">
              @{currentUser.username}
            </Text>
            
            <div className="flex justify-between text-center">
              <div>
                <Text weight="semibold">{currentUser.posts}</Text>
                <Text size="xs" color="gray-500">Posts</Text>
              </div>
              <div>
                <Text weight="semibold">{currentUser.followers}</Text>
                <Text size="xs" color="gray-500">Followers</Text>
              </div>
              <div>
                <Text weight="semibold">{currentUser.following}</Text>
                <Text size="xs" color="gray-500">Following</Text>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trending Hashtags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <HashtagList />
        </motion.div>

        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-4">
            <ApperIcon name="TrendingUp" size={18} className="text-primary" />
            <Text variant="heading" weight="semibold">What's happening</Text>
          </div>
          
          <div className="space-y-4">
            {[
              { topic: 'Technology', posts: '1.2K posts' },
              { topic: 'Photography', posts: '892 posts' },
              { topic: 'Travel', posts: '634 posts' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
              >
                <Text size="sm" color="gray-500">Trending in Technology</Text>
                <Text weight="semibold" className="mt-1">{item.topic}</Text>
                <Text size="sm" color="gray-500">{item.posts}</Text>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </aside>
  );
};

export default Sidebar