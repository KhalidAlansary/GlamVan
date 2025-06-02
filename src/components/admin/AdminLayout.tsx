
import { useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Calendar, 
  CreditCard,
  Home, 
  User, 
  Users,
  Heart,
  Menu,
  X,
  LogOut,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
    { name: "Bookings", path: "/admin/bookings", icon: <Calendar size={20} /> },
    { name: "Beauticians", path: "/admin/beauticians", icon: <Users size={20} /> },
    { name: "Promotions", path: "/admin/promotions", icon: <Heart size={20} /> },
    { name: "Weddings", path: "/admin/weddings", icon: <Calendar size={20} /> },
    { name: "Payments", path: "/admin/payments", icon: <CreditCard size={20} /> },
    { name: "Vans", path: "/admin/vans", icon: <Truck size={20} /> },
  ];
  
  // Helper function to check if a nav item is active
  const isNavItemActive = (path: string) => {
    // For the dashboard, handle both /admin and /admin/dashboard
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    // For beauticians/stylists paths, treat them as the same section
    if (path === '/admin/beauticians') {
      return location.pathname === '/admin/beauticians' || location.pathname === '/admin/stylists';
    }
    // For other paths, check exact match
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon"
          className="bg-white shadow-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
    
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative bg-white shadow-lg h-full md:h-screen z-40 transition-transform duration-300 ease-in-out flex flex-col w-64 md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center p-6 border-b">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-playfair font-bold text-salon-dark-purple">
              Glam<span className="text-salon-purple">Van</span>
            </h1>
          </Link>
        </div>
        
        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isNavItemActive(item.path)
                    ? "bg-salon-pink text-salon-dark-purple"
                    : "text-gray-700 hover:bg-salon-pink/10"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-salon-pink/20 flex items-center justify-center mr-3">
              <User size={20} className="text-salon-purple" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center"
              onClick={() => logout()}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Admin Dashboard
              </h2>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
