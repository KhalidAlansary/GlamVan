
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/booking/BookingForm";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [preSelectedService, setPreSelectedService] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      setPreSelectedService(service);
    }
    
    // Show login modal if not authenticated
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  }, [searchParams, isAuthenticated]);

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-salon-pink/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Book Your Appointment</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Let your glam come to <em>you</em>. Our mobile salon brings hair, nails, lashes, 
                and makeup services right to your location — home, office, or venue.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <BookingForm preSelectedService={preSelectedService} />
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Login Modal - only shown if user is not authenticated */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default Booking;
