
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AvailabilityManagerCard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  
  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    toast.success(isAvailable 
      ? "You're now marked as unavailable" 
      : "You're now marked as available");
      
    // In a real app, this would call the API
    console.log("API call would be: PATCH /api/beauticians/status", { 
      status: !isAvailable ? "available" : "unavailable"
    });
  };
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    if (selectedDate) {
      // Check if date is already selected
      const dateExists = selectedDates.some(
        (d) => format(d, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      );
      
      if (!dateExists) {
        setSelectedDates([...selectedDates, selectedDate]);
        toast.success(`Time off set for ${format(selectedDate, "MMMM d, yyyy")}`);
        
        // In a real app, this would call the API
        console.log("API call would be: POST /api/beauticians/timeoff", { 
          date: format(selectedDate, "yyyy-MM-dd")
        });
      }
    }
  };
  
  const handleCancelTimeOff = (dateToRemove: Date) => {
    setSelectedDates(selectedDates.filter(
      (d) => format(d, "yyyy-MM-dd") !== format(dateToRemove, "yyyy-MM-dd")
    ));
    
    toast.success(`Time off cancelled for ${format(dateToRemove, "MMMM d, yyyy")}`);
    
    // In a real app, this would call the API
    console.log("API call would be: DELETE /api/beauticians/timeoff", { 
      date: format(dateToRemove, "yyyy-MM-dd")
    });
  };

  return (
    <Card className="shadow-md border-none h-[350px]">
      <CardHeader className="bg-salon-pink/10 pb-4">
        <CardTitle className="flex items-center text-lg">
          <CalendarIcon className="h-5 w-5 mr-2 text-salon-purple" />
          Availability Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-col">
            <span className="font-medium">Availability Status</span>
            <span className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {isAvailable ? 'Available for Bookings' : 'Unavailable'}
            </span>
          </div>
          <Switch checked={isAvailable} onCheckedChange={handleToggleAvailability} />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Set Time Off</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg max-h-[100px] overflow-y-auto">
            {selectedDates.length > 0 ? (
              <div className="space-y-1">
                {selectedDates.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{format(d, "MMMM d, yyyy")}</span>
                    <div className="flex gap-1">
                      <Check className="h-4 w-4 text-green-600" />
                      <button 
                        onClick={() => handleCancelTimeOff(d)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center">No time off scheduled</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityManagerCard;
