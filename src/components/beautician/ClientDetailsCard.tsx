
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, User } from "lucide-react";
import { toast } from "sonner";

interface ClientDetails {
  id: string;
  name: string;
  phone: string;
  location: string;
  serviceNotes: string;
}

const ClientDetailsCard = () => {
  // Mock client details for today's appointments
  const [clients, setClients] = useState<ClientDetails[]>([
    {
      id: "1",
      name: "Fatima Ahmed",
      phone: "+20 101 234 5678",
      location: "New Cairo, Rehab City",
      serviceNotes: "Allergic to latex. Prefers natural looks."
    },
    {
      id: "2",
      name: "Mariam Khalid",
      phone: "+20 112 345 6789",
      location: "Cairo, Maadi",
      serviceNotes: "First-time client. Wants subtle look."
    },
  ]);
  
  const [activeClient, setActiveClient] = useState<ClientDetails>(clients[0]);

  const handleCallClient = () => {
    // In a real app, this would use tel: protocol to initiate a call
    window.open(`tel:${activeClient.phone.replace(/\s+/g, '')}`);
    toast.success(`Calling ${activeClient.name}...`);
  };
  
  const handleGetDirections = () => {
    // In a real app, this would open Google Maps with the location
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeClient.location)}`);
    toast.success("Opened directions in Google Maps");
  };

  return (
    <Card className="shadow-md border-none h-[350px]">
      <CardHeader className="bg-salon-pink/10 pb-4">
        <CardTitle className="flex items-center text-lg">
          <User className="h-5 w-5 mr-2 text-salon-purple" />
          Client Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {clients.map((client) => (
              <Button
                key={client.id}
                variant={client.id === activeClient.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveClient(client)}
              >
                {client.name}
              </Button>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-lg mb-2">{activeClient.name}</h3>
            <p className="text-sm mb-1">
              <span className="font-medium">Phone:</span> {activeClient.phone}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Location:</span> {activeClient.location}
            </p>
            <p className="text-sm">
              <span className="font-medium">Notes:</span> {activeClient.serviceNotes}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleCallClient}>
              <Phone className="h-4 w-4 mr-2" />
              Call Client
            </Button>
            <Button onClick={handleGetDirections}>
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDetailsCard;
