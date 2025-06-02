
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";
import { Stylist } from "../types/stylist";

interface PendingBeauticiansProps {
  pendingStylists: Stylist[];
  onApproveStylist: (stylist: Stylist) => void;
  onRejectStylist: (stylist: Stylist) => void;
  onViewPortfolio: (stylist: Stylist) => void;
}

export const PendingBeauticians = ({ 
  pendingStylists, 
  onApproveStylist, 
  onRejectStylist,
  onViewPortfolio
}: PendingBeauticiansProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Pending Applications</CardTitle>
        <CardDescription>Review and approve new beautician applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {pendingStylists.map(stylist => (
            <div key={stylist.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={stylist.image} alt={stylist.name} />
                  <AvatarFallback>{stylist.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="font-semibold">{stylist.name}</h3>
                  <p className="text-sm text-gray-500">{stylist.experience} experience</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {stylist.specialties.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-salon-pink/20 text-salon-purple rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewPortfolio(stylist)}
                >
                  View Portfolio
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-green-50 text-green-600 hover:bg-green-100"
                  onClick={() => onApproveStylist(stylist)}
                >
                  <Check className="w-4 h-4 mr-1" /> Approve
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={() => onRejectStylist(stylist)}
                >
                  <X className="w-4 h-4 mr-1" /> Reject
                </Button>
              </div>
            </div>
          ))}
          
          {pendingStylists.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No pending applications</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
