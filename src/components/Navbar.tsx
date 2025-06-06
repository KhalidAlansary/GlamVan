import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlignRight, User, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-playfair font-bold text-salon-dark-purple">
            Glam<span className="text-salon-purple">Van</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-800 hover:text-salon-purple transition-colors"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-gray-800 hover:text-salon-purple transition-colors"
          >
            Services
          </Link>
          <Link
            to="/wedding"
            className="text-gray-800 hover:text-salon-purple transition-colors"
          >
            Wedding
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-salon-purple transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-salon-purple transition-colors"
          >
            Contact
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="text-gray-800 hover:text-salon-purple transition-colors"
            >
              Admin
            </Link>
          )}

          <Link to="/booking">
            <Button className="bg-salon-purple hover:bg-salon-dark-purple text-white shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden booking-btn">
              Book Now
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-800">Hi, {user?.name}</span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-gray-800 hover:text-salon-purple transition-colors"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={openLoginModal}
              className="text-gray-800 hover:text-salon-purple transition-colors flex items-center gap-2"
            >
              <User size={18} />
              Login
            </Button>
          )}

          <button className="text-gray-800 hover:text-salon-purple transition-colors">
            العربية
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <AlignRight size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-gray-800 hover:text-salon-purple transition-colors py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-800 hover:text-salon-purple transition-colors py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/wedding"
              className="text-gray-800 hover:text-salon-purple transition-colors py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Wedding
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-salon-purple transition-colors py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-salon-purple transition-colors py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="text-gray-800 hover:text-salon-purple transition-colors py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Admin
              </Link>
            )}

            <div className="flex justify-between items-center py-2">
              <Link to="/booking" className="w-full" onClick={toggleMenu}>
                <Button className="bg-salon-purple hover:bg-salon-dark-purple text-white w-full shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden booking-btn">
                  Book Now
                </Button>
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col gap-2 py-2 border-b border-gray-100">
                <span className="text-gray-800">Hi, {user?.name}</span>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-salon-purple transition-colors"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  openLoginModal();
                  toggleMenu();
                }}
                className="text-gray-800 hover:text-salon-purple transition-colors flex items-center justify-center gap-2 py-2 border-b border-gray-100"
              >
                <User size={18} />
                Login
              </Button>
            )}

            <button className="text-gray-800 hover:text-salon-purple transition-colors py-2">
              العربية
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </nav>
  );
};

export default Navbar;
