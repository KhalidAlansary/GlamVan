
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="font-playfair text-2xl font-semibold mb-6">Send us a Message</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Your Name
          </label>
          <Input 
            type="text" 
            id="name" 
            placeholder="Enter your name" 
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Your Email
          </label>
          <Input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Enter your message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-salon-purple hover:bg-salon-dark-purple text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <p className="text-sm text-gray-500 mt-2">
        Or email us directly at: support@glamvan.com
      </p>
    </div>
  );
};

export default ContactForm;
