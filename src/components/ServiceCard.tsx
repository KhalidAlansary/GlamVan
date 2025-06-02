
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

export interface ServiceProps {
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
  icon?: LucideIcon;
}

const ServiceCard: React.FC<ServiceProps> = ({ title, description, price, image, link, icon: Icon }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg max-w-xs">
      <div className="aspect-[3/2] overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-playfair">{title}</CardTitle>
          {Icon && <Icon className="h-5 w-5 text-salon-purple" />}
        </div>
        <div className="text-salon-purple font-medium">{price}</div>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full bg-salon-purple hover:bg-salon-dark-purple transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden booking-btn">
          <Link to={link}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
