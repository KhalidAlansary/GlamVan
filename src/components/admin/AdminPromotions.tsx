import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Plus, Tag, Users, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

// Define types based on Supabase tables
type Promotion = Tables<"promotions">;

const AdminPromotions = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  // Fetch promotions from Supabase
  const { data: promotions = [], isLoading: promotionsLoading, error: promotionsError } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data as Promotion[];
    },
  });

  // Add promotion mutation
  const addPromotionMutation = useMutation({
    mutationFn: async (newPromotion: Partial<Promotion>) => {
      const { data, error } = await supabase
        .from("promotions")
        .insert(newPromotion)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
      toast.success("Promotion added successfully");
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to add promotion: ${error.message}`);
    },
  });

  // Update promotion mutation
  const updatePromotionMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Promotion> }) => {
      const { data, error } = await supabase
        .from("promotions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
      toast.success("Promotion updated successfully");
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update promotion: ${error.message}`);
    },
  });

  // Remove promotion mutation
  const removePromotionMutation = useMutation({
    mutationFn: async (promotionId: number) => {
      const { error } = await supabase
        .from("promotions")
        .delete()
        .eq("id", promotionId);
      
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
      toast.success("Promotion removed successfully");
    },
    onError: (error) => {
      toast.error(`Failed to remove promotion: ${error.message}`);
    },
  });

  // Filter promotions based on search and status
  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (promotion.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || promotion.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle status update
  const handleStatusUpdate = (promotionId: number, newStatus: string) => {
    updatePromotionMutation.mutate({
      id: promotionId,
      updates: { status: newStatus },
    });
  };

  // Get status badge styling
  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Form for editing promotion
  const editForm = useForm<Partial<Promotion>>();
  const addForm = useForm<Partial<Promotion>>();

  const handleEditPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    editForm.reset({
      code: promotion.code,
      description: promotion.description || "",
      discount: promotion.discount,
      usage_limit: promotion.usage_limit || 0,
      valid_until: promotion.valid_until || "",
      status: promotion.status || "inactive",
    });
    setIsEditDialogOpen(true);
  };

  const handleAddPromotion = (data: Partial<Promotion>) => {
    addPromotionMutation.mutate({
      ...data,
      used_count: 0,
    });
  };

  const handleUpdatePromotion = (data: Partial<Promotion>) => {
    if (!selectedPromotion) return;
    updatePromotionMutation.mutate({
      id: selectedPromotion.id,
      updates: data,
    });
  };

  // Handle loading and error states
  if (promotionsLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Promotions Management</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-salon-purple mx-auto mb-4"></div>
            <p className="text-gray-600">Loading promotions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (promotionsError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Promotions Management</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading promotions: {promotionsError.message}</p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["promotions"] })}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Promotions Management</h1>
        <Button
          className="bg-salon-purple hover:bg-salon-dark-purple"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus size={16} className="mr-2" />
          Add New Promotion
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Promotions Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>All Promotions</CardTitle>
          <CardDescription>
            Manage discount codes and promotional offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Tag size={14} className="mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium font-mono">{promotion.code}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        {promotion.description || "No description"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{promotion.discount}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users size={14} className="mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">
                            {promotion.used_count || 0} / {promotion.usage_limit || "∞"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {promotion.usage_limit && promotion.used_count 
                              ? `${Math.round(((promotion.used_count || 0) / promotion.usage_limit) * 100)}% used`
                              : "No limit"
                            }
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-gray-400" />
                        {promotion.valid_until || "No expiry"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`${getStatusBadge(promotion.status)} border-0`}
                      >
                        {(promotion.status || "inactive").charAt(0).toUpperCase() + (promotion.status || "inactive").slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPromotion(promotion)}
                        >
                          Edit
                        </Button>
                        <Select
                          value={promotion.status || "inactive"}
                          onValueChange={(value) => handleStatusUpdate(promotion.id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => removePromotionMutation.mutate(promotion.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPromotions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No promotions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Promotion Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Promotion</DialogTitle>
            <DialogDescription>
              Create a new discount code or promotional offer
            </DialogDescription>
          </DialogHeader>

          <Form {...addForm}>
            <form
              className="space-y-4"
              onSubmit={addForm.handleSubmit(handleAddPromotion)}
            >
              <FormField
                control={addForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., SUMMER25" className="font-mono" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Brief description of the offer" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 25% off, EGP 100 off" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="usage_limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Limit</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Leave empty for unlimited" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="valid_until"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valid Until</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Promotion</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Promotion Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
            <DialogDescription>
              Update promotion details
            </DialogDescription>
          </DialogHeader>

          {selectedPromotion && (
            <Form {...editForm}>
              <form
                className="space-y-4"
                onSubmit={editForm.handleSubmit(handleUpdatePromotion)}
              >
                <FormField
                  control={editForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promo Code</FormLabel>
                      <FormControl>
                        <Input {...field} className="font-mono" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="usage_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Limit</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="valid_until"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid Until</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPromotions;
