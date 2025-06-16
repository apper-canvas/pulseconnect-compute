const Text = ({ 
  children, 
  variant = 'body', 
  size = 'md', 
  weight = 'normal',
  color = 'gray-900',
  className = '',
  as: Component = 'p',
  ...props 
}) => {
  const variants = {
    display: 'font-heading tracking-tight',
    heading: 'font-heading',
    body: 'font-sans',
    caption: 'font-sans'
  }
  
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  }
  
  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const textClasses = `${variants[variant]} ${sizes[size]} ${weights[weight]} text-${color} ${className}`

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  )
}

export default Text