
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookingData } from "../BookingForm";
import { CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PaymentMethodProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  totalPrice: number;
  surchargeApplied: boolean;
}

const PaymentMethod = ({ 
  bookingData, 
  updateBookingData,
  totalPrice,
  surchargeApplied
}: PaymentMethodProps) => {
  const [selectedPayment, setSelectedPayment] = useState(bookingData.paymentMethod);

  const paymentMethods = [
    { id: "cash", label: "Cash on Delivery" },
    { id: "vf-cash", label: "Vodafone Cash" },
    { id: "instapay", label: "InstaPay" },
    { id: "card", label: "Credit/Debit Card" }
  ];

  // Check if wedding service is selected
  const isWeddingBooking = bookingData.services.some(s => 
    s.toLowerCase().includes('bridal') || s.toLowerCase().includes('wedding')
  );

  // Calculate any deposit for wedding bookings
  const depositAmount = isWeddingBooking ? totalPrice * 0.5 : 0;
  
  const handlePaymentMethodChange = (value: string) => {
    setSelectedPayment(value);
    updateBookingData({ paymentMethod: value });
  };

  const handleCardInfoChange = (field: string, value: string) => {
    updateBookingData({ 
      cardInfo: { 
        ...bookingData.cardInfo || {
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: ''
        }, 
        [field]: value 
      } 
    });
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateBookingData({ receiptImage: e.target.files[0] });
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">Payment Method</h2>
      
      {/* Price Summary */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-lg mb-4">Booking Summary</h3>
        
        <div className="space-y-2">
          {bookingData.services.map((service, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{service}</span>
              <span>Price included in total</span>
            </div>
          ))}
          
          <div className="border-t border-dashed border-gray-300 my-2"></div>
          
          {surchargeApplied && (
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">Same-day booking surcharge (10%)</span>
              <span className="text-orange-600">Applied</span>
            </div>
          )}
          
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total Price</span>
            <span className="text-salon-purple">{totalPrice.toFixed(0)} EGP</span>
          </div>
          
          {isWeddingBooking && (
            <>
              <div className="border-t border-dashed border-gray-300 my-2"></div>
              <div className="flex justify-between text-sm bg-salon-pink/10 p-2 rounded">
                <span className="font-medium">Required Deposit (50%)</span>
                <span className="font-medium">{depositAmount.toFixed(0)} EGP</span>
              </div>
              <p className="text-xs text-gray-600">
                Wedding bookings require a 50% deposit to confirm your appointment.
              </p>
            </>
          )}
        </div>
      </div>
      
      <div>
        <Label className="mb-4 block font-medium flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Select Payment Method
        </Label>
        
        <RadioGroup
          value={bookingData.paymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="grid gap-4"
        >
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-salon-purple transition-all ${
                bookingData.paymentMethod === method.id ? "border-salon-purple bg-salon-purple/5" : ""
              }`}
              onClick={() => handlePaymentMethodChange(method.id)}
            >
              <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
              <Label htmlFor={`payment-${method.id}`} className="flex-1 cursor-pointer">{method.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Credit Card Form */}
      {bookingData.paymentMethod === "card" && (
        <div className="border border-gray-200 rounded-md p-4 mt-4 space-y-4">
          <h3 className="font-medium">Credit Card Details</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                placeholder="XXXX XXXX XXXX XXXX"
                value={bookingData.cardInfo?.cardNumber || ''}
                onChange={(e) => handleCardInfoChange('cardNumber', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="cardHolder">Card Holder Name</Label>
              <Input 
                id="cardHolder" 
                placeholder="Full name on card"
                value={bookingData.cardInfo?.cardHolder || ''}
                onChange={(e) => handleCardInfoChange('cardHolder', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  placeholder="MM/YY"
                  value={bookingData.cardInfo?.expiryDate || ''}
                  onChange={(e) => handleCardInfoChange('expiryDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  placeholder="XXX"
                  type="password"
                  maxLength={4}
                  value={bookingData.cardInfo?.cvv || ''}
                  onChange={(e) => handleCardInfoChange('cvv', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* InstaPay Receipt Upload */}
      {bookingData.paymentMethod === "instapay" && (
        <div className="border border-gray-200 rounded-md p-4 mt-4">
          <h3 className="font-medium mb-2">InstaPay Payment Verification</h3>
          <p className="text-sm text-gray-600 mb-4">
            Please upload a screenshot of your InstaPay payment receipt to verify your payment.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="receiptUpload" className="w-full">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-salon-purple transition-colors">
                {bookingData.receiptImage ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-green-600">Receipt uploaded successfully!</p>
                    <p className="text-xs text-gray-500">{bookingData.receiptImage.name}</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Upload payment receipt</p>
                    <p className="text-xs text-gray-500">Click to browse or drop your file here</p>
                  </div>
                )}
              </div>
            </Label>
            <Input 
              id="receiptUpload"
              type="file" 
              accept="image/*"
              onChange={handleReceiptUpload}
              className="hidden"
            />
          </div>
        </div>
      )}
      
      {isWeddingBooking && (
        <div className="p-4 border-l-4 border-salon-pink bg-salon-pink/10">
          <h4 className="font-medium mb-1">Wedding Booking Policy</h4>
          <ul className="text-sm space-y-1">
            <li>• 50% deposit required to confirm booking</li>
            <li>• Includes trial session 2 weeks before the wedding</li>
            <li>• One-time rescheduling allowed with 5+ days' notice</li>
          </ul>
        </div>
      )}
      
      {!isWeddingBooking && (
        <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <h4 className="font-medium">🎁 GlamVan Loyalty Program</h4>
          <p className="text-sm mt-1">Complete 5 appointments and get 25% OFF your next booking!</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
