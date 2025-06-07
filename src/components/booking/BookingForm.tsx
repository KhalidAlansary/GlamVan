import { useState, useEffect } from "react";
import { format, addDays, isBefore, isAfter, isToday } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getAvailableVanForLocation } from "@/data/vans";
import ServiceSelection from "./steps/ServiceSelection";
import DateTimeSelection from "./steps/DateTimeSelection";
import LocationSelection from "./steps/LocationSelection";
import PersonalDetails from "./steps/PersonalDetails";
import PaymentMethod from "./steps/PaymentMethod";
import Confirmation from "./steps/Confirmation";
import { CalendarIcon, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import BeauticianSelection from "./steps/BeauticianSelection";
import RateExperience from "./steps/RateExperience";
import LoyaltyTracking from "./steps/LoyaltyTracking";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BookingData {
  category: string;
  services: string[];
  date: Date | null;
  time: string;
  location: string;
  address: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  notes: string;
  paymentMethod: string;
  beautician: string;
  assignedVan?: string;
  cardInfo?: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
  receiptImage?: File | null;
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
  "Rate Experience",
];

interface BookingFormProps {
  preSelectedService?: string | null;
}

const BookingForm = ({ preSelectedService }: BookingFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    category: "",
    services: [],
    date: null,
    time: "",
    location: "",
    address: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    notes: "",
    paymentMethod: "cash",
    beautician: "",
    receiptImage: null,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [surchargeApplied, setSurchargeApplied] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*");

      return data;
    },
  });

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Pre-select service if passed via URL
  useEffect(() => {
    if (preSelectedService) {
      // Handle specific wedding package selections
      const weddingPackageMap: { [key: string]: string } = {
        bridal: "Bridal Package",
        "premium-wedding": "Premium Wedding Package",
        "mother-wedding": "Mother Package",
        bridesmaids: "Bridesmaids Package",
        "bridal-package": "Bridal Package",
        "premium-wedding-package": "Premium Wedding Package",
        "mother-wedding-package": "Mother Package",
        "bridesmaids-package": "Bridesmaids Package",
      };

      let serviceName = weddingPackageMap[preSelectedService];
      let service = services.find((s) => s.title === serviceName);

      if (!service) {
        // Fallback to finding by link
        service = services.find((s) => s.link.includes(preSelectedService));
      }

      if (service) {
        console.log(`Pre-selecting wedding service: ${service.title}`);
        setBookingData((prev) => ({
          ...prev,
          category: service.category,
          services: [service.title],
        }));

        // For wedding packages, set the active tab to 'wedding'
        if (service.category === "wedding") {
          // This will be handled by the ServiceSelection component
        }
      } else {
        console.log(`No service found for: ${preSelectedService}`);
      }
    }
  }, [preSelectedService, services]);

  // Set all selected categories
  useEffect(() => {
    if (bookingData.services.length > 0) {
      const categories = bookingData.services
        .map((serviceName) => {
          const service = services.find((s) => s.title === serviceName);
          return service ? service.category : "";
        })
        .filter(Boolean);

      // Remove duplicates
      const uniqueCategories = Array.from(new Set(categories));
      setAllCategories(uniqueCategories);
    } else {
      setAllCategories([]);
    }
  }, [bookingData.services, services]);

  // Automatically assign van when location is selected
  useEffect(() => {
    if (bookingData.location && !bookingData.assignedVan) {
      const availableVan = getAvailableVanForLocation(bookingData.location);
      if (availableVan) {
        setBookingData((prev) => ({
          ...prev,
          assignedVan: availableVan.name,
        }));
        console.log(
          `Automatically assigned ${availableVan.name} for ${bookingData.location}`,
        );
      }
    }
  }, [bookingData.location]);

  // Calculate total price based on selected services and any surcharges
  useEffect(() => {
    let total = 0;
    // Calculate base price from selected services
    bookingData.services.forEach((serviceName) => {
      const service = services.find((s) => s.title === serviceName);
      if (service) {
        // Extract numeric price (taking the minimum value if range is given)
        const priceString = service.price;
        const priceMatch = priceString.match(/(\d+[\d,]*)/);
        if (priceMatch) {
          const basePrice = parseInt(priceMatch[0].replace(/,/g, ""));
          total += basePrice;
        }
      }
    });

    // Apply surcharges
    if (bookingData.date) {
      // Same-day booking surcharge (10%)
      if (isToday(bookingData.date)) {
        total = total * 1.1;
        setSurchargeApplied(true);
      } else {
        setSurchargeApplied(false);
      }

      // Special wedding booking check
      const isWeddingService = bookingData.services.some(
        (s) =>
          s.toLowerCase().includes("bridal") ||
          s.toLowerCase().includes("wedding") ||
          s.toLowerCase().includes("bridesmaid") ||
          s.toLowerCase().includes("mother"),
      );

      if (isWeddingService) {
        // Check if booking is at least 1 month in advance for wedding
        const oneMonthFromNow = addDays(new Date(), 30);
        if (isBefore(bookingData.date, oneMonthFromNow)) {
          toast.error(
            "Wedding bookings require at least 1 month advance notice",
          );
        }
      }
    }

    setTotalPrice(total);
  }, [bookingData.services, bookingData.date, services]);

  const handleNext = () => {
    if (currentStep === steps.length - 4) {
      // Generate confirmation code
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const generatedCode = `GV${randomCode}`;
      setConfirmationCode(generatedCode);

      // Submit the form
      toast.success("Booking submitted successfully!");

      // Simulate sending confirmation via SMS and email
      console.log(
        `SMS sent: 🎀 Your GlamVan appointment is confirmed! Code: #${generatedCode}. See you on ${bookingData.date ? format(bookingData.date, "MMMM d, yyyy") : ""} at ${bookingData.time}! Your beautician is ${bookingData.beautician}. Van: ${bookingData.assignedVan}.`,
      );

      setBookingCompleted(true);
    }

    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextStep);

    // Scroll to top after step change
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const handlePrevious = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);

    // Scroll to top after step change
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const checkStepCompletion = () => {
    switch (currentStep) {
      case 0: // Service Selection
        return bookingData.services.length > 0;
      case 1: // Date & Time
        return bookingData.date !== null && bookingData.time !== "";
      case 2: // Beautician Selection
        return bookingData.beautician !== "";
      case 3: // Location
        return bookingData.location !== "" && bookingData.address !== "";
      case 4: // Personal Details
        return (
          bookingData.fullName !== "" &&
          bookingData.phoneNumber !== "" &&
          bookingData.email !== ""
        );
      case 5: // Payment
        if (bookingData.paymentMethod === "card") {
          return (
            bookingData.cardInfo?.cardNumber &&
            bookingData.cardInfo?.cardHolder &&
            bookingData.cardInfo?.expiryDate &&
            bookingData.cardInfo?.cvv
          );
        } else if (bookingData.paymentMethod === "instapay") {
          return bookingData.receiptImage !== null;
        }
        return bookingData.paymentMethod !== "";
      default:
        return true;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Progress Steps - REMOVING THE ARROWS */}
      <div className="flex justify-center mb-8 py-4">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex flex-col items-center ${
                  index <= currentStep ? "text-salon-purple" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 border-2 ${
                    index < currentStep
                      ? "bg-salon-purple border-salon-purple text-white"
                      : index === currentStep
                        ? "border-salon-purple text-salon-purple"
                        : "border-gray-300"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-xs font-medium mt-1 hidden sm:block">
                  {step}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-1 ${
                    index < currentStep ? "bg-salon-purple" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mt-6">
        {currentStep === 0 && (
          <ServiceSelection
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            preSelectedService={preSelectedService}
          />
        )}
        {currentStep === 1 && (
          <DateTimeSelection
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            isWedding={bookingData.services.some(
              (s) =>
                s.toLowerCase().includes("bridal") ||
                s.toLowerCase().includes("wedding") ||
                s.toLowerCase().includes("bridesmaid") ||
                s.toLowerCase().includes("mother"),
            )}
          />
        )}
        {currentStep === 2 && (
          <BeauticianSelection
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            categories={allCategories}
          />
        )}
        {currentStep === 3 && (
          <LocationSelection
            bookingData={bookingData}
            updateBookingData={updateBookingData}
          />
        )}
        {currentStep === 4 && (
          <PersonalDetails
            bookingData={bookingData}
            updateBookingData={updateBookingData}
          />
        )}
        {currentStep === 5 && (
          <PaymentMethod
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            totalPrice={totalPrice}
            surchargeApplied={surchargeApplied}
          />
        )}
        {currentStep === 6 && (
          <Confirmation
            bookingData={bookingData}
            totalPrice={totalPrice}
            confirmationCode={confirmationCode}
          />
        )}
        {currentStep === 7 && bookingCompleted && (
          <LoyaltyTracking
            bookingData={bookingData}
            confirmationCode={confirmationCode}
          />
        )}
        {currentStep === 8 && bookingCompleted && (
          <RateExperience
            bookingData={bookingData}
            confirmationCode={confirmationCode}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>
        )}
        {currentStep === 0 && <div />}

        {currentStep < steps.length - 1 && (
          <Button
            onClick={handleNext}
            className="bg-salon-purple hover:bg-salon-dark-purple ml-auto flex items-center gap-2 relative overflow-hidden booking-btn"
            disabled={!checkStepCompletion()}
          >
            {currentStep === steps.length - 4 ? "Complete Booking" : "Next"}{" "}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
