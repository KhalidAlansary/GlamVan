
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { MapPin, Edit, Map, Plus } from "lucide-react";
import { Booking } from "../types/booking";
import { parseBookingDate, getStatusBadgeClass } from "../utils/bookingUtils";

interface BookingCalendarProps {
  bookings: Booking[];
  filteredBookings: Booking[];
  searchQuery: string;
  statusFilter: string;
  paymentFilter: string;
  dateFilter: string;
  onEditBooking: (booking: Booking) => void;
  onShowMap: (booking: Booking) => void;
  onCreateBooking: () => void;
}

const BookingCalendar = ({ 
  bookings, 
  filteredBookings, 
  searchQuery, 
  statusFilter, 
  paymentFilter, 
  dateFilter,
  onEditBooking, 
  onShowMap, 
  onCreateBooking 
}: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get bookings for a specific date
  const getBookingsForDate = (date: Date): Booking[] => {
    return filteredBookings.filter(booking => {
      const bookingDate = parseBookingDate(booking.date);
      return bookingDate && bookingDate.toDateString() === date.toDateString();
    });
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return searchQuery.trim() !== "" || 
           statusFilter !== "all" || 
           paymentFilter !== "all" || 
           dateFilter !== "";
  };

  // Calendar day modifier for styling
  const getDayModifiers = () => {
    const modifiers = {
      upcoming: [] as Date[],
      cancelled: [] as Date[],
      completed: [] as Date[],
      filtered: [] as Date[]
    };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    
    // If filters are active, show filtered results in green
    if (hasActiveFilters()) {
      filteredBookings.forEach(booking => {
        const date = parseBookingDate(booking.date);
        if (date) {
          modifiers.filtered.push(date);
        }
      });
    } else {
      // Default view: show all bookings with appropriate colors based on actual date logic
      bookings.forEach(booking => {
        const date = parseBookingDate(booking.date);
        if (date) {
          const bookingDate = new Date(date);
          bookingDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
          
          if (booking.status === 'cancelled') {
            modifiers.cancelled.push(date);
          } else if (bookingDate < today) {
            // Past dates should be completed (blue)
            modifiers.completed.push(date);
          } else if (bookingDate >= today) {
            // Today and future dates should be upcoming (pink)
            modifiers.upcoming.push(date);
          }
        }
      });
    }
    
    return modifiers;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const eventsForSelectedDate = selectedDate ? getBookingsForDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Calendar */}
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="border rounded-md [&_.rdp-day_selected]:bg-transparent [&_.rdp-day_selected]:text-inherit [&_.rdp-day_selected]:font-normal"
          modifiers={getDayModifiers()}
          modifiersStyles={{
            upcoming: { backgroundColor: '#fce7f3', color: '#be185d' }, // Pink for upcoming
            cancelled: { backgroundColor: '#fecaca', color: '#dc2626' }, // Red for cancelled  
            completed: { backgroundColor: '#dbeafe', color: '#2563eb' }, // Blue for completed
            filtered: { backgroundColor: '#d1fae5', color: '#059669' } // Green for filtered results
          }}
        />
      </div>

      {/* Events for selected date */}
      <div className="col-span-1 md:col-span-2">
        <h3 className="font-medium mb-4">
          {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
        </h3>
        
        {eventsForSelectedDate.length > 0 ? (
          <div className="space-y-4">
            {eventsForSelectedDate.map((booking) => (
              <div
                key={booking.id}
                className="p-4 border rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{booking.service}</h4>
                    <p className="text-sm text-gray-500">
                      Client: {booking.client}
                    </p>
                    <p className="text-sm text-gray-500">
                      Time: {booking.time}
                    </p>
                    <div className="flex items-center mt-1">
                      <MapPin size={14} className="mr-1 text-gray-400" />
                      <span className="text-sm">{booking.location}</span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onShowMap(booking)}
                      title="Show Location"
                    >
                      <Map size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onEditBooking(booking)}
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Beautician:</span> {booking.beautician}
                </div>
                <div className="mt-1 text-sm">
                  <span className="text-gray-500">Van:</span> {booking.van}
                </div>
                <div className="mt-1 text-sm">
                  <span className="text-gray-500">Price:</span> ₤{booking.price}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 border rounded-md bg-gray-50 text-center">
            <p className="text-gray-500">No bookings for this date</p>
            <Button 
              className="mt-4 bg-salon-purple hover:bg-salon-dark-purple"
              onClick={onCreateBooking}
            >
              <Plus size={16} className="mr-2" />
              Add Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
