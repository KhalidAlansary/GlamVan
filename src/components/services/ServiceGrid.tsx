import ServiceCard from "../ServiceCard";
import { Tables } from "@/integrations/supabase/types";

const ServiceGrid = ({ services }: { services: Tables<"services">[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          price={service.price}
          image={service.image}
          link={service.link}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;
