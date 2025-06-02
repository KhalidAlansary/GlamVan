
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Process = () => {
  const steps = [
    {
      id: 1,
      title: "Choose Your Services",
      description: "Browse our range of services and select the ones that meet your beauty needs.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Select Date & Location",
      description: "Choose a convenient date, time and location within our service areas.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Secure Payment",
      description: "Complete your booking with a secure payment through our multiple payment options.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Track Your Stylist",
      description: "On the day of your appointment, track our van in real-time as it approaches your location.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-salon-purple mb-2 font-medium">How It Works</h5>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Simple Booking Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our streamlined booking process makes it easy to schedule your mobile salon appointment in just a few steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.id} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-salon-purple/10 flex items-center justify-center text-salon-purple">
                  {step.icon}
                </div>
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-salon-purple/10 text-salon-purple text-xs font-medium">
                  Step {step.id}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to experience our luxury mobile salon services?
          </p>
          <Link 
            to="/booking" 
            className="inline-flex items-center justify-center h-12 px-8 font-medium bg-salon-purple text-white rounded-md hover:bg-salon-dark-purple transition-colors booking-btn"
          >
            Book Your Appointment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;
