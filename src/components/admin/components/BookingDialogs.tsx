import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Plus } from "lucide-react";
import { format } from "date-fns";
import { Booking, Van, Beautician } from "../types/booking";
import {
  getMinimumPriceForService,
  autoAssignVan,
  validatePhone,
} from "../utils/bookingUtils";
import { services } from "@/data/services";
import { useAuth } from "@/contexts/AuthContext";
import BookingMap from "./BookingMap";

interface BookingDialogsProps {
  // Dialog states
  showVanDialog: boolean;
  setShowVanDialog: (show: boolean) => void;
  showBeauticianDialog: boolean;
  setShowBeauticianDialog: (show: boolean) => void;
  showSmsDialog: boolean;
  setShowSmsDialog: (show: boolean) => void;
  showRefundDialog: boolean;
  setShowRefundDialog: (show: boolean) => void;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
  showEditDialog: boolean;
  setShowEditDialog: (show: boolean) => void;
  showCreateDialog: boolean;
  setShowCreateDialog: (show: boolean) => void;
  showMapDialog: boolean;
  setShowMapDialog: (show: boolean) => void;

  // Data
  selectedBooking: Booking | null;
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  vans: Van[];
  beauticians: Beautician[];
  locations: string[];
}

const BookingDialogs = ({
  showVanDialog,
  setShowVanDialog,
  showBeauticianDialog,
  setShowBeauticianDialog,
  showSmsDialog,
  setShowSmsDialog,
  showRefundDialog,
  setShowRefundDialog,
  showDeleteDialog,
  setShowDeleteDialog,
  showEditDialog,
  setShowEditDialog,
  showCreateDialog,
  setShowCreateDialog,
  showMapDialog,
  setShowMapDialog,
  selectedBooking,
  bookings,
  setBookings,
  vans,
  beauticians,
  locations,
}: BookingDialogsProps) => {
  const { user } = useAuth();

  // Edit booking form state
  const [editForm, setEditForm] = useState<Booking | null>(null);

  // New booking form state
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    client: "",
    service: "",
    location: "New Cairo",
    beautician: "Layla Mohammed",
    van: "GlamVanLuxury",
    date: format(new Date(), "MMMM d, yyyy"),
    time: "10:00 AM",
    status: "confirmed",
    payment: "Not Paid",
    paymentStatus: "not paid",
    price: "0",
    phone: "",
    address: "",
  });

  // Phone number validation error
  const [phoneError, setPhoneError] = useState("");

  // Price validation error
  const [priceError, setPriceError] = useState("");

  // Handle reassigning van
  const handleReassignVan = (vanId: string) => {
    const selectedVan = vans.find((van) => van.id === vanId);

    if (selectedBooking && selectedVan) {
      const updatedBookings = bookings.map((booking) =>
        booking.id === selectedBooking.id
          ? { ...booking, van: selectedVan.name }
          : booking,
      );
      setBookings(updatedBookings);
      toast.success(
        `Van reassigned for ${selectedBooking.client} to ${selectedVan.name}`,
      );
      setShowVanDialog(false);
    }
  };

  // Handle reassigning beautician
  const handleReassignBeautician = (beauticianId: string) => {
    const selectedBeautician = beauticians.find(
      (beautician) => beautician.id === beauticianId,
    );

    if (selectedBooking && selectedBeautician) {
      const updatedBookings = bookings.map((booking) =>
        booking.id === selectedBooking.id
          ? { ...booking, beautician: selectedBeautician.name }
          : booking,
      );
      setBookings(updatedBookings);
      toast.success(
        `Beautician reassigned for ${selectedBooking.client} to ${selectedBeautician.name}`,
      );
      setShowBeauticianDialog(false);
    }
  };

  // Handle sending SMS
  const handleSendSMS = (templateId: string) => {
    let message = "";

    if (templateId === "reminder") {
      message = `Reminder: Your appointment is scheduled for tomorrow at ${selectedBooking?.time}`;
    } else if (templateId === "on-the-way") {
      message = "Your Glam Van is 15 mins away! Track here: [GPS_LINK]";
    }

    toast.success(`SMS sent to ${selectedBooking?.client}: "${message}"`);
    setShowSmsDialog(false);
  };

  // Handle refund
  const handleRefund = () => {
    if (user?.role !== "admin") {
      toast.error("Only senior admins can process refunds");
      return;
    }

    if (selectedBooking) {
      const updatedBookings = bookings.map((booking) =>
        booking.id === selectedBooking.id
          ? { ...booking, paymentStatus: "refunded" as const }
          : booking,
      );
      setBookings(updatedBookings);
      toast.success(`Refund processed for ${selectedBooking.client}`);
    }
    setShowRefundDialog(false);
  };

  // Handle deleting booking
  const handleDeleteBooking = () => {
    if (user?.role !== "admin") {
      toast.error("Only senior admins can delete bookings");
      return;
    }

    if (selectedBooking) {
      const updatedBookings = bookings.filter(
        (booking) => booking.id !== selectedBooking.id,
      );
      setBookings(updatedBookings);
      toast.success(`Booking for ${selectedBooking.client} has been cancelled`);
    }
    setShowDeleteDialog(false);
  };

  // Handle saving edited booking
  const handleSaveBooking = () => {
    if (!editForm) return;

    // Validate price based on service
    const selectedService = editForm.service;
    const minPrice = getMinimumPriceForService(selectedService);
    const currentPrice = parseInt(
      editForm.price?.replace(/[^0-9]/g, "") || "0",
    );

    if (currentPrice < minPrice) {
      setPriceError(
        `Price cannot be less than ${minPrice} EGP for ${selectedService}`,
      );
      return;
    }

    const updatedBookings = bookings.map((booking) =>
      booking.id === editForm.id ? editForm : booking,
    );

    setBookings(updatedBookings);
    toast.success(`Booking for ${editForm.client} has been updated`);
    setShowEditDialog(false);
    setPriceError("");
  };

  // Handle creating new booking
  const handleCreateBooking = () => {
    // Validate required fields
    if (!newBooking.client || !newBooking.service || !newBooking.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate phone number
    const phoneValidation = validatePhone(newBooking.phone || "");
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error);
      return;
    }

    // Validate price based on service
    const selectedService = newBooking.service;
    const minPrice = getMinimumPriceForService(selectedService || "");
    const currentPrice = parseInt(
      newBooking.price?.replace(/[^0-9]/g, "") || "0",
    );

    if (currentPrice < minPrice) {
      setPriceError(
        `Price cannot be less than ${minPrice} EGP for ${selectedService}`,
      );
      return;
    }

    // Generate a new booking ID
    const newId = `GLAM-${Math.floor(211 + Math.random() * 100)}`;

    // Auto-assign van based on location
    const assignedVan = autoAssignVan(newBooking.location || "New Cairo");

    // Create the new booking object
    const bookingToAdd: Booking = {
      id: newId,
      client: newBooking.client || "",
      service: newBooking.service || "",
      location: newBooking.location || "New Cairo",
      beautician: newBooking.beautician || "Layla Mohammed",
      van: assignedVan,
      date: newBooking.date || format(new Date(), "MMMM d, yyyy"),
      time: newBooking.time || "10:00 AM",
      status:
        (newBooking.status as
          | "confirmed"
          | "pending"
          | "completed"
          | "cancelled"
          | "unassigned") || "confirmed",
      payment: newBooking.payment || "Not Paid",
      paymentStatus:
        (newBooking.paymentStatus as
          | "paid"
          | "pending"
          | "not paid"
          | "refunded") || "not paid",
      price: newBooking.price || "0",
      phone: newBooking.phone || "",
      address: newBooking.address || "",
    };

    // Add to the bookings array
    setBookings([...bookings, bookingToAdd]);

    toast.success(
      `New booking for ${newBooking.client} created with ID ${newId}. Van automatically assigned: ${assignedVan}`,
    );
    setShowCreateDialog(false);
    setPriceError("");

    // Reset the form
    setNewBooking({
      client: "",
      service: "",
      location: "New Cairo",
      beautician: "Layla Mohammed",
      van: "GlamVanLuxury",
      date: format(new Date(), "MMMM d, yyyy"),
      time: "10:00 AM",
      status: "confirmed",
      payment: "Not Paid",
      paymentStatus: "not paid",
      price: "0",
      phone: "",
      address: "",
    });
  };

  // Modified handleNewBookingChange to handle service selection with price update
  const handleNewBookingChange = (field: keyof Booking, value: string) => {
    if (field === "phone") {
      setPhoneError("");
      const numericValue = value.replace(/\D/g, "");
      setNewBooking({
        ...newBooking,
        [field]: numericValue,
      });
      return;
    }

    // Price field - only allow numeric values
    if (field === "price") {
      const numericValue = value.replace(/[^0-9]/g, "");

      const selectedService = newBooking.service;
      if (selectedService) {
        const minPrice = getMinimumPriceForService(selectedService);
        const priceValue = parseInt(numericValue || "0");

        if (priceValue < minPrice) {
          setPriceError(
            `Price cannot be less than ${minPrice} EGP for ${selectedService}`,
          );
        } else {
          setPriceError("");
        }
      }

      setNewBooking({
        ...newBooking,
        [field]: numericValue,
      });
      return;
    }

    // When service changes, update the price automatically
    if (field === "service") {
      const minPrice = getMinimumPriceForService(value);
      const priceString = minPrice > 0 ? `${minPrice}` : "0";

      setNewBooking({
        ...newBooking,
        [field]: value,
        price: priceString,
      });
      setPriceError("");
      return;
    }

    // When location changes, auto-assign van
    if (field === "location") {
      const assignedVan = autoAssignVan(value);

      setNewBooking({
        ...newBooking,
        [field]: value,
        van: assignedVan,
      });
      return;
    }

    setNewBooking({
      ...newBooking,
      [field]: value,
    });
  };

  // Modified handleFormChange for edit booking with price validation
  const handleFormChange = (field: keyof Booking, value: string) => {
    if (!editForm) return;

    // Handle phone input - numbers only
    if (field === "phone") {
      const numericValue = value.replace(/\D/g, "");

      setEditForm({
        ...editForm,
        [field]: numericValue,
      });
      return;
    }

    // Price field - only allow numeric values
    if (field === "price") {
      const numericValue = value.replace(/[^0-9]/g, "");

      const selectedService = editForm.service;
      const minPrice = getMinimumPriceForService(selectedService);
      const priceValue = parseInt(numericValue || "0");

      if (priceValue < minPrice) {
        setPriceError(
          `Price cannot be less than ${minPrice} EGP for ${selectedService}`,
        );
      } else {
        setPriceError("");
      }

      setEditForm({
        ...editForm,
        [field]: numericValue,
      });
      return;
    }

    // When service changes, update the price automatically
    if (field === "service") {
      const minPrice = getMinimumPriceForService(value);
      const priceString = minPrice > 0 ? `${minPrice}` : editForm.price;

      setEditForm({
        ...editForm,
        [field]: value,
        price: priceString,
      });
      setPriceError("");
      return;
    }

    // When location changes, auto-assign van
    if (field === "location") {
      const assignedVan = autoAssignVan(value);

      setEditForm({
        ...editForm,
        [field]: value,
        van: assignedVan,
      });
      return;
    }

    setEditForm({
      ...editForm,
      [field]: value,
    });
  };

  // Set edit form when edit dialog opens
  const handleEditDialogOpen = (booking: Booking) => {
    setEditForm({ ...booking });
    setShowEditDialog(true);
  };

  return (
    <>
      {/* Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Location</DialogTitle>
            <DialogDescription>
              Location details for booking {selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedBooking && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedBooking.client}</h4>
                  <p className="text-sm text-gray-500">
                    {selectedBooking.service}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedBooking.date} at {selectedBooking.time}
                  </p>
                </div>
                <BookingMap
                  location={selectedBooking.location}
                  address={selectedBooking.address}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Van Reassignment Dialog */}
      <Dialog open={showVanDialog} onOpenChange={setShowVanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reassign Van</DialogTitle>
            <DialogDescription>
              Select a new van for booking {selectedBooking?.id} (
              {selectedBooking?.client})
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {vans.map((van) => (
              <div
                key={van.id}
                className={`p-4 border rounded-md flex justify-between items-center ${
                  van.status === "available"
                    ? "cursor-pointer hover:bg-gray-50"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() =>
                  van.status === "available" && handleReassignVan(van.id)
                }
              >
                <div>
                  <p className="font-medium">{van.name}</p>
                  <p
                    className={`text-sm ${
                      van.status === "available"
                        ? "text-green-600"
                        : van.status === "maintenance"
                          ? "text-red-600"
                          : "text-orange-600"
                    }`}
                  >
                    {van.status.charAt(0).toUpperCase() + van.status.slice(1)}
                  </p>
                </div>
                {van.status === "available" && (
                  <Button size="sm" variant="outline">
                    Select
                  </Button>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Beautician Reassignment Dialog */}
      <Dialog
        open={showBeauticianDialog}
        onOpenChange={setShowBeauticianDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reassign Beautician</DialogTitle>
            <DialogDescription>
              Select a new beautician for booking {selectedBooking?.id} (
              {selectedBooking?.client})
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {beauticians.map((beautician) => (
              <div
                key={beautician.id}
                className={`p-4 border rounded-md flex justify-between items-center ${
                  beautician.status === "available"
                    ? "cursor-pointer hover:bg-gray-50"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() =>
                  beautician.status === "available" &&
                  handleReassignBeautician(beautician.id)
                }
              >
                <div>
                  <p className="font-medium">{beautician.name}</p>
                  <p className="text-sm text-gray-500">
                    {beautician.specialization}
                  </p>
                  <p
                    className={`text-sm ${
                      beautician.status === "available"
                        ? "text-green-600"
                        : beautician.status === "off"
                          ? "text-red-600"
                          : "text-orange-600"
                    }`}
                  >
                    {beautician.status.charAt(0).toUpperCase() +
                      beautician.status.slice(1)}
                  </p>
                </div>
                {beautician.status === "available" && (
                  <Button size="sm" variant="outline">
                    Select
                  </Button>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* SMS Dialog */}
      <Dialog open={showSmsDialog} onOpenChange={setShowSmsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send SMS to Client</DialogTitle>
            <DialogDescription>
              Select a template to send to {selectedBooking?.client}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div
              className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => handleSendSMS("reminder")}
            >
              <p className="font-medium">Appointment Reminder</p>
              <p className="text-sm text-gray-500">
                Remind client of their upcoming appointment
              </p>
            </div>
            <div
              className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => handleSendSMS("on-the-way")}
            >
              <p className="font-medium">On the Way</p>
              <p className="text-sm text-gray-500">
                Notify client that their van is on the way
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
            <DialogDescription>
              Are you sure you want to refund booking {selectedBooking?.id}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-2">
              This will mark the booking as refunded and issue a refund to the
              client.
            </p>
            <p className="font-medium">Client: {selectedBooking?.client}</p>
            <p className="font-medium">Amount: {selectedBooking?.price} EGP</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRefundDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRefund}>
              Process Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete/Cancel Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel booking {selectedBooking?.id}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-2">
              This action cannot be undone.
            </p>
            <p className="font-medium">Client: {selectedBooking?.client}</p>
            <p className="font-medium">Service: {selectedBooking?.service}</p>
            <p className="font-medium">
              Date: {selectedBooking?.date} at {selectedBooking?.time}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleDeleteBooking}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog
        open={showEditDialog}
        onOpenChange={(open) => {
          setShowEditDialog(open);
          if (!open) {
            setPriceError("");
          }
        }}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update booking details for {editForm?.id}
            </DialogDescription>
          </DialogHeader>
          {editForm && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="edit-client">Client Name</Label>
                  <Input
                    id="edit-client"
                    value={editForm.client}
                    onChange={(e) => handleFormChange("client", e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="edit-service">Service</Label>
                  <Select
                    value={editForm.service}
                    onValueChange={(value) =>
                      handleFormChange("service", value)
                    }
                  >
                    <SelectTrigger id="edit-service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.title}>
                          {service.title} - {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label htmlFor="edit-price">Price (EGP)</Label>
                  <Input
                    id="edit-price"
                    value={editForm.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                  />
                  {priceError && (
                    <p className="text-red-500 text-xs mt-1">{priceError}</p>
                  )}
                </div>

                <div className="col-span-1">
                  <Label htmlFor="edit-location">Location</Label>
                  <Select
                    value={editForm.location}
                    onValueChange={(value) =>
                      handleFormChange("location", value)
                    }
                  >
                    <SelectTrigger id="edit-location">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label htmlFor="edit-beautician">Beautician</Label>
                  <Select
                    value={editForm.beautician}
                    onValueChange={(value) =>
                      handleFormChange("beautician", value)
                    }
                  >
                    <SelectTrigger id="edit-beautician">
                      <SelectValue placeholder="Select a beautician" />
                    </SelectTrigger>
                    <SelectContent>
                      {beauticians.map((beautician) => (
                        <SelectItem key={beautician.id} value={beautician.name}>
                          {beautician.name} - {beautician.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label htmlFor="edit-van">Van (Auto-assigned)</Label>
                  <Input
                    id="edit-van"
                    value={editForm.van}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    value={editForm.date}
                    onChange={(e) => handleFormChange("date", e.target.value)}
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor="edit-time">Time</Label>
                  <Input
                    id="edit-time"
                    value={editForm.time}
                    onChange={(e) => handleFormChange("time", e.target.value)}
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(
                      value:
                        | "confirmed"
                        | "pending"
                        | "completed"
                        | "cancelled"
                        | "unassigned",
                    ) => handleFormChange("status", value)}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label htmlFor="edit-payment-status">Payment</Label>
                  <Select
                    value={editForm.paymentStatus}
                    onValueChange={(
                      value: "paid" | "pending" | "not paid" | "refunded",
                    ) => handleFormChange("paymentStatus", value)}
                  >
                    <SelectTrigger id="edit-payment-status">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="not paid">Not Paid</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={editForm.phone || ""}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    placeholder="e.g. 01234567890"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="edit-address">Address</Label>
                  <Textarea
                    id="edit-address"
                    value={editForm.address || ""}
                    onChange={(e) =>
                      handleFormChange("address", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false);
                setPriceError("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveBooking}>
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Booking Dialog */}
      <Dialog
        open={showCreateDialog}
        onOpenChange={(open) => {
          setShowCreateDialog(open);
          if (!open) {
            setPriceError("");
            setPhoneError("");
          }
        }}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
            <DialogDescription>
              Fill in the details for the new booking. Van will be auto-assigned
              based on location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="new-client">Client Name *</Label>
                <Input
                  id="new-client"
                  value={newBooking.client}
                  onChange={(e) =>
                    handleNewBookingChange("client", e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="new-service">Service *</Label>
                <Select
                  value={newBooking.service}
                  onValueChange={(value) =>
                    handleNewBookingChange("service", value)
                  }
                >
                  <SelectTrigger id="new-service">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.title}>
                        {service.title} - {service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1">
                <Label htmlFor="new-price">Price (EGP) *</Label>
                <Input
                  id="new-price"
                  value={newBooking.price}
                  onChange={(e) =>
                    handleNewBookingChange("price", e.target.value)
                  }
                />
                {priceError && (
                  <p className="text-red-500 text-xs mt-1">{priceError}</p>
                )}
              </div>

              <div className="col-span-1">
                <Label htmlFor="new-location">Location *</Label>
                <Select
                  value={newBooking.location}
                  onValueChange={(value) =>
                    handleNewBookingChange("location", value)
                  }
                >
                  <SelectTrigger id="new-location">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1">
                <Label htmlFor="new-beautician">Beautician *</Label>
                <Select
                  value={newBooking.beautician}
                  onValueChange={(value) =>
                    handleNewBookingChange("beautician", value)
                  }
                >
                  <SelectTrigger id="new-beautician">
                    <SelectValue placeholder="Select a beautician" />
                  </SelectTrigger>
                  <SelectContent>
                    {beauticians.map((beautician) => (
                      <SelectItem key={beautician.id} value={beautician.name}>
                        {beautician.name} - {beautician.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1">
                <Label htmlFor="new-van">Van (Auto-assigned)</Label>
                <Input
                  id="new-van"
                  value={autoAssignVan(newBooking.location || "New Cairo")}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="new-date">Date *</Label>
                <Input
                  id="new-date"
                  value={newBooking.date}
                  onChange={(e) =>
                    handleNewBookingChange("date", e.target.value)
                  }
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="new-time">Time *</Label>
                <Input
                  id="new-time"
                  value={newBooking.time}
                  onChange={(e) =>
                    handleNewBookingChange("time", e.target.value)
                  }
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="new-status">Status *</Label>
                <Select
                  value={newBooking.status}
                  onValueChange={(value) =>
                    handleNewBookingChange("status", value as any)
                  }
                >
                  <SelectTrigger id="new-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1">
                <Label htmlFor="new-payment-status">Payment Status *</Label>
                <Select
                  value={newBooking.paymentStatus}
                  onValueChange={(value) =>
                    handleNewBookingChange("paymentStatus", value as any)
                  }
                >
                  <SelectTrigger id="new-payment-status">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="not paid">Not Paid</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="new-phone">Phone Number *</Label>
                <Input
                  id="new-phone"
                  value={newBooking.phone}
                  onChange={(e) =>
                    handleNewBookingChange("phone", e.target.value)
                  }
                  placeholder="e.g. 01234567890"
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="new-address">Address</Label>
                <Textarea
                  id="new-address"
                  value={newBooking.address}
                  onChange={(e) =>
                    handleNewBookingChange("address", e.target.value)
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateDialog(false);
                setPriceError("");
                setPhoneError("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateBooking}>
              <Plus size={16} className="mr-2" />
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingDialogs;
