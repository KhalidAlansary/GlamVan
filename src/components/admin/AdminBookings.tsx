import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  parseBookingDate,
  getMinimumPriceForService,
} from "./utils/bookingUtils";
import BookingFilters from "./components/BookingFilters";
import BookingTable from "./components/BookingTable";
import BookingCalendar from "./components/BookingCalendar";
import BookingDialogs from "./components/BookingDialogs";
import { Booking, Van, Beautician } from "./types/booking";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, MapPin, Phone, User, Truck } from "lucide-react";

// Define types based on Supabase tables
type DBBooking = Tables<"bookings">;
type DBVan = Tables<"vans">;
type DBStylist = Tables<"stylists">;

const AdminBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Dialogs state
  const [showVanDialog, setShowVanDialog] = useState(false);
  const [showBeauticianDialog, setShowBeauticianDialog] = useState(false);
  const [showSmsDialog, setShowSmsDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);

  const queryClient = useQueryClient();

  // Function to update bookings locally (for compatibility with dialogs)
  const setBookings = (bookings: Booking[]) => {
    // Since we're using react-query, we'll just invalidate queries
    queryClient.invalidateQueries({ queryKey: ["bookings"] });
  };

  // Fetch bookings from Supabase
  const { data: bookings = [], isLoading: bookingsLoading, error: bookingsError } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform database booking to match expected Booking type
      return data.map(booking => ({
        ...booking,
        paymentStatus: booking.payment_status as "paid" | "pending" | "not paid" | "refunded"
      })) as Booking[];
    },
  });

  // Fetch vans from Supabase
  const { data: vans = [] } = useQuery({
    queryKey: ["vans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vans")
        .select("*")
        .order("id");
      
      if (error) {
        throw error;
      }
      
      return data.map(van => ({
        ...van,
        id: van.id.toString()
      })) as unknown as Van[];
    },
  });

  // Fetch stylists from Supabase
  const { data: beauticians = [] } = useQuery({
    queryKey: ["stylists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stylists")
        .select("*")
        .order("id");
      
      if (error) {
        throw error;
      }
      
      return data.map(stylist => ({
        id: stylist.id.toString(),
        name: stylist.name,
        specialization: stylist.specialties?.join(", ") || "General",
        status: (stylist.status === "available" || stylist.status === "busy" || stylist.status === "off") 
          ? stylist.status 
          : "available",
      })) as Beautician[];
    },
  });

  // Mutation for updating booking status
  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Booking> }) => {
      const { data, error } = await supabase
        .from("bookings")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update booking: ${error.message}`);
    },
  });

  // Updated locations for Egypt
  const locations = ["New Cairo", "El Rehab", "Sheikh Zayed", "Tagmo3"];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.beautician.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.van.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || booking.paymentStatus === paymentFilter;

    let matchesDate = true;
    if (dateFilter) {
      try {
        const filterDate = new Date(dateFilter);
        const bookingDate = parseBookingDate(booking.date);
        matchesDate = bookingDate
          ? bookingDate.toDateString() === filterDate.toDateString()
          : false;
      } catch {
        matchesDate = true;
      }
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  // Toggle view mode between list and calendar
  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "calendar" : "list");
  };

  // Handle edit booking dialog
  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowEditDialog(true);
  };

  // Handle show map dialog
  const handleShowMap = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowMapDialog(true);
  };

  // Handle reassign van dialog
  const handleReassignVan = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowVanDialog(true);
  };

  // Handle reassign beautician dialog
  const handleReassignBeautician = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBeauticianDialog(true);
  };

  // Handle SMS dialog
  const handleSendSMS = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowSmsDialog(true);
  };

  // Handle delete booking dialog
  const handleDeleteBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDeleteDialog(true);
  };

  // Handle status update
  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    updateBookingMutation.mutate({
      id: bookingId,
      updates: { status: newStatus as "pending" | "confirmed" | "completed" | "cancelled" | "unassigned" },
    });
  };

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

  // Handle loading and error states
  if (bookingsLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-salon-purple mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (bookingsError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading bookings: {bookingsError.message}</p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["bookings"] })}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{filteredBookings.length} bookings</span>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            Manage and track all customer bookings
          </CardDescription>
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
                  <TableHead>Beautician</TableHead>
                  <TableHead>Van</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User size={14} className="mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{booking.client}</div>
                          {booking.phone && (
                            <div className="text-xs text-gray-500 flex items-center">
                              <Phone size={10} className="mr-1" />
                              {booking.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarDays size={14} className="mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{booking.date}</div>
                          <div className="text-xs text-gray-500">{booking.time}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{booking.location}</div>
                          {booking.address && (
                            <div className="text-xs text-gray-500 max-w-[200px] truncate">
                              {booking.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {booking.beautician || "Not assigned"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Truck size={14} className="mr-2 text-gray-400" />
                        {booking.van || "Not assigned"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.price || "N/A"}</div>
                        <Badge 
                          variant="outline" 
                          className={
                            booking.paymentStatus === "paid" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {booking.paymentStatus || "pending"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`${getStatusBadge(booking.status)} border-0`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Select
                          value={booking.status}
                          onValueChange={(value) => handleStatusUpdate(booking.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No bookings found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* All Dialogs */}
      <BookingDialogs
        showVanDialog={showVanDialog}
        setShowVanDialog={setShowVanDialog}
        showBeauticianDialog={showBeauticianDialog}
        setShowBeauticianDialog={setShowBeauticianDialog}
        showSmsDialog={showSmsDialog}
        setShowSmsDialog={setShowSmsDialog}
        showRefundDialog={showRefundDialog}
        setShowRefundDialog={setShowRefundDialog}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        showCreateDialog={showCreateDialog}
        setShowCreateDialog={setShowCreateDialog}
        showMapDialog={showMapDialog}
        setShowMapDialog={setShowMapDialog}
        selectedBooking={selectedBooking}
        bookings={bookings}
        setBookings={setBookings}
        vans={vans}
        beauticians={beauticians}
        locations={locations}
      />
    </div>
  );
};

export default AdminBookings;
