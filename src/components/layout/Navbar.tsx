import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { BookOpen, ShoppingCart, User, LogOut, Settings, Trophy } from 'lucide-react';

export function Navbar() {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b-4 border-gfg-green sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-gfg-green" />
            <span className="text-2xl font-bold text-gray-900">CodeLearn</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-gfg-green font-medium transition-colors">
              Tutorials
            </Link>
            <Link to="/challenges" className="text-gray-700 hover:text-gfg-green font-medium transition-colors flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Practice
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-gfg-green font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/labs" className="text-gray-700 hover:text-gfg-green font-medium transition-colors">
                  Labs
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart">
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                {profile?.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <div className="hidden sm:block">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">{profile?.full_name || user.email}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
