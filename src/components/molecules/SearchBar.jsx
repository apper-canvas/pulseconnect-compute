import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  suggestions = [],
  showSuggestions = false,
  className = '' 
}) => {
  const [query, setQuery] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])

  useEffect(() => {
    if (query && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions([])
    }
  }, [query, suggestions])

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setIsActive(false)
    onSearch?.(suggestion)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch?.('')
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsActive(true)}
          onBlur={() => setTimeout(() => setIsActive(false), 200)}
          icon="Search"
          iconPosition="left"
          className="pr-10"
        />
        
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" size={16} />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isActive && showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg"
              >
                <ApperIcon name="Search" size={16} className="text-gray-400" />
                <Text size="sm">{suggestion}</Text>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar