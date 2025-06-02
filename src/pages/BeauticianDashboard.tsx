
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import TodayScheduleCard from "@/components/beautician/TodayScheduleCard";
import EarningsTrackerCard from "@/components/beautician/EarningsTrackerCard";
import ClientDetailsCard from "@/components/beautician/ClientDetailsCard";
import AvailabilityManagerCard from "@/components/beautician/AvailabilityManagerCard";
import SkillUpgradesCard from "@/components/beautician/SkillUpgradesCard";
import BeauticianNavbar from "@/components/beautician/BeauticianNavbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UpcomingAppointmentsCard from "@/components/beautician/UpcomingAppointmentsCard";

const BeauticianDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Notification system for appointments
  useEffect(() => {
    // Check for upcoming appointments and notify the beautician
    const upcomingAppointment = {
      time: "12:30 PM",
      service: "Makeup Session",
      clientName: "Hana Mahmoud"
    };
    
    // Simulate an appointment notification (in a real app, this would check actual times)
    const notificationTimeout = setTimeout(() => {
      toast("Upcoming Appointment", {
        description: `You have ${upcomingAppointment.service} with ${upcomingAppointment.clientName} at ${upcomingAppointment.time}`,
        duration: 10000,
      });
    }, 5000); // Show notification after 5 seconds for demo purposes
    
    return () => clearTimeout(notificationTimeout);
  }, []);
  
  // Always show the dashboard for now - removed authentication checks temporarily
  return (
    <div className="min-h-screen bg-gray-50">
      <BeauticianNavbar />
      <Toaster />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-salon-purple">Beautician Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Today's Schedule Card */}
          <div className="h-[350px]">
            <TodayScheduleCard />
          </div>
          
          {/* Upcoming Appointments Card */}
          <div className="h-[350px]">
            <UpcomingAppointmentsCard />
          </div>
          
          {/* Earnings Tracker Card */}
          <div className="h-[350px]">
            <EarningsTrackerCard />
          </div>
          
          {/* Client Details Card */}
          <div className="h-[350px]">
            <ClientDetailsCard />
          </div>
          
          {/* Availability Manager Card */}
          <div className="h-[350px]">
            <AvailabilityManagerCard />
          </div>
          
          {/* Skill Upgrades Card */}
          <div className="h-[350px]">
            <SkillUpgradesCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeauticianDashboard;
