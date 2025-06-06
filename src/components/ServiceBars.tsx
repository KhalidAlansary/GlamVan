import { Link } from "react-router-dom";
import { Scissors, Fingerprint, Eye, Brush } from "lucide-react";

const ServiceBars = () => {
  const serviceCategories = [
    {
      title: "Hair Services",
      image: "/lovable-uploads/2dcece83-1b6b-47ac-ac5d-19574f52d920.png",
      icon: Scissors,
      description:
        "Expert hair styling, coloring, and trimming services in the comfort of your home.",
      link: "/services?category=hair",
    },
    {
      title: "Nail Services",
      image: "/lovable-uploads/2543ca30-141a-43ad-852c-61bbb01260b4.png",
      icon: Fingerprint,
      description:
        "Professional nail care, from basic manicures to luxurious gel extensions.",
      link: "/services?category=nails",
    },
    {
      title: "Lash Services",
      image: "/lovable-uploads/7b8a8247-58bd-488e-9ebf-be1c00853425.png",
      icon: Eye,
      description:
        "Transform your lashes with our lifting and extension services.",
      link: "/services?category=lashes",
    },
    {
      title: "Makeup Services",
      image: "/lovable-uploads/f258b9b9-0ad2-419e-a23b-7835576492c7.png",
      icon: Brush,
      description:
        "Professional makeup application for all occasions, from everyday glam to bridal looks.",
      link: "/services?category=makeup",
    },
  ];

  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-salon-purple mb-2 font-medium">Our Services</h5>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Premium Beauty Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury salon-quality treatments with our mobile salon.
            Our expert beauticians bring professional services directly to your
            location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {serviceCategories.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-playfair font-bold text-center px-4">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <service.icon className="h-8 w-8 text-salon-purple" />
                  <svg
                    className="w-5 h-5 text-salon-purple group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-salon-purple text-sm font-medium flex items-center">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center text-salon-purple hover:text-salon-dark-purple transition-colors font-medium"
          >
            View All Services
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceBars;
