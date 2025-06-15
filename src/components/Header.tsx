
import { useState } from "react";
import { Search, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, userProfile, signOut } = useAuth();
  
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/find-rentals?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Check if user can access admin panel
  const canAccessAdmin = userProfile?.role === 'admin' && userProfile?.email === 'admin@bobbieberry.com';
  
  // Check if user is an approved agent
  const isApprovedAgent = userProfile?.role === 'agent' && userProfile?.is_approved;
  
  // Check if user is any agent (approved or not)
  const isAgent = userProfile?.role === 'agent';

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HM</span>
            </div>
            <span className="text-xl font-poppins font-bold text-neutral-900">HomeMatch</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search by city, neighborhood, or address..."
                className="pl-10 bg-neutral-50 border-neutral-200 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/find-rentals" className="text-neutral-700 hover:text-primary-600 transition-colors">
              Find Rentals
            </Link>
            
            {isApprovedAgent && (
              <Link to="/list-property" className="text-neutral-700 hover:text-primary-600 transition-colors">
                List Property
              </Link>
            )}
            
            {canAccessAdmin && (
              <Link to="/admin-dashboard" className="text-neutral-700 hover:text-primary-600 transition-colors">
                Admin
              </Link>
            )}
            
            {/* Show Dashboard for agents, For Agents for non-agents */}
            {isAgent ? (
              <Link to="/agent-dashboard" className="text-neutral-700 hover:text-primary-600 transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link to="/for-agents" className="text-neutral-700 hover:text-primary-600 transition-colors">
                For Agents
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img 
                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.user_metadata?.display_name || user.email}&background=6366f1&color=fff`} 
                    alt={user.user_metadata?.display_name || 'User'} 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="hidden md:block">
                    <span className="text-sm text-neutral-700">{user.user_metadata?.display_name || user.email}</span>
                    {userProfile && (
                      <div className="text-xs text-neutral-500 capitalize">
                        {userProfile.role}
                        {userProfile.role === 'agent' && !userProfile.is_approved && ' (Pending)'}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-neutral-600 hover:text-neutral-900"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-neutral-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  className="pl-10 bg-neutral-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <nav className="flex flex-col space-y-3">
                <Link to="/find-rentals" className="text-neutral-700 hover:text-primary-600 transition-colors">
                  Find Rentals
                </Link>
                
                {isApprovedAgent && (
                  <Link to="/list-property" className="text-neutral-700 hover:text-primary-600 transition-colors">
                    List Property
                  </Link>
                )}
                
                {canAccessAdmin && (
                  <Link to="/admin-dashboard" className="text-neutral-700 hover:text-primary-600 transition-colors">
                    Admin
                  </Link>
                )}
                
                {/* Show Dashboard for agents, For Agents for non-agents */}
                {isAgent ? (
                  <Link to="/agent-dashboard" className="text-neutral-700 hover:text-primary-600 transition-colors">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/for-agents" className="text-neutral-700 hover:text-primary-600 transition-colors">
                    For Agents
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
