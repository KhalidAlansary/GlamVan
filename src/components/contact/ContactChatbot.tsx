
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Message = {
  text: string;
  isBot: boolean;
};

const FAQ_DATA = {
  "services": "We offer professional in-van services including:\n- Hair (blowouts, coloring, trimming)\n- Nails (manicure, gel, extensions)\n- Lashes (lifting, extensions)\n- Makeup (daily glam & bridal looks)",
  "locations": "We currently serve:\n- New Cairo\n- El Rehab\n- Sheikh Zayed",
  "booking": "You can book through our website or app. For regular services, book 1-2 days in advance. For weddings, 1 week or more is ideal.",
  "payment": "We accept:\n- Cash\n- Vodafone Cash\n- InstaPay\n- Visa & Mastercard",
  "wedding": "Our bridal package includes:\n- Full makeup trial\n- Wedding day glam\n- Emergency kit\n- Optional group packages available",
  "contact": "Call or WhatsApp: +20 01123456789\nEmail: support@aplusmobilesalon.com\nWe respond between 10 AM – 10 PM"
};

const ContactChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi beautiful! 💜 Welcome to A+ Ladies Mobile Salon. How can I help you today?",
      isBot: true
    }
  ]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages container only
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = (topic: keyof typeof FAQ_DATA) => {
    setMessages(prev => [
      ...prev,
      { text: topic.charAt(0).toUpperCase() + topic.slice(1), isBot: false },
      { text: FAQ_DATA[topic], isBot: true }
    ]);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-playfair font-semibold mb-6">Chat with Us</h2>
      
      <div className="h-[400px] flex flex-col">
        <div 
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto mb-4 space-y-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.isBot
                  ? "bg-salon-purple/10 text-gray-800"
                  : "bg-salon-purple text-white ml-auto"
              } p-3 rounded-lg max-w-[80%] whitespace-pre-line`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => handleQuickReply("services")}
          >
            Our Services
          </Button>
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => handleQuickReply("locations")}
          >
            Locations
          </Button>
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => handleQuickReply("booking")}
          >
            How to Book
          </Button>
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => handleQuickReply("payment")}
          >
            Payment Options
          </Button>
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => handleQuickReply("wedding")}
          >
            Wedding Packages
          </Button>
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => handleQuickReply("contact")}
          >
            Contact Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactChatbot;
