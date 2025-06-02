
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Check, X, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  clientName: string;
}

const UpcomingAppointmentsCard = () => {
  // Mock data for upcoming appointments
  const upcomingAppointments: Appointment[] = [
    {
      id: "4",
      date: "May 3, 2025",
      time: "11:00 AM",
      service: "Hair Styling",
      clientName: "Salma Kareem",
    },
    {
      id: "5",
      date: "May 4, 2025",
      time: "2:30 PM",
      service: "Nail Art",
      clientName: "Noura Fahim",
    },
    {
      id: "6",
      date: "May 5, 2025",
      time: "10:15 AM",
      service: "Bridal Package",
      clientName: "Amina Youssef",
    },
    {
      id: "7",
      date: "May 6, 2025",
      time: "4:00 PM",
      service: "Lash Extension",
      clientName: "Dina Mohamed",
    }
  ];

  // Handle cancel appointment
  const handleCancelAppointment = (id: string, clientName: string) => {
    // In a real app, this would open a modal for cancellation reason
    const reason = window.prompt("Please provide a reason for cancellation:");
    if (!reason) return;
    
    toast.info(`Appointment with ${clientName} cancelled. Admin has been notified.`);
    
    // In a real app, this would call the API
    console.log("API call would be: PATCH /api/bookings/" + id, { 
      status: "cancelled",
      cancellationReason: reason
    });
  };

  return (
    <Card className="shadow-md border-none h-[350px]">
      <CardHeader className="bg-salon-pink/10 pb-4">
        <CardTitle className="flex items-center text-lg">
          <CalendarDays className="h-5 w-5 mr-2 text-salon-purple" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[286px] overflow-y-auto">
          {upcomingAppointments.length > 0 ? (
            <div className="divide-y">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{appointment.date}</p>
                      <p className="font-medium">{appointment.time}</p>
                      <p className="text-sm font-bold">{appointment.service}</p>
                      <p className="text-sm text-gray-600">{appointment.clientName}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleCancelAppointment(appointment.id, appointment.clientName)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <p className="text-gray-500 text-center">No upcoming appointments scheduled</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsCard;
