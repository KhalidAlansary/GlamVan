import { CheckCircle, User, Star, MapPin } from "lucide-react";

const CriteriaBar = () => {
  const criteria = [
    {
      icon: CheckCircle,
      title: "Sanitized Equipment",
      description: "All tools thoroughly sanitized",
    },
    {
      icon: User,
      title: "Female Stylists Only",
      description: "Professional female beauticians",
    },
    {
      icon: Star,
      title: "Premium Products",
      description: "High-quality beauty products",
    },
    {
      icon: MapPin,
      title: "Greater Cairo Area",
      description: "Service coverage area",
    },
  ];

  return (
    <section className="py-12 bg-salon-pink/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {criteria.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-salon-purple/10 rounded-none border-2 border-salon-purple/20 flex items-center justify-center">
                <item.icon className="h-8 w-8 text-salon-purple" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-salon-dark mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CriteriaBar;
