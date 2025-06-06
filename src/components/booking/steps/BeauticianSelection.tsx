import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookingData } from "../BookingForm";
import { UserRound, Star, StarHalf } from "lucide-react";

interface BeauticianSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  categories: string[];
}

// Sample beauticians data - in a real app this would come from an API/database
const beauticians = [
  {
    id: "1",
    name: "Sarah Ahmed",
    specialties: ["hair", "makeup"],
    experience: "5 years",
    rating: 4.9,
    reviews: 124,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Layla Mahmoud",
    specialties: ["nails", "lashes"],
    experience: "7 years",
    rating: 4.7,
    reviews: 98,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Nour Hassan",
    specialties: ["hair", "makeup", "wedding"],
    experience: "8 years",
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Maya Kamel",
    specialties: ["nails", "lashes", "makeup"],
    experience: "4 years",
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Dina Samir",
    specialties: ["hair", "wedding"],
    experience: "9 years",
    rating: 5.0,
    reviews: 203,
    image: "/placeholder.svg",
  },
];

const BeauticianSelection = ({
  bookingData,
  updateBookingData,
  categories,
}: BeauticianSelectionProps) => {
  const [selectedBeautician, setSelectedBeautician] = useState(
    bookingData.beautician,
  );

  // Filter beauticians by matching specialties with selected service categories
  const filteredBeauticians = beauticians.filter((beautician) => {
    // For wedding bookings, ensure they have wedding specialty
    if (
      categories.includes("wedding") &&
      !beautician.specialties.includes("wedding")
    ) {
      return false;
    }

    // Check if beautician has at least one of the required specialties
    return categories.some((category) =>
      beautician.specialties.includes(category),
    );
  });

  const handleBeauticianSelection = (beauticianId: string) => {
    setSelectedBeautician(beauticianId);

    // Find the beautician name by ID
    const beautician = beauticians.find((b) => b.id === beauticianId);
    updateBookingData({ beautician: beautician?.name || "" });
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">
        Choose Your Beautician
      </h2>

      <p className="text-center text-gray-600">
        Select a beautician specializing in your requested services
      </p>

      {filteredBeauticians.length === 0 ? (
        <div className="text-center p-6 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">
            No beauticians available for these services. Please try different
            services or contact us directly.
          </p>
        </div>
      ) : (
        <RadioGroup
          value={selectedBeautician}
          onValueChange={handleBeauticianSelection}
          className="grid gap-4"
        >
          {filteredBeauticians.map((beautician) => (
            <div
              key={beautician.id}
              className={`border rounded-md p-4 cursor-pointer hover:border-salon-purple transition-all ${
                selectedBeautician === beautician.id
                  ? "border-salon-purple bg-salon-purple/5"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem
                  value={beautician.id}
                  id={`beautician-${beautician.id}`}
                  className="mt-1"
                />

                <div className="h-16 w-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={beautician.image}
                    alt={beautician.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <Label
                    htmlFor={`beautician-${beautician.id}`}
                    className="text-base font-medium cursor-pointer flex justify-between items-start"
                  >
                    <span>{beautician.name}</span>
                    <span className="text-gray-500 text-sm">
                      {beautician.experience}
                    </span>
                  </Label>

                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(beautician.rating)}
                    <span className="text-sm text-gray-600">
                      {beautician.rating} ({beautician.reviews} reviews)
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {beautician.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className={`text-xs px-2 py-1 rounded-full ${
                          categories.includes(specialty)
                            ? "bg-salon-purple/10 text-salon-purple"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      )}

      {selectedBeautician && (
        <div className="mt-6 p-4 bg-salon-purple/5 rounded-md">
          <h3 className="font-medium">Your Selected Beautician:</h3>
          <p className="text-salon-purple mt-1 font-medium">
            {beauticians.find((b) => b.id === selectedBeautician)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default BeauticianSelection;
