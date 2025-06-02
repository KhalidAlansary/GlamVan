
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Stylist } from "./types/stylist";
import { BeauticianGrid } from "./beauticians/BeauticianGrid";
import { PendingBeauticians } from "./beauticians/PendingBeauticians";
import { AddBeauticianForm } from "./beauticians/AddBeauticianForm";
import { EditBeauticianForm } from "./beauticians/EditBeauticianForm";

const AdminStylists = () => {
  // State for active stylists
  const [stylists, setStylists] = useState<Stylist[]>([
    {
      id: 1,
      name: "Layla Mohammed",
      specialties: ["Bridal Makeup", "Hair Styling"],
      experience: "5 years",
      rating: 4.9,
      status: "active",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      phone: "01234567890",
      workZones: ["Maadi", "Heliopolis", "Zamalek"],
      bookingsCompleted: [5, 7, 6, 8, 9, 7, 8],
      reviews: [
        { rating: 5, text: "Amazing work with my wedding makeup!", author: "Sara H." },
        { rating: 4.8, text: "Professional and on time", author: "Nour A." }
      ]
    },
    {
      id: 2,
      name: "Nora Abdullah",
      specialties: ["Hair Styling", "Nails"],
      experience: "3 years",
      rating: 4.7,
      status: "offline",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      phone: "01234567891",
      workZones: ["Maadi", "New Cairo", "6th October"],
      bookingsCompleted: [4, 5, 3, 6, 7, 6, 5],
      reviews: [
        { rating: 4.7, text: "Loved my new hairstyle!", author: "Dina K." }
      ]
    },
    {
      id: 3,
      name: "Aisha Hassan",
      specialties: ["Full Glam", "Makeup"],
      experience: "4 years",
      rating: 4.8,
      status: "active",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      phone: "01234567892",
      workZones: ["Heliopolis", "Nasr City", "Downtown"],
      bookingsCompleted: [6, 8, 7, 9, 8, 10, 9],
      reviews: [
        { rating: 5, text: "My makeup lasted all day!", author: "Heba M." },
        { rating: 4.9, text: "Flawless application", author: "Yasmin T." }
      ]
    },
    {
      id: 4,
      name: "Huda Omar",
      specialties: ["Hair Styling", "Makeup"],
      experience: "2 years",
      rating: 4.5,
      status: "offline",
      image: "https://randomuser.me/api/portraits/women/54.jpg",
      phone: "01234567893",
      workZones: ["Dokki", "Mohandessin", "Giza"],
      bookingsCompleted: [3, 4, 5, 4, 6, 5, 7],
      reviews: [
        { rating: 4.5, text: "Great service, will book again", author: "Mariam F." }
      ]
    },
  ]);

  // State for pending stylists
  const [pendingStylists, setPendingStylists] = useState<Stylist[]>([
    {
      id: 5,
      name: "Sarah Mohammed",
      specialties: ["Hair Styling", "Nails", "Makeup"],
      experience: "3 years",
      rating: 0,
      status: "pending",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      phone: "01234567894",
      workZones: ["Maadi", "New Cairo"]
    },
    {
      id: 6,
      name: "Lina Ahmad",
      specialties: ["Bridal Makeup", "Hair Extensions"],
      experience: "4 years",
      rating: 0,
      status: "pending",
      image: "https://randomuser.me/api/portraits/women/26.jpg",
      phone: "01234567895",
      workZones: ["Heliopolis", "Nasr City"]
    }
  ]);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentStylist, setCurrentStylist] = useState<Stylist | null>(null);

  // Handle form submission for new stylist
  const handleAddStylist = (newStylist: {
    name: string;
    phone: string;
    specialties: string[];
    workZones: string[];
    image: string;
  }) => {
    // Form validation
    if (!newStylist.name || newStylist.specialties.length === 0 || newStylist.workZones.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newId = Math.max(...[...stylists, ...pendingStylists].map(s => s.id)) + 1;
    
    const stylistToAdd: Stylist = {
      id: newId,
      name: newStylist.name,
      specialties: newStylist.specialties,
      experience: "New",
      rating: 0,
      status: "offline" as const,
      image: newStylist.image,
      phone: newStylist.phone,
      workZones: newStylist.workZones,
      bookingsCompleted: [0, 0, 0, 0, 0, 0, 0]
    };

    setStylists([...stylists, stylistToAdd]);
    setAddDialogOpen(false);
    toast.success(`${newStylist.name} has been added to the team!`);
  };

  // Handle edit specialty changes
  const handleEditSpecialtyChange = (specialty: string, checked: boolean) => {
    if (!currentStylist) return;
    
    if (checked) {
      setCurrentStylist({
        ...currentStylist, 
        specialties: [...currentStylist.specialties, specialty]
      });
    } else {
      setCurrentStylist({
        ...currentStylist, 
        specialties: currentStylist.specialties.filter(s => s !== specialty)
      });
    }
  };

  // Handle edit zone changes
  const handleEditZoneChange = (zone: string, checked: boolean) => {
    if (!currentStylist) return;
    
    if (checked) {
      setCurrentStylist({
        ...currentStylist, 
        workZones: [...(currentStylist.workZones || []), zone]
      });
    } else {
      setCurrentStylist({
        ...currentStylist, 
        workZones: (currentStylist.workZones || []).filter(z => z !== zone)
      });
    }
  };

  // Handle form submission for edit stylist
  const handleUpdateStylist = (stylist: Stylist) => {
    // Form validation
    if (!stylist.name || stylist.specialties.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedStylists = stylists.map(s => 
      s.id === stylist.id ? stylist : s
    );
    
    setStylists(updatedStylists);
    setEditDialogOpen(false);
    toast.success(`${stylist.name}'s profile has been updated!`);
  };

  // Handle approval of pending stylist
  const handleApproveStylist = (stylist: Stylist) => {
    const approvedStylist: Stylist = {
      ...stylist,
      status: "offline" as const,
      bookingsCompleted: [0, 0, 0, 0, 0, 0, 0],
      reviews: []
    };
    
    setStylists([...stylists, approvedStylist]);
    setPendingStylists(pendingStylists.filter(s => s.id !== stylist.id));
    toast.success(`${stylist.name} has been approved!`);
  };

  // Handle rejection of pending stylist
  const handleRejectStylist = (stylist: Stylist) => {
    setPendingStylists(pendingStylists.filter(s => s.id !== stylist.id));
    toast.info(`${stylist.name}'s application has been rejected.`);
  };

  // Handle status toggle
  const handleStatusToggle = (stylist: Stylist) => {
    const updatedStylists = stylists.map(s => {
      if (s.id === stylist.id) {
        return {
          ...s, 
          status: s.status === "active" ? "offline" as const : "active" as const
        };
      }
      return s;
    });
    
    setStylists(updatedStylists);
    toast.success(`${stylist.name} is now ${stylist.status === "active" ? "offline" : "online"}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Beauticians Management</h1>
        <Button 
          className="bg-salon-purple hover:bg-salon-dark-purple booking-btn"
          onClick={() => setAddDialogOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-1" /> Add New Beautician
        </Button>
      </div>

      {/* Active Beauticians */}
      <BeauticianGrid 
        stylists={stylists} 
        onEditStylist={(stylist) => {
          setCurrentStylist(stylist);
          setEditDialogOpen(true);
        }}
        onStatusToggle={handleStatusToggle}
      />
      
      {/* Pending Applications */}
      <PendingBeauticians 
        pendingStylists={pendingStylists}
        onApproveStylist={handleApproveStylist}
        onRejectStylist={handleRejectStylist}
        onViewPortfolio={(stylist) => {
          setCurrentStylist(stylist);
          setEditDialogOpen(true);
        }}
      />

      {/* Add Beautician Dialog */}
      <AddBeauticianForm 
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddBeautician={handleAddStylist}
      />

      {/* Edit Beautician Dialog */}
      <EditBeauticianForm 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        stylist={currentStylist}
        onUpdateStylist={handleUpdateStylist}
        onEditSpecialtyChange={handleEditSpecialtyChange}
        onEditZoneChange={handleEditZoneChange}
      />
    </div>
  );
};

export default AdminStylists;
