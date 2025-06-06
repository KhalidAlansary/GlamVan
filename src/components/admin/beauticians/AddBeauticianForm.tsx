import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { availableSpecialties, availableZones } from "../types/stylist";

interface AddBeauticianFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBeautician: (newBeautician: {
    name: string;
    phone: string;
    specialties: string[];
    workZones: string[];
    image: string;
  }) => void;
}

export const AddBeauticianForm = ({
  open,
  onOpenChange,
  onAddBeautician,
}: AddBeauticianFormProps) => {
  const [newStylist, setNewStylist] = useState({
    name: "",
    phone: "",
    specialties: [] as string[],
    workZones: [] as string[],
    image: "https://randomuser.me/api/portraits/women/32.jpg", // Default image
  });

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setNewStylist({
        ...newStylist,
        specialties: [...newStylist.specialties, specialty],
      });
    } else {
      setNewStylist({
        ...newStylist,
        specialties: newStylist.specialties.filter((s) => s !== specialty),
      });
    }
  };

  const handleZoneChange = (zone: string, checked: boolean) => {
    if (checked) {
      setNewStylist({
        ...newStylist,
        workZones: [...newStylist.workZones, zone],
      });
    } else {
      setNewStylist({
        ...newStylist,
        workZones: newStylist.workZones.filter((z) => z !== zone),
      });
    }
  };

  const handleSubmit = () => {
    onAddBeautician(newStylist);
    // Reset form
    setNewStylist({
      name: "",
      phone: "",
      specialties: [],
      workZones: [],
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] mx-auto">
        <DialogHeader>
          <DialogTitle>Add New Beautician</DialogTitle>
          <DialogDescription>
            Add a new beautician to your team. They'll appear as offline until
            they log in.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newStylist.name}
              onChange={(e) =>
                setNewStylist({ ...newStylist, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              className="col-span-3"
              value={newStylist.phone}
              onChange={(e) =>
                setNewStylist({ ...newStylist, phone: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Specialties</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              {availableSpecialties.map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={newStylist.specialties.includes(specialty)}
                    onCheckedChange={(checked) =>
                      handleSpecialtyChange(specialty, checked === true)
                    }
                  />
                  <label
                    htmlFor={`specialty-${specialty}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {specialty}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Work Zones</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              {availableZones.map((zone) => (
                <div key={zone} className="flex items-center space-x-2">
                  <Checkbox
                    id={`zone-${zone}`}
                    checked={newStylist.workZones.includes(zone)}
                    onCheckedChange={(checked) =>
                      handleZoneChange(zone, checked === true)
                    }
                  />
                  <label
                    htmlFor={`zone-${zone}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {zone}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">
              Photo URL
            </Label>
            <Input
              id="photo"
              className="col-span-3"
              value={newStylist.image}
              onChange={(e) =>
                setNewStylist({ ...newStylist, image: e.target.value })
              }
              placeholder="Enter image URL"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-salon-purple hover:bg-salon-dark-purple"
          >
            Add Beautician
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
