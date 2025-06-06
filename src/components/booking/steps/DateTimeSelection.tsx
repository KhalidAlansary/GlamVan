import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  format,
  addDays,
  addMonths,
  isBefore,
  isPast,
  startOfDay,
  isToday,
} from "date-fns";
import { BookingData } from "../BookingForm";
import { toast } from "sonner";
import { CalendarIcon, Clock } from "lucide-react";

interface DateTimeSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  isWedding: boolean;
}

const DateTimeSelection = ({
  bookingData,
  updateBookingData,
  isWedding,
}: DateTimeSelectionProps) => {
  const today = new Date();
  const minDate = isWedding
    ? addMonths(today, 1) // 1 month minimum for weddings
    : addDays(today, 7); // 1 week minimum for regular bookings

  const recommendedDate = isWedding
    ? addDays(today, 35) // Recommended 5 weeks in advance for weddings
    : addDays(today, 10); // Recommended 10 days in advance for regular

  // Available time slots
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">
        Choose Date & Time
      </h2>

      {isWedding ? (
        <div className="p-4 border-l-4 border-salon-pink bg-salon-pink/10 text-sm mb-4">
          <h3 className="font-bold text-base">Wedding Booking Policy</h3>
          <p className="text-red-600 font-medium">
            Important: Wedding appointments must be booked at least 1 month in
            advance.
          </p>
          <p className="mt-2">
            This includes a trial session (scheduled 2 weeks before) and our
            premium bridal services package.
          </p>
        </div>
      ) : (
        <div className="p-4 border-l-4 border-salon-purple/70 bg-salon-purple/5 mb-4">
          <h3 className="font-medium">Regular Booking Policy</h3>
          <p className="text-red-600 font-medium">
            All beauty services must be booked at least 1 week in advance.
          </p>
          <ul className="text-sm mt-2 space-y-1">
            <li>• Recommended: Book early for preferred time slots</li>
            <li>• Same-day bookings: +10% surcharge (if available)</li>
            <li>• Holidays/Events: Dynamic pricing may apply</li>
          </ul>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" /> Select Date
          </h3>
          <Calendar
            mode="single"
            selected={bookingData.date || undefined}
            onSelect={(date) => {
              if (date) {
                if (isWedding && isBefore(date, minDate)) {
                  toast.error(
                    "Wedding bookings require at least 1 month advance notice",
                  );
                  return;
                }
                updateBookingData({ date });

                if (
                  !isWedding &&
                  isBefore(date, recommendedDate) &&
                  !isPast(date)
                ) {
                  toast.info(
                    "We recommend booking at least 1 week in advance for the best availability",
                  );
                }

                if (!isWedding && isPast(date)) {
                  toast.warning("Same-day bookings have a 10% surcharge");
                }
              }
            }}
            disabled={(date) => isPast(date) && !isToday(date)}
            fromDate={minDate}
            toDate={addMonths(today, 3)}
            className="rounded-md border p-3 pointer-events-auto"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Select Time
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={bookingData.time === time ? "default" : "outline"}
                className={`${bookingData.time === time ? "bg-salon-purple" : ""}`}
                onClick={() => updateBookingData({ time })}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {bookingData.date && bookingData.time && (
        <div className="mt-8 p-4 bg-salon-purple/5 rounded-md">
          <h3 className="font-medium">Your Selected Date & Time:</h3>
          <p className="text-lg text-salon-purple mt-1 font-medium">
            {format(bookingData.date, "EEEE, MMMM d, yyyy")} at{" "}
            {bookingData.time}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelection;
