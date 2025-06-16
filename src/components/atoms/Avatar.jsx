import { motion } from 'framer-motion'

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  isOnline = false, 
  className = '',
  hasStory = false,
  ...props 
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  }

  const onlineIndicatorSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4'
  }

  const storyRingClasses = hasStory 
    ? 'ring-2 ring-gradient-purple ring-offset-2' 
    : ''

  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover ${storyRingClasses}`}
      />
      {isOnline && (
        <div 
          className={`absolute bottom-0 right-0 ${onlineIndicatorSizes[size]} bg-success rounded-full border-2 border-white`}
        />
      )}
    </motion.div>
  )
}

export default Avatar