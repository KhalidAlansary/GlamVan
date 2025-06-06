import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Calendar, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  vans as initialVans,
  getAvailableVanForLocation,
  Van,
} from "@/data/vans";

const CAIRO_LOCATIONS = ["El Rehab", "New Cairo", "Sheikh Zayed", "Tagmo3"];

const SERVICES = [
  "Bridal Makeup",
  "Hair & Nails",
  "Full Glam Package",
  "Basic Makeup",
  "Hair Styling",
];

const AdminVans = () => {
  const [activeTab, setActiveTab] = useState("assignments");
  const [isEditVanOpen, setIsEditVanOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [currentVan, setCurrentVan] = useState(null);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);

  const [vans, setVans] = useState(initialVans);

  const [vanAssignments, setVanAssignments] = useState([
    {
      id: "VA-1001",
      bookingId: "BK-1234",
      client: "Fatima Ahmed",
      service: "Bridal Makeup",
      vanId: "VAN-001",
      vanName: "GlamVan Luxury",
      date: "May 2, 2025",
      time: "10:00 AM",
      location: "El Rehab",
      status: "confirmed",
    },
    {
      id: "VA-1002",
      bookingId: "BK-1235",
      client: "Mariam Khalid",
      service: "Hair & Nails",
      vanId: "VAN-002",
      vanName: "GlamVanLuxury 1",
      date: "May 3, 2025",
      time: "2:30 PM",
      location: "Sheikh Zayed",
      status: "confirmed",
    },
    {
      id: "VA-1003",
      bookingId: "BK-1236",
      client: "Sara Ali",
      service: "Full Glam Package",
      vanId: null,
      vanName: null,
      date: "May 4, 2025",
      time: "11:15 AM",
      location: "New Cairo",
      status: "needs assignment",
    },
  ]);

  const assignForm = useForm();
  const editVanForm = useForm();
  const serviceForm = useForm();
  const modifyForm = useForm();
  const manualBookingForm = useForm({
    defaultValues: {
      client: "",
      service: "",
      date: "",
      time: "",
      location: "",
    },
  });

  const handleManualBooking = (data) => {
    const newBookingId = `BK-${1000 + vanAssignments.length}`;

    const availableVan = getAvailableVanForLocation(data.location);

    const newAssignment = {
      id: `VA-${1004 + vanAssignments.length - 3}`,
      bookingId: newBookingId,
      client: data.client,
      service: data.service,
      vanId: availableVan?.id || null,
      vanName: availableVan?.name || null,
      date: data.date,
      time: data.time,
      location: data.location,
      status: availableVan ? "confirmed" : "needs assignment",
    };

    setVanAssignments((prev) => [...prev, newAssignment]);

    if (availableVan) {
      toast.success(
        `Manual booking ${newBookingId} created and automatically assigned to ${availableVan.name}`,
      );
    } else {
      toast.success(
        `Manual booking ${newBookingId} created - no vans available for automatic assignment`,
      );
    }

    setIsManualBookingOpen(false);
    manualBookingForm.reset();
  };

  const handleAssignVan = (assignment, vanId) => {
    const selectedVan = vans.find((van) => van.id === vanId);

    if (!selectedVan) {
      toast.error("Please select a van first");
      return;
    }

    setVanAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignment.id) {
          return {
            ...a,
            vanId: selectedVan.id,
            vanName: selectedVan.name,
            status: "confirmed",
          };
        }
        return a;
      }),
    );

    toast.success(
      `Van ${selectedVan.name} assigned to booking ${assignment.bookingId}`,
    );
    setIsAssignDialogOpen(false);
  };

  const handleUnassignVan = (assignment) => {
    setVanAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignment.id) {
          return {
            ...a,
            vanId: null,
            vanName: null,
            status: "needs assignment",
          };
        }
        return a;
      }),
    );

    toast.success(`Van unassigned from booking ${assignment.bookingId}`);
  };

  const handleEditVan = (data) => {
    if (!currentVan) return;

    setVans((prev) =>
      prev.map((van) => {
        if (van.id === currentVan.id) {
          return {
            ...van,
            name: data.name,
            driver: data.driver,
            location: data.location,
            capacity: data.capacity,
          };
        }
        return van;
      }),
    );

    setIsEditVanOpen(false);
    toast.success(`Van ${data.name} updated successfully`);
  };

  const handleAddVan = () => {
    const nameInput = document.getElementById("vanName") as HTMLInputElement;
    const driverInput = document.getElementById(
      "driverName",
    ) as HTMLInputElement;

    if (!nameInput || !driverInput) {
      toast.error("Form inputs not found");
      return;
    }

    const name = nameInput.value;
    const driver = driverInput.value;

    if (!name) {
      toast.error("Van name is required");
      return;
    }

    const newVan: Van = {
      id: `VAN-00${vans.length + 1}`,
      name,
      driver: driver || "Not assigned",
      status: "available" as const,
      location: "New Cairo",
      lastService: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      capacity: "4 stylists",
    };

    setVans((prev) => [...prev, newVan]);
    toast.success(`New van ${name} added to fleet`);

    nameInput.value = "";
    driverInput.value = "";
  };

  const handleRemoveVan = (vanId) => {
    const isAssigned = vanAssignments.some(
      (assignment) => assignment.vanId === vanId,
    );

    if (isAssigned) {
      toast.error("Cannot remove van that is currently assigned to bookings");
      return;
    }

    setVans((prev) => prev.filter((van) => van.id !== vanId));
    toast.success("Van removed from fleet");
  };

  const handleScheduleService = (data) => {
    if (!currentVan) return;

    const nextServiceDate = data.serviceDate;

    setVans((prev) =>
      prev.map((van) => {
        if (van.id === currentVan.id) {
          return {
            ...van,
            status: van.status === "maintenance" ? "available" : van.status,
          };
        }
        return van;
      }),
    );

    setIsServiceDialogOpen(false);
    toast.success(
      `Next service scheduled for ${currentVan.name} on ${nextServiceDate}`,
    );
  };

  const handleMarkForService = (vanId) => {
    const isAssigned = vanAssignments.some(
      (assignment) =>
        assignment.vanId === vanId && assignment.status === "confirmed",
    );

    if (isAssigned) {
      toast.error(
        "Cannot mark van for service while it has upcoming assignments",
      );
      return;
    }

    setVans((prev) =>
      prev.map((van) => {
        if (van.id === vanId) {
          return {
            ...van,
            status: "maintenance",
          };
        }
        return van;
      }),
    );

    toast.success("Van marked for maintenance");
  };

  const openAssignDialog = (assignment) => {
    setCurrentAssignment(assignment);
    setIsAssignDialogOpen(true);
  };

  const openModifyDialog = (assignment) => {
    setCurrentAssignment(assignment);
    modifyForm.reset({
      location: assignment.location,
      date: assignment.date,
      time: assignment.time,
    });
    setIsModifyDialogOpen(true);
  };

  const handleModifyAssignment = (data) => {
    if (!currentAssignment) return;

    setVanAssignments((prev) =>
      prev.map((a) => {
        if (a.id === currentAssignment.id) {
          return {
            ...a,
            location: data.location,
            date: data.date,
            time: data.time,
          };
        }
        return a;
      }),
    );

    setIsModifyDialogOpen(false);
    toast.success(`Assignment ${currentAssignment.id} updated`);
  };

  const openEditVanDialog = (van) => {
    setCurrentVan(van);
    editVanForm.reset({
      name: van.name,
      driver: van.driver,
      location: van.location,
      capacity: van.capacity,
    });
    setIsEditVanOpen(true);
  };

  const openServiceDialog = (van) => {
    setCurrentVan(van);
    const nextServiceDate = new Date();
    nextServiceDate.setMonth(nextServiceDate.getMonth() + 3);

    serviceForm.reset({
      serviceDate: nextServiceDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });

    setIsServiceDialogOpen(true);
  };

  const handleCompleteMaintenance = (vanId) => {
    setVans((prev) =>
      prev.map((van) => {
        if (van.id === vanId && van.status === "maintenance") {
          const today = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return {
            ...van,
            status: "available",
            lastService: today,
          };
        }
        return van;
      }),
    );

    toast.success("Maintenance completed. Van is now available.");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "assigned":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "needs assignment":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Van Management</h1>
      </div>

      <div className="flex space-x-1 border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "assignments" ? "border-b-2 border-salon-purple text-salon-purple" : "text-gray-600"}`}
          onClick={() => setActiveTab("assignments")}
        >
          Van Assignments
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "fleet" ? "border-b-2 border-salon-purple text-salon-purple" : "text-gray-600"}`}
          onClick={() => setActiveTab("fleet")}
        >
          Fleet Management
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "maintenance" ? "border-b-2 border-salon-purple text-salon-purple" : "text-gray-600"}`}
          onClick={() => setActiveTab("maintenance")}
        >
          Maintenance Schedule
        </button>
      </div>

      {activeTab === "assignments" && (
        <>
          <div className="flex justify-end mb-4">
            <Button
              className="bg-salon-purple hover:bg-salon-dark-purple"
              onClick={() => setIsManualBookingOpen(true)}
            >
              Create Manual Booking
            </Button>
          </div>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Pending Van Assignments</CardTitle>
              <CardDescription>
                Assign vans to upcoming bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Assign Van</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vanAssignments
                      .filter((a) => a.status === "needs assignment")
                      .map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">
                            {assignment.bookingId}
                          </TableCell>
                          <TableCell>{assignment.client}</TableCell>
                          <TableCell>
                            {assignment.date}
                            <br />
                            <span className="text-gray-500 text-sm">
                              {assignment.time}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin
                                size={14}
                                className="mr-1 text-gray-400"
                              />
                              {assignment.location}
                            </div>
                          </TableCell>
                          <TableCell>{assignment.service}</TableCell>
                          <TableCell>
                            <Select
                              onValueChange={(value) => {
                                handleAssignVan(assignment, value);
                              }}
                            >
                              <SelectTrigger className="w-36">
                                <SelectValue placeholder="Select Van" />
                              </SelectTrigger>
                              <SelectContent>
                                {vans
                                  .filter((v) => v.status === "available")
                                  .map((van) => (
                                    <SelectItem key={van.id} value={van.id}>
                                      {van.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => openAssignDialog(assignment)}
                            >
                              Assign
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {vanAssignments.filter(
                      (a) => a.status === "needs assignment",
                    ).length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-4 text-gray-500"
                        >
                          No pending assignments
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Current Van Assignments</CardTitle>
              <CardDescription>Overview of all van assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment ID</TableHead>
                      <TableHead>Booking</TableHead>
                      <TableHead>Van</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vanAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          {assignment.id}
                        </TableCell>
                        <TableCell>
                          {assignment.bookingId}
                          <br />
                          <span className="text-xs text-gray-500">
                            {assignment.client}
                          </span>
                        </TableCell>
                        <TableCell>
                          {assignment.vanName || "Not assigned"}
                        </TableCell>
                        <TableCell>
                          {assignment.date}
                          <br />
                          <span className="text-gray-500 text-sm">
                            {assignment.time}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          <div className="flex items-center">
                            <MapPin
                              size={14}
                              className="mr-1 text-gray-400 shrink-0"
                            />
                            <span className="truncate">
                              {assignment.location}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(assignment.status)}`}
                          >
                            {assignment.status.charAt(0).toUpperCase() +
                              assignment.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openModifyDialog(assignment)}
                            >
                              Modify
                            </Button>
                            {assignment.status !== "needs assignment" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleUnassignVan(assignment)}
                              >
                                Unassign
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "fleet" && (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Fleet Management</CardTitle>
            <CardDescription>
              Manage your fleet of mobile salon vans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Van ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Current Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vans.map((van) => (
                    <TableRow key={van.id}>
                      <TableCell className="font-medium">{van.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Truck size={16} className="mr-2 text-salon-purple" />
                          {van.name}
                        </div>
                      </TableCell>
                      <TableCell>{van.driver}</TableCell>
                      <TableCell>{van.capacity}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1 text-gray-400" />
                          {van.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(van.status)}`}
                        >
                          {van.status.charAt(0).toUpperCase() +
                            van.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditVanDialog(van)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleRemoveVan(van.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Add New Van</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Van Name" id="vanName" />
                <Input placeholder="Driver Name (Female)" id="driverName" />
                <Button className="bg-salon-purple" onClick={handleAddVan}>
                  Add Van
                </Button>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>Note: All drivers must be female</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "maintenance" && (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>
              Track and schedule van maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Van</TableHead>
                    <TableHead>Last Service</TableHead>
                    <TableHead>Next Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vans.map((van) => {
                    const lastServiceDate = new Date(van.lastService);
                    const nextServiceDate = new Date(lastServiceDate);
                    nextServiceDate.setMonth(lastServiceDate.getMonth() + 3);
                    const nextService = nextServiceDate.toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    );

                    return (
                      <TableRow key={van.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Truck
                              size={16}
                              className="mr-2 text-salon-purple"
                            />
                            {van.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar
                              size={14}
                              className="mr-1 text-gray-400"
                            />
                            {van.lastService}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar
                              size={14}
                              className="mr-1 text-gray-400"
                            />
                            {nextService}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${van.status === "maintenance" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                          >
                            {van.status === "maintenance"
                              ? "In Maintenance"
                              : "Operational"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openServiceDialog(van)}
                            >
                              Schedule Service
                            </Button>
                            {van.status !== "maintenance" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-yellow-600"
                                onClick={() => handleMarkForService(van.id)}
                              >
                                Mark for Service
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600"
                                onClick={() =>
                                  handleCompleteMaintenance(van.id)
                                }
                              >
                                Complete Maintenance
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Van</DialogTitle>
            <DialogDescription>
              Select a van to assign to this booking
            </DialogDescription>
          </DialogHeader>

          {currentAssignment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2 col-span-4">
                  <h4 className="font-medium">Booking Details</h4>
                  <p className="text-sm text-gray-500">
                    <strong>Client:</strong> {currentAssignment.client}
                    <br />
                    <strong>Service:</strong> {currentAssignment.service}
                    <br />
                    <strong>Date:</strong> {currentAssignment.date} at{" "}
                    {currentAssignment.time}
                    <br />
                    <strong>Location:</strong> {currentAssignment.location}
                  </p>
                </div>

                <div className="col-span-4">
                  <Form {...assignForm}>
                    <form className="space-y-4">
                      <FormField
                        name="vanId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Van</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a van" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {vans
                                  .filter((v) => v.status === "available")
                                  .map((van) => (
                                    <SelectItem key={van.id} value={van.id}>
                                      {van.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                const formValues = assignForm.getValues();
                if (currentAssignment) {
                  handleAssignVan(currentAssignment, formValues.vanId);
                  setIsAssignDialogOpen(false);
                }
              }}
            >
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditVanOpen} onOpenChange={setIsEditVanOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Van Details</DialogTitle>
            <DialogDescription>
              Update the information for this van
            </DialogDescription>
          </DialogHeader>

          {currentVan && (
            <Form {...editVanForm}>
              <form
                className="space-y-4"
                onSubmit={editVanForm.handleSubmit(handleEditVan)}
              >
                <FormField
                  control={editVanForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Van Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editVanForm.control}
                  name="driver"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver Name (Female)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editVanForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CAIRO_LOCATIONS.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editVanForm.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditVanOpen(false)}
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

      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Service</DialogTitle>
            <DialogDescription>
              Set next service date for this van
            </DialogDescription>
          </DialogHeader>

          {currentVan && (
            <Form {...serviceForm}>
              <form
                className="space-y-4"
                onSubmit={serviceForm.handleSubmit(handleScheduleService)}
              >
                <FormField
                  control={serviceForm.control}
                  name="serviceDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Next Service Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsServiceDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Schedule Service</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isModifyDialogOpen} onOpenChange={setIsModifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Assignment</DialogTitle>
            <DialogDescription>
              Update the details for this assignment
            </DialogDescription>
          </DialogHeader>

          {currentAssignment && (
            <Form {...modifyForm}>
              <form
                className="space-y-4"
                onSubmit={modifyForm.handleSubmit(handleModifyAssignment)}
              >
                <FormField
                  control={modifyForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CAIRO_LOCATIONS.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={modifyForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={modifyForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModifyDialogOpen(false)}
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

      <Dialog open={isManualBookingOpen} onOpenChange={setIsManualBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Manual Booking</DialogTitle>
            <DialogDescription>
              Enter booking details for a customer
            </DialogDescription>
          </DialogHeader>

          <Form {...manualBookingForm}>
            <form
              className="space-y-4"
              onSubmit={manualBookingForm.handleSubmit(handleManualBooking)}
            >
              <FormField
                control={manualBookingForm.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter client name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={manualBookingForm.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVICES.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={manualBookingForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., May 15, 2025" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={manualBookingForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 2:30 PM" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={manualBookingForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CAIRO_LOCATIONS.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsManualBookingOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Booking</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVans;
