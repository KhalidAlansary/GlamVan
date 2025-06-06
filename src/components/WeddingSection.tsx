import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WeddingSection = () => {
  return (
    <section className="py-16 bg-salon-pink/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h5 className="text-salon-purple mb-2 font-medium">
              Wedding Specialists
            </h5>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Exclusive Wedding Beauty Solutions
            </h2>
            <p className="text-gray-700 mb-6">
              Make your special day even more memorable with our exclusive
              wedding beauty services. Our luxury van can be reserved entirely
              for your bridal party, providing a private and luxurious setting
              for all your wedding day beauty needs.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-salon-purple/20 flex items-center justify-center text-salon-purple mr-3 mt-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-salon-dark">
                    Full Day Reservation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Reserve our luxury van for the entire day (6AM-6PM)
                    exclusively for your bridal party.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-salon-purple/20 flex items-center justify-center text-salon-purple mr-3 mt-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-salon-dark">
                    Bridal Party Package
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Special packages for the bride, bridesmaids, mother of the
                    bride, and more.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-salon-purple/20 flex items-center justify-center text-salon-purple mr-3 mt-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-salon-dark">
                    Henna Night Services
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Traditional and modern henna designs for your pre-wedding
                    celebration.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-salon-purple/20 flex items-center justify-center text-salon-purple mr-3 mt-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-salon-dark">
                    Digital Contracts
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Secure your date with a digital contract and a 50% deposit.
                  </p>
                </div>
              </div>
            </div>

            <Button
              asChild
              className="bg-salon-purple hover:bg-salon-dark-purple text-white px-8 py-6 text-lg rounded-md shadow-lg"
            >
              <Link to="/wedding">Explore Wedding Packages</Link>
            </Button>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="/lovable-uploads/99df6273-f4cc-47f2-9cc3-734da4750f09.png"
                alt="Wedding Beauty Services"
                className="rounded-lg w-full h-auto"
              />

              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
                      alt="Happy Client"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Noor Ahmed</h4>
                    <p className="text-gray-500 text-sm">Bride, Sheikh Zayed</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm">
                  "A+ Ladies made my wedding day perfect! Their mobile salon was
                  the perfect solution for me and my bridesmaids. Highly
                  recommended!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingSection;
