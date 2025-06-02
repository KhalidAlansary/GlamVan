
import { format } from "date-fns";
import { BookingData } from "../BookingForm";
import { CheckCircle } from "lucide-react";

interface ConfirmationProps {
  bookingData: BookingData;
  totalPrice: number;
  confirmationCode: string;
}

const Confirmation = ({ bookingData, totalPrice, confirmationCode }: ConfirmationProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-playfair font-bold">Booking Confirmed!</h2>
        <p className="text-gray-600 mt-2">
          Your appointment has been successfully booked. We've sent a confirmation to your email and phone.
        </p>
      </div>
      
      <div className="bg-salon-purple/5 p-6 rounded-lg border border-salon-purple/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Confirmation Code</h3>
          <span className="bg-salon-purple text-white py-1 px-3 rounded-full text-sm font-bold">
            #{confirmationCode}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Services</h4>
              <ul className="mt-1">
                {bookingData.services.map((service, index) => (
                  <li key={index} className="text-sm">{service}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
              <p className="mt-1">
                {bookingData.date && format(bookingData.date, "EEEE, MMMM d, yyyy")}
                <br />
                {bookingData.time}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Location</h4>
              <p className="mt-1">{bookingData.location}</p>
              <p className="text-sm">{bookingData.address}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
              <p className="mt-1">{bookingData.fullName}</p>
              <p className="text-sm">{bookingData.phoneNumber}</p>
              <p className="text-sm">{bookingData.email}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Payment Method</h4>
            <p className="mt-1">
              {bookingData.paymentMethod === "cash" && "Cash on Delivery"}
              {bookingData.paymentMethod === "vf-cash" && "Vodafone Cash"}
              {bookingData.paymentMethod === "instapay" && "InstaPay"}
              {bookingData.paymentMethod === "card" && "Credit/Debit Card"}
            </p>
          </div>
          
          <div className="pt-3 border-t border-dashed border-gray-300">
            <div className="flex justify-between">
              <h4 className="font-medium">Total Price</h4>
              <p className="font-bold text-salon-purple">{totalPrice.toFixed(0)} EGP</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md text-sm space-y-4">
        <div>
          <h3 className="font-medium">Need to reschedule?</h3>
          <p className="text-gray-600 text-sm mt-1">
            Please contact us at least 24 hours before your appointment to reschedule without any charges.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium">Questions?</h3>
          <p className="text-gray-600 text-sm mt-1">
            Contact our customer support at support@glamvan.com or call us at +20 01123456789
          </p>
        </div>
      </div>
      
      <div className="text-center pt-4">
        <p className="text-sm text-gray-500">
          Thank you for choosing GlamVan Mobile Salon! We look forward to serving you.
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
