
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DollarSign, CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EarningsTrackerCard = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  
  // Mock data for earnings
  const earningsData = {
    weekly: {
      amount: 1200,
      period: "this week",
      bookings: 5,
    },
    monthly: {
      amount: 5200,
      period: "this month",
      bookings: 22,
    },
  };

  // Handle request payout
  const handleRequestPayout = () => {
    toast.success("Payout request submitted successfully!");
    
    // In a real app, this would call the API
    console.log("API call would be: POST /api/payouts", { 
      beautician_id: "B001", 
      amount: activeTab === "weekly" ? 1200 : 5200 
    });
  };

  return (
    <Card className="shadow-md border-none h-[350px]">
      <CardHeader className="bg-salon-pink/10 pb-4">
        <CardTitle className="flex items-center text-lg">
          <DollarSign className="h-5 w-5 mr-2 text-salon-purple" />
          Earnings Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="weekly" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-0">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-salon-purple">EGP {earningsData.weekly.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{earningsData.weekly.period}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-6">
              <p className="text-sm">
                <span className="font-medium">Bookings completed:</span> {earningsData.weekly.bookings}
              </p>
              <p className="text-sm">
                <span className="font-medium">Average per service:</span> EGP {(earningsData.weekly.amount / earningsData.weekly.bookings).toFixed(0)}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-0">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-salon-purple">EGP {earningsData.monthly.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{earningsData.monthly.period}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-6">
              <p className="text-sm">
                <span className="font-medium">Bookings completed:</span> {earningsData.monthly.bookings}
              </p>
              <p className="text-sm">
                <span className="font-medium">Average per service:</span> EGP {(earningsData.monthly.amount / earningsData.monthly.bookings).toFixed(0)}
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          className="w-full"
          onClick={handleRequestPayout}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Request Payout to Vodafone Cash
        </Button>
      </CardContent>
    </Card>
  );
};

export default EarningsTrackerCard;
