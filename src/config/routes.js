import Home from '@/components/pages/Home'
import Explore from '@/components/pages/Explore'
import Messages from '@/components/pages/Messages'
import Notifications from '@/components/pages/Notifications'
import Profile from '@/components/pages/Profile'

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
    component: Home
  },
  explore: {
    id: 'explore',
    label: 'Explore',
    path: '/explore',
    icon: 'Compass',
    component: Explore
  },
  messages: {
    id: 'messages',
    label: 'Messages',
    path: '/messages',
    icon: 'MessageCircle',
    component: Messages
  },
  notifications: {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: 'Bell',
    component: Notifications
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
    component: Profile
  }
}

export const routeArray = Object.values(routes)
export default routes