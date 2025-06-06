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
import {
  Stylist,
  availableSpecialties,
  availableZones,
} from "../types/stylist";

interface EditBeauticianFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stylist: Stylist | null;
  onUpdateStylist: (stylist: Stylist) => void;
  onEditSpecialtyChange: (specialty: string, checked: boolean) => void;
  onEditZoneChange: (zone: string, checked: boolean) => void;
}

export const EditBeauticianForm = ({
  open,
  onOpenChange,
  stylist,
  onUpdateStylist,
  onEditSpecialtyChange,
  onEditZoneChange,
}: EditBeauticianFormProps) => {
  if (!stylist) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Beautician Profile</DialogTitle>
          <DialogDescription>
            Make changes to the beautician's profile here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Name
            </Label>
            <Input
              id="edit-name"
              className="col-span-3"
              value={stylist.name}
              onChange={(e) =>
                onUpdateStylist({ ...stylist, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-phone" className="text-right">
              Phone
            </Label>
            <Input
              id="edit-phone"
              className="col-span-3"
              value={stylist.phone || ""}
              onChange={(e) =>
                onUpdateStylist({ ...stylist, phone: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Specialties</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              {availableSpecialties.map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-specialty-${specialty}`}
                    checked={stylist.specialties.includes(specialty)}
                    onCheckedChange={(checked) =>
                      onEditSpecialtyChange(specialty, checked === true)
                    }
                  />
                  <label
                    htmlFor={`edit-specialty-${specialty}`}
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
                    id={`edit-zone-${zone}`}
                    checked={(stylist.workZones || []).includes(zone)}
                    onCheckedChange={(checked) =>
                      onEditZoneChange(zone, checked === true)
                    }
                  />
                  <label
                    htmlFor={`edit-zone-${zone}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {zone}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-photo" className="text-right">
              Photo URL
            </Label>
            <Input
              id="edit-photo"
              className="col-span-3"
              value={stylist.image}
              onChange={(e) =>
                onUpdateStylist({ ...stylist, image: e.target.value })
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
            onClick={() => onUpdateStylist(stylist)}
            className="bg-salon-purple hover:bg-salon-dark-purple"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
