
import { services } from "@/data/services";
import { Booking } from "../types/booking";

export const getMinimumPriceForService = (serviceName: string): number => {
  const service = services.find(s => s.title === serviceName);
  if (!service) return 0;
  
  const priceString = service.price;
  // Extract numeric value from price string like "500 EGP" or "22,000+ EGP"
  const priceMatch = priceString.match(/(\d[\d,]*)/);
  
  if (priceMatch && priceMatch[1]) {
    // Remove commas and convert to number
    return parseInt(priceMatch[1].replace(/,/g, ''));
  }
  return 0;
};

export const parseBookingDate = (dateString: string): Date | null => {
  try {
    const [month, day, year] = dateString.split(" ");
    const monthIndex = new Date(`${month} 1, 2000`).getMonth();
    const dayNum = parseInt(day.replace(",", ""));
    const yearNum = parseInt(year);
    return new Date(yearNum, monthIndex, dayNum);
  } catch {
    return null;
  }
};

export const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "unassigned":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getPaymentBadgeClass = (payment: string) => {
  switch (payment) {
    case "paid":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-purple-100 text-purple-800";
    case "not paid":
      return "bg-gray-100 text-gray-800";
    case "refunded":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const autoAssignVan = (location: string): string => {
  if (location === "Sheikh Zayed") {
    return "GlamVanLuxury 1";
  } else {
    return "GlamVanLuxury"; // For New Cairo, El Rehab, Tagmo3
  }
};

export const validatePhone = (phone: string): { isValid: boolean; error: string } => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (!cleanPhone) {
    return { isValid: false, error: "Phone number is required" };
  } else if (cleanPhone.length !== 11) {
    return { isValid: false, error: "Phone number must be 11 digits" };
  } else if (!/^\d+$/.test(cleanPhone)) {
    return { isValid: false, error: "Phone number must contain only digits" };
  }
  
  return { isValid: true, error: "" };
};
