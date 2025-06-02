
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { services } from "@/data/services";
import { BookingData } from "../BookingForm";
import { CheckCircle } from "lucide-react";

interface ServiceSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  preSelectedService?: string | null;
}

const steps = [
  "Service Selection",
  "Date & Time",
  "Beautician",
  "Location",
  "Personal Details",
  "Payment",
  "Confirmation",
  "Loyalty Program",
  "Rate Experience"
];

const ServiceSelection = ({ bookingData, updateBookingData, preSelectedService }: ServiceSelectionProps) => {
  const [activeTab, setActiveTab] = useState(bookingData.category || "hair");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Set initial tab based on pre-selected service
  useEffect(() => {
    if (preSelectedService && bookingData.services.length > 0) {
      const service = services.find(s => bookingData.services.includes(s.title));
      if (service && service.category) {
        setActiveTab(service.category);
      }
    }
  }, [preSelectedService, bookingData.services]);
  
  // Update selected categories based on services
  useEffect(() => {
    if (bookingData.services.length > 0) {
      const categories = bookingData.services.map(serviceName => {
        const service = services.find(s => s.title === serviceName);
        return service ? service.category : "";
      }).filter(Boolean);
      
      // Remove duplicates
      const uniqueCategories = Array.from(new Set(categories));
      setSelectedCategories(uniqueCategories);
    } else {
      setSelectedCategories([]);
    }
  }, [bookingData.services]);
  
  const handleCategoryChange = (category: string) => {
    setActiveTab(category);
  };
  
  const handleServiceToggle = (serviceName: string) => {
    const isSelected = bookingData.services.includes(serviceName);
    
    let updatedServices: string[];
    if (isSelected) {
      updatedServices = bookingData.services.filter(s => s !== serviceName);
    } else {
      updatedServices = [...bookingData.services, serviceName];
    }
    
    updateBookingData({ services: updatedServices });
  };

  const filteredServices = services.filter(service => service.category === activeTab);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">Select Your Services</h2>
      <p className="text-center text-gray-600">Mix and match services from different categories as you need!</p>
      
      <Tabs value={activeTab} className="w-full" onValueChange={handleCategoryChange}>
        <TabsList className="grid grid-cols-5 bg-gray-100 mb-6">
          <TabsTrigger 
            value="hair" 
            className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
          >
            Hair
          </TabsTrigger>
          <TabsTrigger 
            value="makeup" 
            className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
          >
            Makeup
          </TabsTrigger>
          <TabsTrigger 
            value="nails" 
            className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
          >
            Nails
          </TabsTrigger>
          <TabsTrigger 
            value="lashes" 
            className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
          >
            Lashes
          </TabsTrigger>
          <TabsTrigger 
            value="wedding" 
            className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
          >
            Wedding
          </TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className={`p-4 border rounded-md cursor-pointer flex items-start gap-3 hover:border-salon-purple transition-all ${
                bookingData.services.includes(service.title) ? "border-salon-purple bg-salon-purple/5" : "border-gray-200"
              }`}
              onClick={() => handleServiceToggle(service.title)}
            >
              <Checkbox 
                id={`service-${service.id}`} 
                checked={bookingData.services.includes(service.title)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={`service-${service.id}`} 
                  className="text-base font-medium cursor-pointer flex justify-between"
                >
                  <span>{service.title}</span>
                  <span className="text-salon-purple font-semibold">{service.price}</span>
                </Label>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Tabs>
      
      {bookingData.services.length > 0 && (
        <div className="mt-6 p-6 bg-gray-50 rounded-md border">
          {/* Timeline included in selected services box */}
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`flex flex-col items-center ${
                        index === 0 ? "text-salon-purple" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${
                          index === 0
                            ? "bg-salon-purple border-salon-purple text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {index === 0 ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="text-xs font-medium mt-1 hidden sm:block text-center max-w-16">
                        {step}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-1 mx-1 ${
                          index < 0 ? "bg-salon-purple" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <h3 className="font-medium mb-3">Selected Services:</h3>
          <ul className="list-disc list-inside space-y-1">
            {bookingData.services.map(service => (
              <li key={service} className="text-gray-700">{service}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceSelection;
