
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, User, MessageSquare, Truck, Map, MapPin } from "lucide-react";
import { Booking } from "../types/booking";
import { getStatusBadgeClass, getPaymentBadgeClass } from "../utils/bookingUtils";

interface BookingTableProps {
  bookings: Booking[];
  onEditBooking: (booking: Booking) => void;
  onShowMap: (booking: Booking) => void;
  onReassignVan: (booking: Booking) => void;
  onReassignBeautician: (booking: Booking) => void;
  onSendSMS: (booking: Booking) => void;
  onDeleteBooking: (booking: Booking) => void;
}

const BookingTable = ({
  bookings,
  onEditBooking,
  onShowMap,
  onReassignVan,
  onReassignBeautician,
  onSendSMS,
  onDeleteBooking,
}: BookingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Van</TableHead>
            <TableHead>Beautician</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.client}</TableCell>
              <TableCell>{booking.service}</TableCell>
              <TableCell>
                {booking.date} <br />
                <span className="text-gray-500">{booking.time}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1 text-gray-400" />
                  {booking.location}
                </div>
              </TableCell>
              <TableCell>{booking.van}</TableCell>
              <TableCell>{booking.beautician}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentBadgeClass(booking.paymentStatus)}`}>
                  {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                </span>
              </TableCell>
              <TableCell className="font-medium">₤{booking.price}</TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm"
                    title="Show Location"
                    onClick={() => onShowMap(booking)}
                  >
                    <Map size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    title="Reassign Van"
                    onClick={() => onReassignVan(booking)}
                  >
                    <Truck size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    title="Reassign Beautician"
                    onClick={() => onReassignBeautician(booking)}
                  >
                    <User size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    title="Contact Client"
                    onClick={() => onSendSMS(booking)}
                  >
                    <MessageSquare size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    title="Edit Booking"
                    onClick={() => onEditBooking(booking)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    title="Cancel Booking"
                    onClick={() => onDeleteBooking(booking)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {bookings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No bookings found</p>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
