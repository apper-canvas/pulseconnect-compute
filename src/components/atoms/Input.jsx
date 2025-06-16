import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  type = 'text',
  placeholder,
  icon,
  iconPosition = 'left',
  error,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-4 py-2.5 text-sm border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
  
  const errorClasses = error 
    ? 'border-error focus:ring-error' 
    : 'border-gray-300 hover:border-gray-400'
    
  const paddingClasses = icon 
    ? iconPosition === 'left' 
      ? 'pl-10' 
      : 'pr-10'
    : ''

  const inputClasses = `${baseClasses} ${errorClasses} ${paddingClasses} ${className}`

  return (
    <div className="relative">
      {icon && iconPosition === 'left' && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <ApperIcon name={icon} size={16} className="text-gray-400" />
        </div>
      )}
      
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        {...props}
      />
      
      {icon && iconPosition === 'right' && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ApperIcon name={icon} size={16} className="text-gray-400" />
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input