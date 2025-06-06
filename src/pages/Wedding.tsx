import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Wedding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-salon-pink/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/lovable-uploads/99df6273-f4cc-47f2-9cc3-734da4750f09.png"
                  alt="Bridal Beauty Services"
                  className="rounded-lg w-full"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                  Your Dream Wedding, Perfected
                </h1>
                <p className="text-gray-600 mb-6">
                  Let us bring the luxury salon experience to you on your
                  special day. Our expert stylists specialize in creating
                  stunning bridal looks that capture your unique beauty.
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  <li>Personalized bridal makeup and hair styling</li>
                  <li>On-location services for convenience</li>
                  <li>Premium products for a flawless finish</li>
                  <li>Bridal party packages available</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Wedding Packages
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our carefully curated wedding packages designed to
                make your special day unforgettable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-b from-salon-pink/5 to-salon-purple/5 p-6 rounded-lg shadow-sm border border-salon-pink/20">
                <div className="text-center">
                  <h3 className="font-playfair font-bold text-2xl mb-2 text-salon-purple">
                    Bridal Package
                  </h3>
                  <div className="text-3xl font-bold text-salon-dark mb-4">
                    18,000 EGP
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Hair Styling
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Makeup
                    </li>
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-salon-purple hover:bg-salon-dark-purple"
                  >
                    <Link to="/booking?service=bridal">Choose Package</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-b from-salon-purple/10 to-salon-pink/10 p-6 rounded-lg shadow-lg border-2 border-salon-purple/30 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-salon-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="font-playfair font-bold text-2xl mb-2 text-salon-purple">
                    Premium Package
                  </h3>
                  <div className="text-3xl font-bold text-salon-dark mb-4">
                    22,000 EGP
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Hair Styling
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Makeup
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Nails
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Lashes
                    </li>
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-salon-purple hover:bg-salon-dark-purple"
                  >
                    <Link to="/booking?service=premium-wedding">
                      Choose Package
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-b from-salon-pink/5 to-salon-purple/5 p-6 rounded-lg shadow-sm border border-salon-pink/20">
                <div className="text-center">
                  <h3 className="font-playfair font-bold text-2xl mb-2 text-salon-purple">
                    Mother Package
                  </h3>
                  <div className="text-3xl font-bold text-salon-dark mb-4">
                    8,000 EGP
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Hair Styling
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Makeup
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Nails
                    </li>
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-salon-purple hover:bg-salon-dark-purple"
                  >
                    <Link to="/booking?service=mother-wedding">
                      Choose Package
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-b from-salon-pink/5 to-salon-purple/5 p-6 rounded-lg shadow-sm border border-salon-pink/20">
                <div className="text-center">
                  <h3 className="font-playfair font-bold text-2xl mb-2 text-salon-purple">
                    Bridesmaids
                  </h3>
                  <div className="text-3xl font-bold text-salon-dark mb-2">
                    7,000 EGP
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    (5 girls only)
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-salon-pink rounded-full mr-2"></span>
                      Makeup
                    </li>
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-salon-purple hover:bg-salon-dark-purple"
                  >
                    <Link to="/booking?service=bridesmaids">
                      Choose Package
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-salon-pink/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Our Wedding Locations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide our exclusive mobile salon services throughout Cairo
                and Giza, whether at your home or at luxury hotels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-playfair font-bold text-xl mb-4">Cairo</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-salon-purple mb-2">
                      At Your Home
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Comfort and privacy in your own space
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-salon-purple mb-2">
                      Luxury Hotels
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Professional service at premier venues
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-playfair font-bold text-xl mb-4">Giza</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-salon-purple mb-2">
                      At Your Home
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Personalized service in familiar surroundings
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-salon-purple mb-2">
                      Luxury Hotels
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Elegant preparation at top-tier hotels
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto">
              <h3 className="font-playfair font-bold text-xl mb-4 text-center">
                Booking Requirements
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-salon-pink rounded-full mr-3 mt-2"></span>
                  <span>Booking must be made at least 30 days in advance</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-salon-pink rounded-full mr-3 mt-2"></span>
                  <span>50% deposit required to secure your date</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-salon-pink rounded-full mr-3 mt-2"></span>
                  <span>Trial sessions available and recommended</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wedding;
