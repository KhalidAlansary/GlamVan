import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-salon-dark mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-playfair font-bold">
              <span className="text-salon-purple">Glam</span>
              <span className="text-salon-light-purple">Van</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Luxury beauty services delivered via mobile vans, with exclusive
              wedding solutions in New Cairo, El Rehab, and Sheikh Zayed.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/glamvan.eg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-salon-purple hover:text-salon-dark-purple transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/glamvan.eg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-salon-purple hover:text-salon-dark-purple transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://tiktok.com/@glamvan.eg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-salon-purple hover:text-salon-dark-purple transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-salon-purple">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/wedding"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  Wedding
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-salon-purple">
              Services
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services?category=hair#services"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  Hair Styling
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=makeup#services"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  Makeup
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=nails#services"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  Nail Care
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=lashes#services"
                  className="text-gray-600 hover:text-salon-purple transition-colors"
                >
                  Lash Extensions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-salon-purple">
              Contact
            </h4>
            <p className="text-gray-600 mb-2">
              New Cairo, El Rehab, Sheikh Zayed
            </p>
            <p className="text-gray-600 mb-2">Email: support@glamvan.com</p>
            <p className="text-gray-600 mb-4">Phone: +20 112 345 6789</p>
            <Link
              to="/contact"
              className="text-salon-purple hover:text-salon-dark-purple transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Glam Van Mobile Salon. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-salon-purple transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 hover:text-salon-purple transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
