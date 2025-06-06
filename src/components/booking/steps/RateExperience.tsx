import { useState } from "react";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookingData } from "../BookingForm";
import { toast } from "sonner";

interface RateExperienceProps {
  bookingData: BookingData;
  confirmationCode: string;
}

interface RatingCategory {
  id: string;
  name: string;
  value: number;
}

const RateExperience = ({
  bookingData,
  confirmationCode,
}: RateExperienceProps) => {
  const [ratings, setRatings] = useState<RatingCategory[]>([
    { id: "service", name: "Service Quality", value: 5 },
    { id: "beautician", name: "Beautician", value: 5 },
    { id: "van", name: "Van Cleanliness", value: 5 },
    { id: "atmosphere", name: "Atmosphere", value: 5 },
    { id: "overall", name: "Overall Experience", value: 5 },
  ]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSetRating = (id: string, value: number) => {
    setRatings((prev) => prev.map((r) => (r.id === id ? { ...r, value } : r)));
  };

  const handleSubmit = () => {
    // Here would be the actual API call to submit the ratings
    console.log("Submitting ratings:", { ratings, comment, confirmationCode });
    toast.success("Thank you for your feedback!");
    setSubmitted(true);
  };

  const renderStars = (categoryId: string, currentValue: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer transition-all ${
              star <= currentValue
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => handleSetRating(categoryId, star)}
          />
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 fill-green-600 text-green-600" />
        </div>
        <h2 className="text-2xl font-playfair font-bold">Thank You!</h2>
        <p className="text-gray-600">
          Your feedback has been submitted and will help us improve our
          services.
        </p>
        <p className="text-salon-purple font-medium">
          We look forward to serving you again!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">
        Rate Your Experience
      </h2>
      <p className="text-center text-gray-600">
        Help us improve by rating your recent GlamVan experience
      </p>

      <div className="bg-salon-purple/5 p-4 rounded-md mb-6">
        <h3 className="font-medium">Booking Details:</h3>
        <p className="text-sm mt-1">
          <span className="font-medium">Confirmation Code:</span> #
          {confirmationCode}
        </p>
        <p className="text-sm">
          <span className="font-medium">Services:</span>{" "}
          {bookingData.services.join(", ")}
        </p>
        <p className="text-sm">
          <span className="font-medium">Beautician:</span>{" "}
          {bookingData.beautician}
        </p>
      </div>

      <div className="space-y-6">
        {ratings.map((category) => (
          <div key={category.id} className="space-y-2">
            <div className="flex justify-between">
              <label className="font-medium text-gray-700">
                {category.name}
              </label>
              <span className="text-sm text-salon-purple">
                {category.value}/5
              </span>
            </div>
            <div className="flex justify-center">
              {renderStars(category.id, category.value)}
            </div>
          </div>
        ))}

        <div className="pt-4">
          <label className="block font-medium text-gray-700 mb-2">
            Additional Comments (Optional)
          </label>
          <Textarea
            placeholder="Share your experience with us..."
            className="min-h-[100px]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-salon-purple hover:bg-salon-dark-purple"
        >
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};

export default RateExperience;
