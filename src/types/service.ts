
import { LucideIcon } from "lucide-react";

export interface ServiceType {
  id: number;
  category: "hair" | "nails" | "lashes" | "makeup" | "wedding";
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
  icon?: LucideIcon;
}
