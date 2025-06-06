import { useState } from "react";
import { BookingData } from "../BookingForm";
import { Star, Gift, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoyaltyTrackingProps {
  bookingData: BookingData;
  confirmationCode: string;
}

const LoyaltyTracking = ({
  bookingData,
  confirmationCode,
}: LoyaltyTrackingProps) => {
  const [loyaltyPoints, setLoyaltyPoints] = useState(1);
  const [showCelebration, setShowCelebration] = useState(true);

  const handleContinue = () => {
    setShowCelebration(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-salon-purple to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-playfair font-bold mb-2">
          GlamVan Loyalty Program
        </h2>
        <p className="text-gray-600">
          Congratulations! You've earned your first loyalty point! 🎉
        </p>
      </div>

      {showCelebration && (
        <div className="bg-gradient-to-r from-salon-purple/10 to-pink-100/50 p-6 rounded-lg border border-salon-purple/20">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="text-2xl font-bold text-salon-purple">
                {loyaltyPoints}/5
              </span>
              <Gift className="w-6 h-6 text-salon-purple" />
            </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="font-medium text-lg mb-2">Your Loyalty Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className="bg-gradient-to-r from-salon-purple to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(loyaltyPoints / 5) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Complete {5 - loyaltyPoints} more bookings to unlock 25% off your
              next service! ✨
            </p>
          </div>

          <div className="bg-white p-4 rounded-md mb-4">
            <h4 className="font-medium mb-2">Loyalty Benefits:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Earn 1 point for every completed booking</li>
              <li>• Get 25% off your next service after 5 points</li>
              <li>• Exclusive access to new services</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-3">
              Your loyalty points are linked to: {bookingData.email}
            </p>
            <Button
              onClick={handleContinue}
              className="bg-salon-purple hover:bg-salon-dark-purple"
            >
              Continue to Rating
            </Button>
          </div>
        </div>
      )}

      {!showCelebration && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Your loyalty point has been added to your account! Keep booking to
            earn your discount.
          </p>
          <div className="p-4 bg-salon-purple/5 rounded-lg">
            <p className="text-sm text-salon-purple">
              <strong>Confirmation #{confirmationCode}</strong> - 1 Loyalty
              Point Earned ⭐
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyTracking;
