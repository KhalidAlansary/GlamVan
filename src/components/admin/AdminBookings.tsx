
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Booking, Van, Beautician } from "./types/booking";
import { parseBookingDate, getMinimumPriceForService } from "./utils/bookingUtils";
import BookingFilters from "./components/BookingFilters";
import BookingTable from "./components/BookingTable";
import BookingCalendar from "./components/BookingCalendar";
import BookingDialogs from "./components/BookingDialogs";

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

  // Mock data for bookings with synced prices
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "GLAM-205",
      client: "Noha Ahmed",
      service: "Bridal Hair & Makeup",
      location: "New Cairo",
      beautician: "Layla Mohammed",
      van: "GlamVanLuxury",
      date: "May 2, 2025",
      time: "10:00 AM",
      status: "confirmed",
      payment: "Vodafone Cash (50% deposit)",
      paymentStatus: "paid",
      price: "22000",
      phone: "01012345678",
      address: "Villa 23, Street 9, 5th Settlement"
    },
    {
      id: "GLAM-206",
      client: "Mariam Khalid",
      service: "Hard Gel Extensions",
      location: "El Rehab",
      beautician: "Nora Abdullah",
      van: "GlamVanLuxury",
      date: "May 3, 2025",
      time: "2:30 PM",
      status: "confirmed",
      payment: "Cash (Pay on delivery)",
      paymentStatus: "pending",
      price: "1200",
      phone: "01012345678",
      address: "Building 12, Group 3, El Rehab City"
    },
    {
      id: "GLAM-207",
      client: "Sara Ali",
      service: "Soire",
      location: "Sheikh Zayed",
      beautician: "Aisha Hassan",
      van: "GlamVanLuxury 1",
      date: "May 4, 2025",
      time: "11:15 AM",
      status: "pending",
      payment: "Credit Card (Pending)",
      paymentStatus: "pending",
      price: "2000",
      phone: "01557891234",
      address: "Villa 78, Zayed 2000, Sheikh Zayed"
    },
    {
      id: "GLAM-208",
      client: "Lina Mohammed",
      service: "Blowouts & Styling",
      location: "New Cairo",
      beautician: "Unassigned",
      van: "GlamVanLuxury",
      date: "May 5, 2025",
      time: "4:00 PM",
      status: "cancelled",
      payment: "Not Paid",
      paymentStatus: "not paid",
      price: "500",
      phone: "01544567890",
      address: "Apartment 5, Building 42, Concord Plaza, New Cairo"
    },
    {
      id: "GLAM-209",
      client: "Nouf Abdullah",
      service: "Bridal Hair & Makeup",
      location: "El Rehab",
      beautician: "Huda Omar",
      van: "GlamVanLuxury",
      date: "May 6, 2025",
      time: "1:00 PM",
      status: "confirmed",
      payment: "Bank Transfer (Full)",
      paymentStatus: "paid",
      price: "22000",
      phone: "01562345678",
      address: "Villa 35, Group 9, El Rehab City"
    },
    {
      id: "GLAM-210", 
      client: "Fatma Hassan",
      service: "Hybrid Extensions",
      location: "Sheikh Zayed", 
      beautician: "Yara Khalil",
      van: "GlamVanLuxury 1",
      date: "May 7, 2025",
      time: "9:30 AM",
      status: "completed",
      payment: "Vodafone Cash (Full)",
      paymentStatus: "paid",
      price: "1800",
      phone: "01598765432",
      address: "Villa 102, Zayed Dunes Compounds, Sheikh Zayed"
    },
  ]);

  // Updated locations for Egypt
  const locations = [
    "New Cairo",
    "El Rehab",
    "Sheikh Zayed",
    "Tagmo3"
  ];

  // Mock data for van - updated with correct vans
  const vans: Van[] = [
    { id: "v1", name: "GlamVanLuxury", status: "available" },
    { id: "v2", name: "GlamVanLuxury 1", status: "available" }
  ];

  // Mock data for beauticians
  const beauticians: Beautician[] = [
    { id: "s1", name: "Layla Mohammed", specialization: "Hair & Makeup", status: "available" },
    { id: "s2", name: "Nora Abdullah", specialization: "Hair & Nails", status: "busy" },
    { id: "s3", name: "Aisha Hassan", specialization: "Makeup", status: "available" },
    { id: "s4", name: "Huda Omar", specialization: "Bridal", status: "available" },
    { id: "s5", name: "Yara Khalil", specialization: "Makeup Pro", status: "off" },
  ];
  
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.beautician.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.van.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || booking.paymentStatus === paymentFilter;
    
    let matchesDate = true;
    if (dateFilter) {
      try {
        const filterDate = new Date(dateFilter);
        const bookingDate = parseBookingDate(booking.date);
        matchesDate = bookingDate ? bookingDate.toDateString() === filterDate.toDateString() : false;
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={toggleViewMode}
          >
            <CalendarIcon size={16} />
            {viewMode === "list" ? "Calendar View" : "List View"}
          </Button>
          <Button 
            className="bg-salon-purple hover:bg-salon-dark-purple booking-btn"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus size={16} className="mr-2" />
            Create New Booking
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-md">
        <CardContent className="pt-6">
          <BookingFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            paymentFilter={paymentFilter}
            setPaymentFilter={setPaymentFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </CardContent>
      </Card>

      {viewMode === "list" ? (
        /* Bookings Table */
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookingTable
              bookings={filteredBookings}
              onEditBooking={handleEditBooking}
              onShowMap={handleShowMap}
              onReassignVan={handleReassignVan}
              onReassignBeautician={handleReassignBeautician}
              onSendSMS={handleSendSMS}
              onDeleteBooking={handleDeleteBooking}
            />
          </CardContent>
        </Card>
      ) : (
        /* Calendar View */
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingCalendar
              bookings={bookings}
              filteredBookings={filteredBookings}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              paymentFilter={paymentFilter}
              dateFilter={dateFilter}
              onEditBooking={handleEditBooking}
              onShowMap={handleShowMap}
              onCreateBooking={() => setShowCreateDialog(true)}
            />
          </CardContent>
        </Card>
      )}

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
