import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-salon-pink/30 to-white py-6 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-6 lg:mb-0 animate-fade-in">
            <h5 className="text-salon-dark-purple mb-1 font-medium">
              Experience Luxury On Wheels
            </h5>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-salon-dark mb-3 leading-tight">
              Premium Mobile <span className="text-salon-purple">Beauty</span>{" "}
              Services
            </h1>
            <p className="text-base text-gray-700 mb-4 max-w-lg">
              Bringing salon-quality beauty treatments directly to your doorstep
              in New Cairo, El Rehab, and Sheikh Zayed. Our luxury vans are
              equipped with everything needed for a perfect beauty experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-salon-purple hover:bg-salon-dark-purple text-white px-6 py-4 text-base rounded-md shadow-lg"
              >
                <Link to="/booking">Book Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-salon-purple text-salon-purple hover:bg-salon-purple/10 px-6 py-4 text-base rounded-md"
              >
                <Link to="/wedding">Wedding Packages</Link>
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-700">
                <Phone className="h-4 w-4 mr-2 text-salon-purple" />
                <span className="text-sm">
                  +20 112 345 6789 (10:00 AM – 5:00 PM Daily)
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="h-4 w-4 mr-2 text-salon-purple" />
                <span className="text-sm">support@glamvan.com</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-salon-purple" />
                <span className="text-sm">
                  New Cairo, El Rehab, Sheikh Zayed
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-semibold">JS</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-semibold">KM</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-semibold">RH</span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-3 h-3 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-gray-600">
                    500+ Happy Clients
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 animate-slide-up">
            <div className="relative">
              <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-salon-purple rounded-full mx-auto opacity-20 absolute top-4 left-1/2 transform -translate-x-1/2"></div>
              <img
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3"
                alt="GlamVan Mobile Salon Van"
                className="relative z-10 rounded-lg shadow-2xl max-w-full h-auto object-cover mx-auto"
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-lg shadow-lg z-20">
                <div className="flex items-center gap-2 text-salon-dark-purple">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600 text-xs">
                    Timeliness built into our service DNA.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <h4 className="font-bold text-salon-dark-purple text-base">
                  10+
                </h4>
                <p className="text-xs text-gray-600">Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
