
import { ArrowDown, Users, ShieldCheck, Banknote, CreditCard, MapPin, CarFront } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="relative py-20 bg-gradient-to-b from-salon-pink/20 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-salon-dark mb-6">
              About <span className="text-salon-purple">Glam</span><span className="text-salon-light-purple">Van</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Egypt's first premium beauty-on-wheels experience, where elegance meets convenience
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-playfair font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To provide safe, elegant, and hassle-free beauty services tailored to modern women 
                across Greater Cairo — delivered exclusively by <span className="text-salon-purple font-playfair italic">female</span> beauticians in 
                fully equipped mobile salon vans.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-salon-pink/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center mb-12">
              Why Choose GlamVan?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="h-12 w-12 bg-salon-pink/20 rounded-full flex items-center justify-center mb-4">
                  <ArrowDown className="h-6 w-6 text-salon-purple" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">Salon at Your Doorstep</h3>
                <p className="text-gray-600">Book easily via app or website for the ultimate convenience</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="h-12 w-12 bg-salon-pink/20 rounded-full flex items-center justify-center mb-4">
                  <CarFront className="h-6 w-6 text-salon-purple" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">Wedding-Ready Vans</h3>
                <p className="text-gray-600">Specially designed for bridal & event glam experiences</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="h-12 w-12 bg-salon-pink/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-salon-purple" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">All-<span className="text-salon-purple">Female</span> Staff</h3>
                <p className="text-gray-600">For your comfort, safety, and complete privacy</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="h-12 w-12 bg-salon-pink/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-salon-purple" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">Sterilized & Certified</h3>
                <p className="text-gray-600">All vans and tools are sanitized after each client</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="h-12 w-12 bg-salon-pink/20 rounded-full flex items-center justify-center mb-4">
                  <Banknote className="h-6 w-6 text-salon-purple" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">Flexible Payments</h3>
                <p className="text-gray-600">Cash, Vodafone Cash, InstaPay, and Cards accepted</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="h-12 w-12 bg-salon-pink/20 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-salon-purple" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">Easy Booking</h3>
                <p className="text-gray-600">Simple online booking system for your convenience</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-playfair font-bold mb-8">Our Beauticians</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every member of our team is a licensed female professional, carefully selected 
                for her skill, kindness, and ability to make you feel your absolute best — 
                wherever you are.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-salon-pink/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-playfair font-bold mb-8">Areas We Serve</h2>
              <div className="inline-flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-salon-purple mr-2" />
                <span className="text-lg text-gray-700">Greater Cairo Region</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {["Rehab", "New Cairo", "Sheikh Zayed"].map((area) => (
                  <div key={area} className="bg-white p-4 rounded-lg shadow-md">
                    <p className="font-medium text-gray-700">{area}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 mt-6 italic">More areas coming soon!</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
