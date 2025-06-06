export interface Van {
  id: string;
  name: string;
  driver: string;
  status: "available" | "assigned" | "maintenance";
  location: string;
  lastService: string;
  capacity: string;
}

export const vans: Van[] = [
  {
    id: "VAN-001",
    name: "GlamVan Luxury",
    driver: "Sara Abdullah",
    status: "available",
    location: "New Cairo",
    lastService: "March 15, 2025",
    capacity: "4 stylists",
  },
  {
    id: "VAN-002",
    name: "GlamVanLuxury 1",
    driver: "Nour Hassan",
    status: "available",
    location: "Sheikh Zayed",
    lastService: "March 20, 2025",
    capacity: "4 stylists",
  },
];

// Location to van mapping for automatic assignment
export const locationVanMapping: Record<string, string[]> = {
  "New Cairo": ["VAN-001"],
  "El Rehab": ["VAN-001"], // Close to New Cairo
  Tagmo3: ["VAN-001"], // Close to New Cairo
  "Sheikh Zayed": ["VAN-002"],
};

export const getAvailableVanForLocation = (location: string): Van | null => {
  const vanIds = locationVanMapping[location] || [];

  for (const vanId of vanIds) {
    const van = vans.find((v) => v.id === vanId && v.status === "available");
    if (van) {
      return van;
    }
  }

  // If no location-specific van is available, return any available van
  return vans.find((v) => v.status === "available") || null;
};
