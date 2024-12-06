import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  DumbellIcon, 
  CalendarCheck, 
  BookOpen,
  Utensils,
  BarChart3,
  Settings
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const sidebarItems = [
    { 
      name: 'Dashboard', 
      icon: Home, 
      path: '/dashboard' 
    },
    { 
      name: 'Fitness Goals', 
      icon: Activity, 
      path: '/goals' 
    },
    { 
      name: 'Exercise Plan', 
      icon: DumbellIcon, 
      path: '/exercise' 
    },
    { 
      name: 'Progress Tracker', 
      icon: CalendarCheck, 
      path: '/progress' 
    },
    { 
      name: 'Nutrition Plan', 
      icon: Utensils, 
      path: '/diet' 
    },
    { 
      name: 'Nutrition Tracker', 
      icon: BarChart3, 
      path: '/nutrition' 
    },
    { 
      name: 'Learning Center', 
      icon: BookOpen, 
      path: '/learn' 
    },
    { 
      name: 'Settings', 
      icon: Settings, 
      path: '/settings' 
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:block w-64 bg-white border-r shadow-sm h-screen fixed left-0 top-0 pt-16">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <img 
            src={user?.profilePicture || '/default-avatar.png'} 
            alt="Profile" 
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center px-4 py-2.5 text-gray-700 
              hover:bg-gray-100 
              ${isActive(item.path) ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}
              transition-colors duration-200
            `}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>© 2024 FitTrack</span>
          <Link to="/help" className="hover:text-blue-600">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;