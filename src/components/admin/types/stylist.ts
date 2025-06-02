
export interface Stylist {
  id: number;
  name: string;
  specialties: string[];
  experience: string;
  rating: number;
  status: "active" | "offline" | "pending";
  image: string;
  phone?: string;
  workZones?: string[];
  bookingsCompleted?: number[];
  reviews?: { rating: number; text: string; author: string }[];
}

export const availableSpecialties = [
  "Hair Styling", "Makeup", "Nails", "Lashes", "Bridal Makeup", 
  "Hair Extensions", "Full Glam", "Hair Dye"
];
  
export const availableZones = [
  "Maadi", "Heliopolis", "Zamalek", "New Cairo", "6th October", 
  "Nasr City", "Downtown", "Dokki", "Mohandessin", "Giza", "El-Rehab City"
];
