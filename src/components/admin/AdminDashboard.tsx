import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  CreditCard,
  DollarSign,
  Users,
  Truck,
  Percent,
  Tag,
  MapPin,
  TrendingUp,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  // Fetch bookings from Supabase
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ["dashboard-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data;
    },
  });

  // Fetch stylists from Supabase
  const { data: stylists = [], isLoading: stylistsLoading } = useQuery({
    queryKey: ["dashboard-stylists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stylists")
        .select("*");
      
      if (error) {
        throw error;
      }
      
      return data;
    },
  });

  // Fetch vans from Supabase
  const { data: vans = [], isLoading: vansLoading } = useQuery({
    queryKey: ["dashboard-vans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vans")
        .select("*");
      
      if (error) {
        throw error;
      }
      
      return data;
    },
  });

  // Fetch payments from Supabase
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["dashboard-payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data;
    },
  });

  // Calculate statistics
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const completedBookings = bookings.filter(b => b.status === "completed").length;

  const totalStylists = stylists.length;
  const activeStylists = stylists.filter(s => s.status === "active").length;

  const totalVans = vans.length;
  const availableVans = vans.filter(v => v.status === "available").length;

  const totalRevenue = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + parseFloat(p.amount || "0"), 0);

  const monthlyRevenue = payments
    .filter(p => {
      const paymentDate = new Date(p.date);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
    })
    .reduce((sum, p) => sum + parseFloat(p.amount || "0"), 0);

  // Recent bookings for the table
  const recentBookings = bookings.slice(0, 5);

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle loading state
  if (bookingsLoading || stylistsLoading || vansLoading || paymentsLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-salon-purple mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with GlamVan today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {confirmedBookings} confirmed, {pendingBookings} pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stylists</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStylists}</div>
            <p className="text-xs text-muted-foreground">
              {totalStylists} total stylists
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Vans</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableVans}</div>
            <p className="text-xs text-muted-foreground">
              {totalVans} total vans
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">EGP {monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total: EGP {totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Status Overview */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Booking Status Overview</CardTitle>
            <CardDescription>Current status of all bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Confirmed</span>
                </div>
                <span className="font-semibold">{confirmedBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <span className="font-semibold">{pendingBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <span className="font-semibold">{completedBookings}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Stylists */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Top Performing Stylists</CardTitle>
            <CardDescription>Based on ratings and completed bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stylists
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, 3)
                .map((stylist, index) => (
                  <div key={stylist.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-salon-purple text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{stylist.name}</p>
                        <p className="text-xs text-gray-500">{(stylist.bookings_completed || []).length} bookings</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{(stylist.rating || 0).toFixed(1)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.client}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1 text-gray-400" />
                        <div>
                          <div className="text-sm">{booking.date}</div>
                          <div className="text-xs text-gray-500">{booking.time}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin size={12} className="mr-1 text-gray-400" />
                        {booking.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadge(booking.status)} border-0`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">EGP {booking.price || "0"}</span>
                    </TableCell>
                  </TableRow>
                ))}
                {recentBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No recent bookings
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
