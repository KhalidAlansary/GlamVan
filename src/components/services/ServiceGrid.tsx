
import { ServiceType } from "@/types/service";
import ServiceCard from "../ServiceCard";

interface ServiceGridProps {
  services: ServiceType[];
}

const ServiceGrid = ({ services }: ServiceGridProps) => {
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
