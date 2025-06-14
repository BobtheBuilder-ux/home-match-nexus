
import { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search by city, neighborhood, or address..."
                className="pl-10 bg-neutral-50 border-neutral-200 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/find-rentals" className="text-neutral-700 hover:text-primary-600 transition-colors">
              Find Rentals
            </Link>
            <Link to="/list-property" className="text-neutral-700 hover:text-primary-600 transition-colors">
              List Property
            </Link>
            <Link to="/for-agents" className="text-neutral-700 hover:text-primary-600 transition-colors">
              For Agents
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  className="pl-10 bg-neutral-50"
                />
              </div>
              <nav className="flex flex-col space-y-3">
                <Link to="/find-rentals" className="text-neutral-700 hover:text-primary-600 transition-colors">
                  Find Rentals
                </Link>
                <Link to="/list-property" className="text-neutral-700 hover:text-primary-600 transition-colors">
                  List Property
                </Link>
                <Link to="/for-agents" className="text-neutral-700 hover:text-primary-600 transition-colors">
                  For Agents
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
