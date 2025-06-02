import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

const AdminPromotions = () => {
  // Toast hook
  const { toast } = useToast();
  
  // State for dialogs
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  // State for the currently selected promotion
  const [selectedPromotion, setSelectedPromotion] = useState<null | {
    id: number;
    code: string;
    discount: string;
    description: string;
    validUntil: string;
    usageLimit: number;
    usedCount: number;
    status: string;
  }>(null);
  
  // State for the new promotion form
  const [newPromotion, setNewPromotion] = useState({
    code: "",
    discount: "",
    discountType: "%",
    description: "",
    validUntil: "",
    usageLimit: 100
  });
  
  // State for the edited promotion
  const [editedPromotion, setEditedPromotion] = useState({
    code: "",
    discount: "",
    discountType: "%",
    description: "",
    validUntil: "",
    usageLimit: 100
  });
  
  // Mock data for active promotions
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      code: "FIRSTBOOK20",
      discount: "20%",
      description: "20% off first booking",
      validUntil: "June 30, 2025",
      usageLimit: 100,
      usedCount: 42,
      status: "active"
    },
    {
      id: 2,
      code: "RAMADAN30",
      discount: "30%",
      description: "Ramadan special offer",
      validUntil: "May 15, 2025",
      usageLimit: 50,
      usedCount: 23,
      status: "active"
    },
    {
      id: 3,
      code: "WEDDING10",
      discount: "10%",
      description: "Wedding package discount",
      validUntil: "December 31, 2025",
      usageLimit: 200,
      usedCount: 78,
      status: "inactive"
    },
  ]);

  // State for pricing rules
  const [weekendPricing, setWeekendPricing] = useState("15");
  const [holidayPricing, setHolidayPricing] = useState("25");
  const [fridayChecked, setFridayChecked] = useState(true);
  const [saturdayChecked, setSaturdayChecked] = useState(true);
  
  // Handle creating a new promotion
  const handleCreatePromotion = () => {
    // Validation
    if (!newPromotion.code) {
      toast({
        title: "Validation Error",
        description: "Promo code is required",
        variant: "destructive"
      });
      return;
    }
    
    if (!newPromotion.discount) {
      toast({
        title: "Validation Error",
        description: "Discount amount is required",
        variant: "destructive"
      });
      return;
    }
    
    if (!newPromotion.validUntil) {
      toast({
        title: "Validation Error",
        description: "Valid until date is required",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a new ID (in a real app, this would be done by the backend)
    const newId = promotions.length > 0 ? Math.max(...promotions.map(p => p.id)) + 1 : 1;
    
    // Format the discount based on the type
    const formattedDiscount = newPromotion.discountType === "%" 
      ? `${newPromotion.discount}%` 
      : `$${newPromotion.discount}`;
    
    // Create the new promotion
    const promotionToAdd = {
      id: newId,
      code: newPromotion.code.toUpperCase(),
      discount: formattedDiscount,
      description: newPromotion.description,
      validUntil: new Date(newPromotion.validUntil).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      usageLimit: parseInt(newPromotion.usageLimit.toString()),
      usedCount: 0,
      status: "active"
    };
    
    // Add to the promotions array
    setPromotions([...promotions, promotionToAdd]);
    
    // Show success message
    toast({
      title: "Success",
      description: `Promotion ${promotionToAdd.code} created successfully`,
    });
    
    // Reset form and close dialog
    setNewPromotion({
      code: "",
      discount: "",
      discountType: "%",
      description: "",
      validUntil: "",
      usageLimit: 100
    });
    setShowCreateDialog(false);
  };
  
  // Handle opening edit dialog
  const handleEditClick = (promotion) => {
    setSelectedPromotion(promotion);
    
    // Extract the discount value and type
    let discountValue = "";
    let discountType = "%";
    
    if (promotion.discount.endsWith("%")) {
      discountValue = promotion.discount.replace("%", "");
      discountType = "%";
    } else {
      discountValue = promotion.discount.replace("$", "");
      discountType = "$";
    }
    
    // Convert date format
    const dateParts = promotion.validUntil.split(" ");
    const month = new Date(`${dateParts[0]} 1, 2000`).getMonth() + 1;
    const day = parseInt(dateParts[1].replace(",", ""));
    const year = parseInt(dateParts[2]);
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    setEditedPromotion({
      code: promotion.code,
      discount: discountValue,
      discountType: discountType,
      description: promotion.description,
      validUntil: formattedDate,
      usageLimit: promotion.usageLimit
    });
    
    setShowEditDialog(true);
  };
  
  // Handle saving edited promotion
  const handleSaveEdit = () => {
    if (!selectedPromotion) return;
    
    // Validation
    if (!editedPromotion.code) {
      toast({
        title: "Validation Error",
        description: "Promo code is required",
        variant: "destructive"
      });
      return;
    }
    
    if (!editedPromotion.discount) {
      toast({
        title: "Validation Error",
        description: "Discount amount is required",
        variant: "destructive"
      });
      return;
    }
    
    if (!editedPromotion.validUntil) {
      toast({
        title: "Validation Error",
        description: "Valid until date is required",
        variant: "destructive"
      });
      return;
    }
    
    // Format the discount based on the type
    const formattedDiscount = editedPromotion.discountType === "%" 
      ? `${editedPromotion.discount}%` 
      : `$${editedPromotion.discount}`;
    
    // Update the promotion
    const updatedPromotions = promotions.map(p => {
      if (p.id === selectedPromotion.id) {
        return {
          ...p,
          code: editedPromotion.code.toUpperCase(),
          discount: formattedDiscount,
          description: editedPromotion.description,
          validUntil: new Date(editedPromotion.validUntil).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          usageLimit: parseInt(editedPromotion.usageLimit.toString()),
          // Keep the status as is
        };
      }
      return p;
    });
    
    setPromotions(updatedPromotions);
    toast({
      title: "Success",
      description: `Promotion ${editedPromotion.code} updated successfully`,
    });
    
    setShowEditDialog(false);
  };

  // Handle activating promotion from edit dialog
  const handleActivateFromEdit = () => {
    if (!selectedPromotion) return;
    
    const updatedPromotions = promotions.map(p => {
      if (p.id === selectedPromotion.id) {
        return { ...p, status: "active" };
      }
      return p;
    });
    
    setPromotions(updatedPromotions);
    toast({
      title: "Success",
      description: `Promotion ${selectedPromotion.code} has been activated`,
    });
    
    setShowEditDialog(false);
  };
  
  // Handle deactivating promotion
  const handleDeactivateClick = (promotion) => {
    setSelectedPromotion(promotion);
    setShowDeleteDialog(true);
  };
  
  // Handle confirming deactivation
  const handleConfirmDeactivate = () => {
    if (!selectedPromotion) return;
    
    const updatedPromotions = promotions.map(p => {
      if (p.id === selectedPromotion.id) {
        return { ...p, status: "inactive" };
      }
      return p;
    });
    
    setPromotions(updatedPromotions);
    toast({
      title: "Success",
      description: `Promotion ${selectedPromotion.code} has been deactivated`,
    });
    
    setShowDeleteDialog(false);
  };

  // Handle activating promotion from deactivate dialog
  const handleActivateFromDialog = () => {
    if (!selectedPromotion) return;
    
    const updatedPromotions = promotions.map(p => {
      if (p.id === selectedPromotion.id) {
        return { ...p, status: "active" };
      }
      return p;
    });
    
    setPromotions(updatedPromotions);
    toast({
      title: "Success",
      description: `Promotion ${selectedPromotion.code} has been activated`,
    });
    
    setShowDeleteDialog(false);
  };
  
  // Handle saving pricing rules
  const handleSavePricingRules = () => {
    // Validate pricing values
    if (isNaN(parseInt(weekendPricing)) || isNaN(parseInt(holidayPricing))) {
      toast({
        title: "Validation Error",
        description: "Pricing percentages must be valid numbers",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API call to update the pricing rules
    toast({
      title: "Success",
      description: "Pricing rules saved successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Dynamic Pricing & Promotions</h1>
      </div>

      {/* Create Promotion Card */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Create New Discount Code</CardTitle>
          <CardDescription>Create a new promotional code for special offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Promo Code</Label>
                <Input 
                  id="code" 
                  placeholder="e.g. SUMMER25" 
                  className="mt-1" 
                  value={newPromotion.code}
                  onChange={(e) => setNewPromotion({...newPromotion, code: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount Amount</Label>
                <div className="flex mt-1">
                  <Input 
                    id="discount" 
                    placeholder="25" 
                    className="rounded-r-none" 
                    value={newPromotion.discount}
                    onChange={(e) => setNewPromotion({...newPromotion, discount: e.target.value})}
                  />
                  <select 
                    className="bg-gray-100 border border-input px-4 py-2 rounded-r-md focus:outline-none"
                    value={newPromotion.discountType}
                    onChange={(e) => setNewPromotion({...newPromotion, discountType: e.target.value})}
                  >
                    <option value="%">%</option>
                    <option value="$">$</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  placeholder="Brief description of the promotion" 
                  className="mt-1" 
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="valid-until">Valid Until</Label>
                <Input 
                  id="valid-until" 
                  type="date" 
                  className="mt-1" 
                  value={newPromotion.validUntil}
                  onChange={(e) => setNewPromotion({...newPromotion, validUntil: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="usage-limit">Usage Limit</Label>
                <Input 
                  id="usage-limit" 
                  type="number" 
                  placeholder="100" 
                  className="mt-1" 
                  value={newPromotion.usageLimit}
                  onChange={(e) => setNewPromotion({
                    ...newPromotion, 
                    usageLimit: parseInt(e.target.value) || 0
                  })}
                />
              </div>
              <div className="pt-6 flex justify-end">
                <Button 
                  className="bg-salon-purple hover:bg-salon-dark-purple booking-btn"
                  onClick={handleCreatePromotion}
                >
                  Create Promotion
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Promotions */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Active Promotions</CardTitle>
          <CardDescription>Manage your current promotional offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 border-b">
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Valid Until</th>
                  <th className="px-4 py-3">Usage</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {promotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium">
                      {promo.code}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {promo.discount}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {promo.description}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {promo.validUntil}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {promo.usedCount} / {promo.usageLimit}
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-salon-purple h-2 rounded-full" 
                          style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        promo.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                      }`}>
                        {promo.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleEditClick(promo)}
                      >
                        Edit
                      </Button>
                      {promo.status === "active" ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeactivateClick(promo)}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700"
                          onClick={() => {
                            setSelectedPromotion(promo);
                            handleActivateFromDialog();
                          }}
                        >
                          Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {promotions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No active promotions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Pricing */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Dynamic Pricing Rules</CardTitle>
          <CardDescription>Set up pricing adjustments for peak times and seasons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weekend Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span>Increase prices by:</span>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        value={weekendPricing}
                        onChange={(e) => setWeekendPricing(e.target.value)}
                        className="w-20" 
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Apply to days:</span>
                    <div className="flex gap-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          checked={fridayChecked}
                          onChange={() => setFridayChecked(!fridayChecked)}
                        />
                        <span>Fri</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          checked={saturdayChecked}
                          onChange={() => setSaturdayChecked(!saturdayChecked)}
                        />
                        <span>Sat</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Holiday Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span>Increase prices by:</span>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        value={holidayPricing}
                        onChange={(e) => setHolidayPricing(e.target.value)}
                        className="w-20" 
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Apply to events:</span>
                    <div>
                      <span className="text-sm text-gray-500">Eid, Ramadan, New Year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button 
                className="bg-salon-purple hover:bg-salon-dark-purple booking-btn"
                onClick={handleSavePricingRules}
              >
                Save Pricing Rules
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Promotion Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
            <DialogDescription>
              Update the details of this promotion
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Promo Code</Label>
              <Input 
                id="edit-code" 
                value={editedPromotion.code} 
                onChange={(e) => setEditedPromotion({...editedPromotion, code: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-discount">Discount Amount</Label>
              <div className="flex">
                <Input 
                  id="edit-discount" 
                  value={editedPromotion.discount}
                  onChange={(e) => setEditedPromotion({...editedPromotion, discount: e.target.value})}
                  className="rounded-r-none" 
                />
                <select 
                  className="bg-gray-100 border border-input px-4 py-2 rounded-r-md focus:outline-none"
                  value={editedPromotion.discountType}
                  onChange={(e) => setEditedPromotion({...editedPromotion, discountType: e.target.value})}
                >
                  <option value="%">%</option>
                  <option value="$">$</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input 
                id="edit-description" 
                value={editedPromotion.description}
                onChange={(e) => setEditedPromotion({...editedPromotion, description: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-valid-until">Valid Until</Label>
              <Input 
                id="edit-valid-until" 
                type="date" 
                value={editedPromotion.validUntil}
                onChange={(e) => setEditedPromotion({...editedPromotion, validUntil: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-usage-limit">Usage Limit</Label>
              <Input 
                id="edit-usage-limit" 
                type="number" 
                value={editedPromotion.usageLimit}
                onChange={(e) => setEditedPromotion({
                  ...editedPromotion, 
                  usageLimit: parseInt(e.target.value) || 0
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            {selectedPromotion && selectedPromotion.status === "inactive" && (
              <Button 
                variant="outline" 
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={handleActivateFromEdit}
              >
                Activate
              </Button>
            )}
            {selectedPromotion && selectedPromotion.status === "active" && (
              <Button 
                variant="outline" 
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  if (selectedPromotion) {
                    const updatedPromotions = promotions.map(p => {
                      if (p.id === selectedPromotion.id) {
                        return { ...p, status: "inactive" };
                      }
                      return p;
                    });
                    
                    setPromotions(updatedPromotions);
                    toast({
                      title: "Success",
                      description: `Promotion ${selectedPromotion.code} has been deactivated`,
                    });
                    setShowEditDialog(false);
                  }
                }}
              >
                Deactivate
              </Button>
            )}
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Promotion Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Promotion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate the promotion code "{selectedPromotion?.code}"? 
              This will prevent users from applying this discount.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-end gap-2">
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            {selectedPromotion && selectedPromotion.status === "inactive" && (
              <Button 
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={handleActivateFromDialog}
              >
                Activate
              </Button>
            )}
            {selectedPromotion && selectedPromotion.status === "active" && (
              <AlertDialogAction onClick={handleConfirmDeactivate} className="bg-red-600 text-white hover:bg-red-700">
                Deactivate
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPromotions;
