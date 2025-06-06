import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stylist } from "../types/stylist";
import { BeauticianCard } from "./BeauticianCard";

interface BeauticianGridProps {
  stylists: Stylist[];
  onEditStylist: (stylist: Stylist) => void;
  onStatusToggle: (stylist: Stylist) => void;
}

export const BeauticianGrid = ({
  stylists,
  onEditStylist,
  onStatusToggle,
}: BeauticianGridProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Active Beauticians</CardTitle>
        <CardDescription>Currently active beauty professionals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stylists.map((stylist) => (
            <BeauticianCard
              key={stylist.id}
              stylist={stylist}
              onEdit={onEditStylist}
              onStatusToggle={onStatusToggle}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
