
import { Phone, Mail, Instagram, Facebook, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import ContactChatbot from "@/components/contact/ContactChatbot";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-salon-pink/20 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-salon-dark mb-6">
              Get in <span className="text-salon-purple">Touch</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Whether you're ready to book, have a question, or just want to say hi — we'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {/* Customer Support */}
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
                <div className="h-12 w-12 bg-salon-pink/20 rounded-full flex items-center justify-center mb-6">
                  <Mail className="h-6 w-6 text-salon-purple" />
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-4">Customer Support</h3>
                <p className="text-gray-600 mb-2">📱 +20 01123456789</p>
                <p className="text-gray-600 mb-4">🕒 10:00 AM – 5:00 PM (Daily)</p>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-salon-purple mr-2" />
                  <a href="mailto:support@glamvan.com" className="text-salon-purple hover:underline">
                    support@glamvan.com
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-2">Typical response time: 2 hours</p>
              </div>

              {/* Service Areas */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-salon-pink/20 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-salon-purple" />
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-4">Service Areas</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• New Cairo</li>
                  <li>• El Rehab</li>
                  <li>• Sheikh Zayed</li>
                </ul>
              </div>

              {/* Follow Us */}
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="font-playfair text-xl font-semibold mb-6">Follow Us</h3>
                <div className="space-y-4">
                  <a href="https://instagram.com/glamvan" className="flex items-center text-gray-600 hover:text-salon-purple transition-colors">
                    <Instagram className="h-5 w-5 mr-3" />
                    <span>@glamvan</span>
                  </a>
                  <a href="https://facebook.com/glamvan" className="flex items-center text-gray-600 hover:text-salon-purple transition-colors">
                    <Facebook className="h-5 w-5 mr-3" />
                    <span>@glamvan</span>
                  </a>
                  <a href="https://tiktok.com/@glamvan" className="flex items-center text-gray-600 hover:text-salon-purple transition-colors">
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <span>@glamvan</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
                <ContactForm />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
                <ContactChatbot />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
