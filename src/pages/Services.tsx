import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { services } from "@/data/services";
import { useSearchParams, Link } from "react-router-dom";

const Services = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveTab(category);
    }
  }, [searchParams]);

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((service) => service.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-salon-pink/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                Our Services
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience our premium beauty services delivered directly to
                your doorstep by our team of expert beauticians.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white" id="services">
          <div className="container mx-auto px-4">
            <Tabs
              defaultValue={activeTab}
              value={activeTab}
              className="w-full max-w-3xl mx-auto mb-12"
            >
              <TabsList className="grid grid-cols-5 bg-gray-100">
                <TabsTrigger
                  value="all"
                  onClick={() => setActiveTab("all")}
                  className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="hair"
                  onClick={() => setActiveTab("hair")}
                  className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
                >
                  Hair
                </TabsTrigger>
                <TabsTrigger
                  value="makeup"
                  onClick={() => setActiveTab("makeup")}
                  className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
                >
                  Makeup
                </TabsTrigger>
                <TabsTrigger
                  value="nails"
                  onClick={() => setActiveTab("nails")}
                  className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
                >
                  Nails
                </TabsTrigger>
                <TabsTrigger
                  value="lashes"
                  onClick={() => setActiveTab("lashes")}
                  className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
                >
                  Lashes
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  image={service.image}
                  link={service.link}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                Book Your Service Today
              </h2>
              <p className="text-gray-600 mb-8">
                Ready to experience our luxury mobile salon services? Book now
                and our beauticians will come to you.
              </p>
              <Link
                to="/booking"
                className="inline-flex items-center justify-center h-12 px-8 font-medium bg-salon-purple text-white rounded-md hover:bg-salon-dark-purple transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
