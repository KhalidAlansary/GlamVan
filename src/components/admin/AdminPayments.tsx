
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { services } from "@/data/services";

const AdminPayments = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [newRefund, setNewRefund] = useState({
    paymentId: "",
    client: "",
    amount: "",
    reason: ""
  });
  
  // Mock data for payments - updated with actual service prices
  const [payments, setPayments] = useState([
    {
      id: "P-4501",
      client: "Fatima Ahmed",
      amount: "18,000 EGP",
      date: "April 28, 2025",
      method: "Vodafone Cash",
      status: "verified",
      bookingId: "BK-1234",
      service: "Bridal Makeup"
    },
    {
      id: "P-4502",
      client: "Mariam Khalid",
      amount: "900 EGP",
      date: "April 29, 2025",
      method: "InstaPay",
      status: "pending",
      bookingId: "BK-1235",
      service: "Hair Trimming"
    },
    {
      id: "P-4503",
      client: "Lina Mohammed",
      amount: "1,000 EGP",
      date: "April 30, 2025",
      method: "Vodafone Cash",
      status: "pending",
      bookingId: "BK-1237",
      service: "Lash Lifting"
    },
    {
      id: "P-4504",
      client: "Nouf Abdullah",
      amount: "1,800 EGP",
      date: "May 1, 2025",
      method: "Credit Card",
      status: "verified",
      bookingId: "BK-1238",
      service: "Hybrid Extensions"
    },
    {
      id: "P-4505",
      client: "Sara Ali",
      amount: "1,200 EGP",
      date: "May 2, 2025",
      method: "InstaPay",
      status: "failed",
      bookingId: "BK-1236",
      service: "Hard Gel Extensions"
    },
  ]);

  // Mock data for refunds
  const [refunds, setRefunds] = useState([
    {
      id: "R-1001",
      client: "Sara Ali",
      amount: "1,100 EGP",
      date: "April 26, 2025",
      originalPayment: "P-4432",
      reason: "Service cancelled 48 hours in advance",
      status: "processed"
    },
    {
      id: "R-1002",
      client: "Layla Hassan",
      amount: "450 EGP",
      date: "April 27, 2025",
      originalPayment: "P-4450",
      reason: "Partial refund - service modified",
      status: "pending"
    }
  ]);

  // Handler for verifying a payment
  const handleVerifyPayment = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: "verified" } 
        : payment
    ));
    toast.success(`Payment ${paymentId} has been verified`);
  };

  // Handler for rejecting a payment
  const handleRejectPayment = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: "failed" } 
        : payment
    ));
    toast.error(`Payment ${paymentId} has been rejected`);
  };

  // Handler for viewing a payment
  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment);
    setOpenDialog("viewPayment");
  };

  // Handler for contacting about a payment
  const handleContactAboutPayment = (payment: any) => {
    setSelectedPayment(payment);
    setOpenDialog("contactPayment");
  };

  // Handler for approving a refund
  const handleApproveRefund = (refundId: string) => {
    setRefunds(refunds.map(refund => 
      refund.id === refundId 
        ? { ...refund, status: "processed" } 
        : refund
    ));
    toast.success(`Refund ${refundId} has been processed`);
  };

  // Handler for rejecting a refund
  const handleRejectRefund = (refundId: string) => {
    setRefunds(refunds.map(refund => 
      refund.id === refundId 
        ? { ...refund, status: "rejected" } 
        : refund
    ));
    toast.error(`Refund ${refundId} has been rejected`);
  };

  // Handler for viewing a refund
  const handleViewRefund = (refund: any) => {
    setSelectedRefund(refund);
    setOpenDialog("viewRefund");
  };

  // Handler for issuing a new refund
  const handleIssueNewRefund = () => {
    setOpenDialog("newRefund");
  };

  // Handler for submitting a new refund
  const handleSubmitNewRefund = () => {
    const newRefundEntry = {
      id: `R-${1003 + refunds.length}`,
      client: newRefund.client,
      amount: newRefund.amount,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      originalPayment: newRefund.paymentId,
      reason: newRefund.reason,
      status: "pending"
    };
    
    setRefunds([...refunds, newRefundEntry]);
    setNewRefund({ paymentId: "", client: "", amount: "", reason: "" });
    toast.success("Refund issued successfully");
    setOpenDialog(null);
  };

  // Get payment status badge classes
  const getPaymentStatusClass = (status: string) => {
    switch(status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get refund status badge classes
  const getRefundStatusClass = (status: string) => {
    switch(status) {
      case "processed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payment Oversight</h1>

      {/* Payment Verification */}
      <Card className="border-none shadow-md max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Payment Verification</CardTitle>
          <CardDescription>Verify incoming payments from mobile payment services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 border-b">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Booking</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium">
                      {payment.id}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {payment.client}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium">
                      {payment.amount}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {payment.date}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {payment.method}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {payment.bookingId}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {payment.service}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusClass(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex space-x-2">
                        {payment.status === "pending" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-green-50 text-green-600 hover:bg-green-100"
                              onClick={() => handleVerifyPayment(payment.id)}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-red-50 text-red-600 hover:bg-red-100"
                              onClick={() => handleRejectPayment(payment.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {payment.status === "verified" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewPayment(payment)}>
                            View
                          </Button>
                        )}
                        {payment.status === "failed" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleContactAboutPayment(payment)}>
                            Contact
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Refund Management */}
      <Card className="border-none shadow-md max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Refund Management</CardTitle>
          <CardDescription>Process and track customer refunds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 border-b">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Original Payment</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {refunds.map((refund) => (
                  <tr key={refund.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium">
                      {refund.id}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {refund.client}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium">
                      {refund.amount}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {refund.date}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {refund.originalPayment}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {refund.reason}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRefundStatusClass(refund.status)}`}>
                        {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex space-x-2">
                        {refund.status === "pending" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-green-50 text-green-600 hover:bg-green-100"
                              onClick={() => handleApproveRefund(refund.id)}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-red-50 text-red-600 hover:bg-red-100"
                              onClick={() => handleRejectRefund(refund.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {refund.status === "processed" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewRefund(refund)}>
                            View
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end">
              <Button 
                className="bg-salon-purple hover:bg-salon-dark-purple booking-btn"
                onClick={handleIssueNewRefund}>
                Issue New Refund
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-none shadow-md max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Configure accepted payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center text-purple-600 mr-4">
                  VC
                </div>
                <div>
                  <h3 className="font-medium">Vodafone Cash</h3>
                  <p className="text-sm text-gray-500">Mobile payment service</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 font-medium mr-4">Active</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info("Vodafone Cash configuration opened")}>
                  Configure
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 mr-4">
                  IP
                </div>
                <div>
                  <h3 className="font-medium">InstaPay</h3>
                  <p className="text-sm text-gray-500">Online payment platform</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 font-medium mr-4">Active</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info("InstaPay configuration opened")}>
                  Configure
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-600 mr-4">
                  CC
                </div>
                <div>
                  <h3 className="font-medium">Credit Card</h3>
                  <p className="text-sm text-gray-500">Visa, Mastercard, AMEX</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 font-medium mr-4">Active</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info("Credit Card configuration opened")}>
                  Configure
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-600 mr-4">
                  +
                </div>
                <div>
                  <h3 className="font-medium">Add Payment Method</h3>
                  <p className="text-sm text-gray-500">Configure a new payment option</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.info("Add new payment method dialog opened")}>
                Add New
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {/* View Payment Dialog */}
      <Dialog open={openDialog === "viewPayment"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment ID</p>
                  <p>{selectedPayment.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p>{selectedPayment.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="font-medium">{selectedPayment.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{selectedPayment.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p>{selectedPayment.method}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Service</p>
                  <p>{selectedPayment.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Booking ID</p>
                  <p>{selectedPayment.bookingId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusClass(selectedPayment.status)}`}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact About Payment Dialog */}
      <Dialog open={openDialog === "contactPayment"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Contact Client</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <p>Payment {selectedPayment.id} failed for client {selectedPayment.client}.</p>
              <p>Send a notification to inform the client about the payment issue?</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancel</Button>
                <Button 
                  onClick={() => {
                    toast.success(`Notification sent to ${selectedPayment.client}`);
                    setOpenDialog(null);
                  }}
                >
                  Send Notification
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Refund Dialog */}
      <Dialog open={openDialog === "viewRefund"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Refund Details</DialogTitle>
          </DialogHeader>
          {selectedRefund && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Refund ID</p>
                  <p>{selectedRefund.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p>{selectedRefund.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="font-medium">{selectedRefund.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{selectedRefund.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Original Payment</p>
                  <p>{selectedRefund.originalPayment}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRefundStatusClass(selectedRefund.status)}`}>
                    {selectedRefund.status.charAt(0).toUpperCase() + selectedRefund.status.slice(1)}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Reason</p>
                  <p>{selectedRefund.reason}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Refund Dialog */}
      <Dialog open={openDialog === "newRefund"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Issue New Refund</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Payment ID</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Enter payment ID" 
                  value={newRefund.paymentId}
                  onChange={(e) => setNewRefund({...newRefund, paymentId: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Client name" 
                  value={newRefund.client}
                  onChange={(e) => setNewRefund({...newRefund, client: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Refund Amount</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="e.g. 900 EGP" 
                  value={newRefund.amount}
                  onChange={(e) => setNewRefund({...newRefund, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Refund</label>
                <textarea 
                  className="w-full p-2 border rounded-md" 
                  rows={3} 
                  placeholder="Enter reason for refund"
                  value={newRefund.reason}
                  onChange={(e) => setNewRefund({...newRefund, reason: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancel</Button>
            <Button 
              onClick={handleSubmitNewRefund}
              disabled={!newRefund.paymentId || !newRefund.client || !newRefund.amount || !newRefund.reason}
            >
              Issue Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayments;
