
export interface Beautician {
  id: string;
  name: string;
  specialties: string[];
  experience: string;
  rating: number;
  status: "available" | "unavailable" | "pending";
  image: string;
  phone?: string;
  workZones?: string[];
  bookingsCompleted?: number;
  earnings?: {
    weekly: number;
    monthly: number;
  };
  timeOff?: Date[];
}

export interface Appointment {
  id: string;
  time: string;
  service: string;
  clientName: string;
  clientPhone: string;
  clientLocation: string;
  serviceNotes: string;
  status: "upcoming" | "in-progress" | "completed" | "cancelled";
}
