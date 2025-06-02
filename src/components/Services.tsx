
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { services } from "@/data/services";
import ServiceTabs from "./services/ServiceTabs";
import ServiceGrid from "./services/ServiceGrid";

const Services = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(service => service.category === activeTab);

  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-salon-purple mb-2 font-medium">Our Services</h5>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Premium Beauty Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury salon-quality treatments with our mobile salon. 
            Our expert beauticians bring professional services directly to your location.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto mb-12">
          <ServiceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </Tabs>
        
        <ServiceGrid services={filteredServices} />
        
        <div className="text-center mt-12">
          <a 
            href="/services" 
            className="inline-flex items-center text-salon-purple hover:text-salon-dark-purple transition-colors font-medium"
          >
            View All Services
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
