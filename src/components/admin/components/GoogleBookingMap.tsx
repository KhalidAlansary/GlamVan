
import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GoogleBookingMapProps {
  location: string;
  address?: string;
}

const GoogleBookingMap = ({ location, address }: GoogleBookingMapProps) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const locationCoords = {
    "New Cairo": { lat: 30.0133, lng: 31.4967 },
    "El Rehab": { lat: 30.0722, lng: 31.4911 },
    "Sheikh Zayed": { lat: 30.0644, lng: 30.9767 },
    "Tagmo3": { lat: 30.0278, lng: 31.4594 }
  };

  const coords = locationCoords[location as keyof typeof locationCoords] || locationCoords["New Cairo"];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast.success("Location detected successfully!");
        },
        (error) => {
          toast.error("Unable to detect location. Using default location.");
          console.log("Location error:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center border p-6">
      <MapPin className="mb-4 text-salon-purple" size={32} />
      <div className="text-center">
        <p className="font-medium">{location}</p>
        {address && <p className="text-sm text-gray-600 mt-1">{address}</p>}
        {userLocation && (
          <p className="text-xs text-green-600 mt-2">
            Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
          onClick={openInGoogleMaps}
        >
          <Navigation size={14} className="mr-1" />
          Open in Google Maps
        </Button>
      </div>
    </div>
  );
};

export default GoogleBookingMap;
