
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

const BeauticianNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "You have an appointment with Hana Mahmoud at 12:30 PM",
      time: "5 min ago",
      read: false,
    },
    {
      id: "2",
      message: "New skill 'Bridal Hair' approved by admin",
      time: "3 hours ago",
      read: false,
    },
    {
      id: "3",
      message: "Your earnings have been transferred to your account",
      time: "Yesterday",
      read: true,
    }
  ]);
  const [hasUnread, setHasUnread] = useState(true);
  
  useEffect(() => {
    // Check if there are any unread notifications
    setHasUnread(notifications.some(notification => !notification.read));
  }, [notifications]);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const handleReadNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const handleReadAll = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  // Use a default name if user is not available
  const userName = user?.name || 'Layla Mohammed';

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-3xl font-bold text-salon-purple">Beautician Dashboard</span>
        </Link>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {hasUnread && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex justify-between items-center p-2 border-b">
                <h3 className="font-medium">Notifications</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReadAll} 
                  className="text-xs hover:text-salon-purple"
                >
                  Mark all as read
                </Button>
              </div>
              {notifications.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className={`p-3 cursor-pointer ${!notification.read ? 'bg-salon-pink/10' : ''}`}
                      onClick={() => handleReadNotification(notification.id)}
                    >
                      <div>
                        <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-salon-purple/10 flex items-center justify-center">
              <User className="h-4 w-4 text-salon-purple" />
            </div>
            <span className="text-sm font-medium">{userName}</span>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default BeauticianNavbar;
