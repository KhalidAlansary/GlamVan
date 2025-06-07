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
import { Star, User, MapPin, Phone, Plus } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

// Define types based on Supabase tables
type Stylist = Tables<"stylists">;

const AdminStylists = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  // Fetch stylists from Supabase
  const { data: stylists = [], isLoading: stylistsLoading, error: stylistsError } = useQuery({
    queryKey: ["stylists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stylists")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data as Stylist[];
    },
  });

  // Add stylist mutation
  const addStylistMutation = useMutation({
    mutationFn: async (newStylist: Partial<Stylist>) => {
      const { data, error } = await supabase
        .from("stylists")
        .insert(newStylist)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stylists"] });
      toast.success("Stylist added successfully");
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to add stylist: ${error.message}`);
    },
  });

  // Update stylist mutation
  const updateStylistMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Stylist> }) => {
      const { data, error } = await supabase
        .from("stylists")
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
      queryClient.invalidateQueries({ queryKey: ["stylists"] });
      toast.success("Stylist updated successfully");
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update stylist: ${error.message}`);
    },
  });

  // Remove stylist mutation
  const removeStylistMutation = useMutation({
    mutationFn: async (stylistId: number) => {
      const { error } = await supabase
        .from("stylists")
        .delete()
        .eq("id", stylistId);
      
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stylists"] });
      toast.success("Stylist removed successfully");
    },
    onError: (error) => {
      toast.error(`Failed to remove stylist: ${error.message}`);
    },
  });

  // Filter stylists based on search and status
  const filteredStylists = stylists.filter((stylist) => {
    const matchesSearch =
      stylist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stylist.specialties || []).some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (stylist.work_zones || []).some(zone => 
        zone.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = filterStatus === "all" || stylist.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle status update
  const handleStatusUpdate = (stylistId: number, newStatus: string) => {
    updateStylistMutation.mutate({
      id: stylistId,
      updates: { status: newStatus },
    });
  };

  // Get status badge styling
  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Form for editing stylist
  const editForm = useForm<Partial<Stylist>>();
  const addForm = useForm<Partial<Stylist>>();

  const handleEditStylist = (stylist: Stylist) => {
    setSelectedStylist(stylist);
    editForm.reset({
      name: stylist.name,
      phone: stylist.phone || "",
      experience: stylist.experience || "",
      status: stylist.status || "pending",
    });
    setIsEditDialogOpen(true);
  };

  const handleAddStylist = (data: Partial<Stylist>) => {
    addStylistMutation.mutate({
      ...data,
      specialties: [],
      work_zones: [],
      rating: 0,
      bookings_completed: [],
    });
  };

  const handleUpdateStylist = (data: Partial<Stylist>) => {
    if (!selectedStylist) return;
    updateStylistMutation.mutate({
      id: selectedStylist.id,
      updates: data,
    });
  };

  // Handle loading and error states
  if (stylistsLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Stylists Management</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-salon-purple mx-auto mb-4"></div>
            <p className="text-gray-600">Loading stylists...</p>
          </div>
        </div>
      </div>
    );
  }

  if (stylistsError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Stylists Management</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading stylists: {stylistsError.message}</p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["stylists"] })}>
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
        <h1 className="text-2xl font-bold">Stylists Management</h1>
        <Button
          className="bg-salon-purple hover:bg-salon-dark-purple"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus size={16} className="mr-2" />
          Add New Stylist
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
                placeholder="Search stylists..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stylists Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>All Stylists</CardTitle>
          <CardDescription>
            Manage and track all beauty professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stylist</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Work Zones</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStylists.map((stylist) => (
                  <TableRow key={stylist.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <User size={14} className="mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{stylist.name}</div>
                          {stylist.phone && (
                            <div className="text-xs text-gray-500 flex items-center">
                              <Phone size={10} className="mr-1" />
                              {stylist.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(stylist.specialties || []).slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {(stylist.specialties || []).length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{(stylist.specialties || []).length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{stylist.experience || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star size={14} className="mr-1 text-yellow-500" />
                        <span>{stylist.rating?.toFixed(1) || "0.0"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(stylist.work_zones || []).slice(0, 2).map((zone, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <MapPin size={8} className="mr-1" />
                            {zone}
                          </Badge>
                        ))}
                        {(stylist.work_zones || []).length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{(stylist.work_zones || []).length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {(stylist.bookings_completed || []).length} completed
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`${getStatusBadge(stylist.status)} border-0`}
                      >
                        {(stylist.status || "pending").charAt(0).toUpperCase() + (stylist.status || "pending").slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditStylist(stylist)}
                        >
                          Edit
                        </Button>
                        <Select
                          value={stylist.status || "pending"}
                          onValueChange={(value) => handleStatusUpdate(stylist.id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => removeStylistMutation.mutate(stylist.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStylists.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No stylists found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Stylist Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Stylist</DialogTitle>
            <DialogDescription>
              Add a new beauty professional to your team
            </DialogDescription>
          </DialogHeader>

          <Form {...addForm}>
            <form
              className="space-y-4"
              onSubmit={addForm.handleSubmit(handleAddStylist)}
            >
              <FormField
                control={addForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter stylist name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter phone number" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 5 years" />
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
                <Button type="submit">Add Stylist</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Stylist Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Stylist</DialogTitle>
            <DialogDescription>
              Update stylist information
            </DialogDescription>
          </DialogHeader>

          {selectedStylist && (
            <Form {...editForm}>
              <form
                className="space-y-4"
                onSubmit={editForm.handleSubmit(handleUpdateStylist)}
              >
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
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

export default AdminStylists;
