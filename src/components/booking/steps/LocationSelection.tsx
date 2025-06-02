
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { BookingData } from "../BookingForm";
import { MapPin, Truck } from "lucide-react";
import { getAvailableVanForLocation } from "@/data/vans";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface LocationSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
}

// Define central Cairo coordinates
const CAIRO_COORDS = {
  lat: 30.0444,
  lng: 31.2357
};

const LocationSelection = ({ bookingData, updateBookingData }: LocationSelectionProps) => {
  const locations = [
    "New Cairo",
    "El Rehab",
    "Sheikh Zayed"
  ];
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [assignedVan, setAssignedVan] = useState<string | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenEntered, setTokenEntered] = useState(false);
  
  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [CAIRO_COORDS.lng, CAIRO_COORDS.lat],
        zoom: 12
      });
      
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setMapLoaded(true);
      });
      
      map.current.on('click', (event) => {
        placeMarker(event.lngLat.lng, event.lngLat.lat);
      });
      
      console.log("Map initialized successfully");
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };
  
  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenEntered(true);
      initializeMap(mapboxToken.trim());
    }
  };
  
  const placeMarker = (lng: number, lat: number) => {
    if (!map.current) return;
    
    if (marker.current) {
      marker.current.remove();
    }
    
    marker.current = new mapboxgl.Marker({ color: "#9c27b0" })
      .setLngLat([lng, lat])
      .addTo(map.current);
    
    console.log(`Selected location: ${lng}, ${lat}`);
  };
  
  useEffect(() => {
    if (!map.current || !mapLoaded || !bookingData.location) return;
    
    const locationCoordinates: {[key: string]: {lng: number, lat: number}} = {
      "New Cairo": {lng: 31.4913, lat: 30.0074},
      "El Rehab": {lng: 31.4980, lat: 30.0583},
      "Sheikh Zayed": {lng: 31.0121, lat: 30.0444}
    };
    
    const coords = locationCoordinates[bookingData.location] || CAIRO_COORDS;
    
    map.current.flyTo({
      center: [coords.lng, coords.lat],
      zoom: 13,
      essential: true
    });
    
    placeMarker(coords.lng, coords.lat);
  }, [bookingData.location, mapLoaded]);

  // Check for available van when location changes
  useEffect(() => {
    if (bookingData.location) {
      const availableVan = getAvailableVanForLocation(bookingData.location);
      if (availableVan) {
        setAssignedVan(availableVan.name);
        updateBookingData({ assignedVan: availableVan.name });
      } else {
        setAssignedVan(null);
        updateBookingData({ assignedVan: undefined });
      }
    }
  }, [bookingData.location]);

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">Provide Your Location</h2>
      
      <div className="space-y-6">
        <div>
          <Label className="mb-2 block font-medium">Select Area</Label>
          <RadioGroup 
            value={bookingData.location}
            onValueChange={(value) => updateBookingData({ location: value })}
            className="grid grid-cols-2 gap-4"
          >
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <RadioGroupItem value={location} id={`location-${location}`} />
                <Label htmlFor={`location-${location}`} className="cursor-pointer">{location}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="address" className="mb-2 block font-medium">
            Full Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="address"
            placeholder="Street, building number, floor, apartment/villa number"
            value={bookingData.address}
            onChange={(e) => updateBookingData({ address: e.target.value })}
            className="min-h-[100px]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Please provide detailed address information to help our beauticians locate you easily.
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-salon-purple" />
              Pin Your Location
            </h3>
          </div>
          
          {!tokenEntered ? (
            <div className="p-6 bg-gray-50">
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  To use the interactive map, please enter your Mapbox API token.
                  <br />
                  Get your token from: <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-salon-purple underline">mapbox.com</a>
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input
                    type="text"
                    placeholder="Enter your Mapbox token"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleTokenSubmit}
                    disabled={!mapboxToken.trim()}
                    className="bg-salon-purple hover:bg-salon-dark-purple"
                  >
                    Load Map
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div ref={mapContainer} className="h-[300px]"></div>
          )}
        </div>
        
        {assignedVan && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-medium flex items-center text-green-800">
              <Truck className="h-4 w-4 mr-2" />
              Van Automatically Assigned
            </h3>
            <p className="text-green-700 mt-1">
              <strong>{assignedVan}</strong> has been assigned to your booking for {bookingData.location}
            </p>
          </div>
        )}
        
        {bookingData.location && bookingData.address && (
          <div className="p-4 bg-salon-purple/5 rounded-md">
            <h3 className="font-medium">Selected Location:</h3>
            <p className="font-medium text-salon-purple mt-1">{bookingData.location}</p>
            <p className="text-gray-700 mt-1">{bookingData.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelection;
