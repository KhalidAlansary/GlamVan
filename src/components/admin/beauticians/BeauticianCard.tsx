
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Edit, User, MapPin, TrendingUp } from "lucide-react";
import { Stylist } from "../types/stylist";

interface BeauticianCardProps {
  stylist: Stylist;
  onEdit: (stylist: Stylist) => void;
  onStatusToggle: (stylist: Stylist) => void;
}

export const BeauticianCard = ({ stylist, onEdit, onStatusToggle }: BeauticianCardProps) => {
  return (
    <Card className="bg-white rounded-lg shadow p-4 flex flex-col h-full w-full">
      <div className="flex items-center mb-4">
        <div className="relative">
          <Avatar className="w-16 h-16">
            <AvatarImage src={stylist.image} alt={stylist.name} />
            <AvatarFallback>{stylist.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span 
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              stylist.status === "active" ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>
        <div className="ml-4">
          <h3 className="font-semibold">{stylist.name}</h3>
          <p className="text-sm text-gray-500">{stylist.experience} experience</p>
          <div className="flex items-center mt-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm ml-1">{stylist.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center">
          <User className="w-3 h-3 mr-1" /> Specialties
        </h4>
        <div className="flex flex-wrap gap-2">
          {stylist.specialties.map((specialty, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-salon-pink/20 text-salon-purple rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {stylist.workZones && (
        <div className="mb-3">
          <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center">
            <MapPin className="w-3 h-3 mr-1" /> Work Zones
          </h4>
          <p className="text-xs text-gray-600">
            {stylist.workZones.join(", ")}
          </p>
        </div>
      )}
      
      {stylist.bookingsCompleted && (
        <div className="flex flex-col">
          <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> Bookings Trend
          </h4>
          <div className="flex items-end h-8 gap-1 mb-2">
            {stylist.bookingsCompleted.map((count, idx) => (
              <div 
                key={idx}
                className="bg-salon-purple/70 rounded-sm w-4"
                style={{ height: `${Math.max(count * 10, 5)}%` }}
              ></div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(stylist)}
        >
          <Edit className="w-4 h-4 mr-1" /> Edit Profile
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={stylist.status === "active" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}
          onClick={() => onStatusToggle(stylist)}
        >
          {stylist.status === "active" ? "Set Offline" : "Set Online"}
        </Button>
      </div>
    </Card>
  );
};
