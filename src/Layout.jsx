import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Header from '@/components/organisms/Header'
import Sidebar from '@/components/organisms/Sidebar'
import RightSidebar from '@/components/organisms/RightSidebar'
import MobileNavigation from '@/components/organisms/MobileNavigation'
import SearchOverlay from '@/components/organisms/SearchOverlay'

const Layout = () => {
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <Header onSearchOpen={() => setIsSearchOpen(true)} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>

        {/* Right Sidebar - Hidden on mobile and tablet */}
        <div className="hidden xl:block w-80 flex-shrink-0">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Navigation - Only visible on mobile */}
      <div className="lg:hidden">
        <MobileNavigation />
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </div>
  )
}

export default Layout