
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sara Mohamed",
      location: "New Cairo",
      quote: "The convenience of having salon-quality services delivered right to my doorstep is amazing! Their stylists are true professionals.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
      rating: 5
    },
    {
      id: 2,
      name: "Laila Ahmed",
      location: "Sheikh Zayed",
      quote: "GlamVan handled my entire wedding morning beautifully. The team was punctual, professional, and made everyone look gorgeous!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
      rating: 5
    },
    {
      id: 3,
      name: "Yasmin Hassan",
      location: "El Rehab",
      quote: "I love their gel manicures - they last for weeks! Having them come to my home saves me so much time.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-salon-purple mb-2 font-medium">Testimonials</h5>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it – hear from our satisfied clients who have experienced our luxury mobile salon services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              location={testimonial.location}
              quote={testimonial.quote}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
