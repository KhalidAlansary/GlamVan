
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download, PenLine, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminWeddings = () => {
  // Toast notification
  const { toast } = useToast();

  // State for dialogs
  const [isNewContractOpen, setIsNewContractOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);
  const [isEditContractOpen, setIsEditContractOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState("");
  const [currentContract, setCurrentContract] = useState<any>(null);

  // Form state for new contract
  const [newContract, setNewContract] = useState({
    client: "",
    date: "",
    location: "",
    package: "",
    totalAmount: "",
    deposit: "",
    notes: ""
  });

  // Mock data for wedding contracts
  const [weddingContracts, setWeddingContracts] = useState([
    {
      id: "W-1001",
      client: "Layla Al-Hassan",
      date: "June 15, 2025",
      location: "Four Seasons Hotel, New Cairo",
      package: "Luxury Bridal Package",
      totalAmount: "$2,500",
      deposit: "$1,250",
      paymentStatus: "deposit paid",
      contractStatus: "signed"
    },
    {
      id: "W-1002",
      client: "Nora Mohammed",
      date: "July 22, 2025",
      location: "Ritz-Carlton, Sheikh Zayed",
      package: "Premium Bridal & Bridal Party",
      totalAmount: "$3,800",
      deposit: "$1,900",
      paymentStatus: "deposit paid",
      contractStatus: "signed"
    },
    {
      id: "W-1003",
      client: "Maya Abdullah",
      date: "August 10, 2025",
      location: "El-Rehab City Hall",
      package: "Full Bridal Experience",
      totalAmount: "$4,200",
      deposit: "$2,100",
      paymentStatus: "pending",
      contractStatus: "pending"
    },
  ]);

  // Contract templates
  const contractTemplates = [
    { 
      name: "Standard Contract",
      description: "Our standard wedding contract with basic terms and conditions.",
      content: "This standard agreement between A+ Ladies Salon and the client covers the basic wedding makeup and hair services..."
    },
    {
      name: "Premium Contract", 
      description: "Enhanced contract for premium wedding packages with additional services.",
      content: "This premium agreement between A+ Ladies Salon and the client includes extended services for the bride and wedding party..."
    }
  ];
  
  // Refund policy state
  const [refundPolicy, setRefundPolicy] = useState({
    standardDepositPercent: 50,
    premiumDepositPercent: 50,
    refund30DaysBefore: 75,
    refund15to30DaysBefore: 50,
    refundLessThan15Days: 0
  });

  // Handle form input changes for new contract
  const handleContractInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewContract(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for dropdown inputs
  const handleSelectChange = (name: string, value: string) => {
    setNewContract(prev => ({ ...prev, [name]: value }));
  };

  // Handle refund policy changes
  const handleRefundPolicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRefundPolicy(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  // Validate contract fields
  const validateContract = (contract: any) => {
    // Check required fields
    if (!contract.client || !contract.date || !contract.location || !contract.package || !contract.totalAmount || !contract.deposit) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    // Validate total amount is numeric
    const totalAmount = contract.totalAmount.replace(/[$,]/g, '');
    if (isNaN(parseFloat(totalAmount)) || !isFinite(Number(totalAmount))) {
      toast({
        title: "Invalid total amount",
        description: "Total amount must be a valid number.",
        variant: "destructive"
      });
      return false;
    }

    // Validate deposit is numeric
    const deposit = contract.deposit.replace(/[$,]/g, '');
    if (isNaN(parseFloat(deposit)) || !isFinite(Number(deposit))) {
      toast({
        title: "Invalid deposit amount",
        description: "Deposit amount must be a valid number.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  // Format currency values
  const formatCurrency = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Check if it's a valid number
    if (numericValue && !isNaN(parseFloat(numericValue)) && isFinite(Number(numericValue))) {
      return `$${parseFloat(numericValue).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })}`;
    }
    
    return value;
  };

  // Function to create a new contract
  const handleCreateContract = () => {
    // Validate inputs using the new validation function
    if (!validateContract(newContract)) {
      return;
    }

    // Format currency values
    const formattedTotalAmount = formatCurrency(newContract.totalAmount);
    const formattedDeposit = formatCurrency(newContract.deposit);

    // Create new contract object
    const newContractObj = {
      id: `W-${1004 + weddingContracts.length}`,
      client: newContract.client,
      date: newContract.date,
      location: newContract.location,
      package: newContract.package,
      totalAmount: formattedTotalAmount,
      deposit: formattedDeposit,
      paymentStatus: "pending",
      contractStatus: "pending"
    };

    // Add to contracts list
    setWeddingContracts(prev => [...prev, newContractObj]);
    
    // Reset form and close dialog
    setNewContract({
      client: "",
      date: "",
      location: "",
      package: "",
      totalAmount: "",
      deposit: "",
      notes: ""
    });
    setIsNewContractOpen(false);
    
    toast({
      title: "Contract created",
      description: `Wedding contract for ${newContract.client} has been created.`
    });
  };

  // Function to save template changes
  const handleSaveTemplate = () => {
    toast({
      title: "Template updated",
      description: "Contract template has been updated successfully."
    });
    setIsEditTemplateOpen(false);
  };

  // Function to save contract edits
  const handleSaveContractChanges = () => {
    if (currentContract) {
      // Validate the contract before saving
      if (!validateContract(currentContract)) {
        return;
      }

      // Format currency values
      currentContract.totalAmount = formatCurrency(currentContract.totalAmount);
      currentContract.deposit = formatCurrency(currentContract.deposit);

      // Update the contract in the list
      setWeddingContracts(prev => 
        prev.map(contract => 
          contract.id === currentContract.id ? currentContract : contract
        )
      );
      
      toast({
        title: "Contract updated",
        description: `Wedding contract for ${currentContract.client} has been updated.`
      });
      setIsEditContractOpen(false);
    }
  };

  // Function to save refund policy changes
  const handleSaveRefundPolicy = () => {
    toast({
      title: "Policy updated",
      description: "Refund policy settings have been updated successfully."
    });
  };

  // Function to preview contract template
  const handlePreviewTemplate = (template: string) => {
    setCurrentTemplate(template);
    setIsPreviewOpen(true);
  };

  // Function to edit contract template
  const handleEditTemplate = (template: string) => {
    setCurrentTemplate(template);
    setIsEditTemplateOpen(true);
  };

  // Function to edit contract
  const handleEditContract = (contract: any) => {
    setCurrentContract({...contract});
    setIsEditContractOpen(true);
  };

  // Function to download contract
  const handleDownloadContract = (id: string) => {
    toast({
      title: "Contract downloaded",
      description: `Wedding contract ${id} has been prepared for download.`
    });
  };

  // Get payment status badge classes
  const getPaymentStatusClass = (status: string) => {
    switch(status) {
      case "deposit paid":
        return "bg-blue-100 text-blue-800";
      case "fully paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get contract status badge classes
  const getContractStatusClass = (status: string) => {
    switch(status) {
      case "signed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Location options limited to Egypt areas
  const locationOptions = [
    { value: "El-Rehab City Hall", label: "El-Rehab City, Cairo" },
    { value: "New Cairo Convention Center", label: "New Cairo" },
    { value: "Sheikh Zayed Grand Hall", label: "Sheikh Zayed, Giza" },
    { value: "Four Seasons Hotel, New Cairo", label: "Four Seasons, New Cairo" },
    { value: "Ritz-Carlton, Sheikh Zayed", label: "Ritz-Carlton, Sheikh Zayed, Giza" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Wedding Contract Management</h1>
        <Button 
          className="bg-salon-purple hover:bg-salon-dark-purple booking-btn"
          onClick={() => setIsNewContractOpen(true)}
        >
          Create New Contract
        </Button>
      </div>

      {/* Contract Template */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Contract Templates</CardTitle>
          <CardDescription>Manage your wedding service contract templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-salon-purple" />
                  Standard Contract
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Our standard wedding contract with basic terms and conditions.
                </p>
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePreviewTemplate("Standard Contract")}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditTemplate("Standard Contract")}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-salon-purple" />
                  Premium Contract
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Enhanced contract for premium wedding packages with additional services.
                </p>
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePreviewTemplate("Premium Contract")}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditTemplate("Premium Contract")}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-salon-purple" />
                  Create Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Create a custom contract template for special wedding needs.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "New template",
                      description: "Creating a new custom template..."
                    });
                  }}
                >
                  + New Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Wedding Contracts */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Wedding Contracts</CardTitle>
          <CardDescription>Manage all wedding bookings and contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 border-b">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Payment Status</th>
                  <th className="px-4 py-3">Contract Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {weddingContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium">
                      {contract.id}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {contract.client}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {contract.date}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {contract.location}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {contract.package}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium">
                      {contract.totalAmount}
                      <div className="text-xs text-gray-500">
                        Deposit: {contract.deposit}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusClass(contract.paymentStatus)}`}>
                        {contract.paymentStatus.charAt(0).toUpperCase() + contract.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getContractStatusClass(contract.contractStatus)}`}>
                        {contract.contractStatus.charAt(0).toUpperCase() + contract.contractStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadContract(contract.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditContract(contract)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Refund Policy */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Refund Policy Management</CardTitle>
          <CardDescription>Configure deposit and refund policies for wedding bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Deposit Requirements</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>Standard deposit percentage:</span>
                  <div className="flex items-center">
                    <Input 
                      type="number" 
                      className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2" 
                      name="standardDepositPercent"
                      value={refundPolicy.standardDepositPercent}
                      onChange={handleRefundPolicyChange}
                      min="0"
                      max="100"
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Premium deposit percentage:</span>
                  <div className="flex items-center">
                    <Input 
                      type="number" 
                      className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2" 
                      name="premiumDepositPercent"
                      value={refundPolicy.premiumDepositPercent}
                      onChange={handleRefundPolicyChange}
                      min="0"
                      max="100"
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Refund Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Cancellation more than 30 days before:</span>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2"
                        name="refund30DaysBefore"
                        value={refundPolicy.refund30DaysBefore}
                        onChange={handleRefundPolicyChange}
                        min="0"
                        max="100"
                      />
                      <span className="ml-2">% refund</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cancellation 15-30 days before:</span>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2"
                        name="refund15to30DaysBefore"
                        value={refundPolicy.refund15to30DaysBefore}
                        onChange={handleRefundPolicyChange}
                        min="0"
                        max="100"
                      />
                      <span className="ml-2">% refund</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cancellation less than 15 days before:</span>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2"
                        name="refundLessThan15Days"
                        value={refundPolicy.refundLessThan15Days}
                        onChange={handleRefundPolicyChange}
                        min="0"
                        max="100" 
                      />
                      <span className="ml-2">% refund</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                className="bg-salon-purple hover:bg-salon-dark-purple booking-btn"
                onClick={handleSaveRefundPolicy}
              >
                Save Policy Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Contract Dialog */}
      <Dialog open={isNewContractOpen} onOpenChange={setIsNewContractOpen}>
        <DialogContent className="sm:max-w-[450px] mx-auto p-4">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg">Create New Wedding Contract</DialogTitle>
            <DialogDescription className="text-xs">
              Enter the details for the new wedding contract. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3">
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="clientName" className="text-right text-sm">
                Client Name*
              </Label>
              <Input
                id="clientName"
                name="client"
                value={newContract.client}
                onChange={handleContractInputChange}
                className="col-span-3 h-8 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="weddingDate" className="text-right text-sm">
                Wedding Date*
              </Label>
              <Input
                id="weddingDate"
                name="date"
                type="date"
                value={newContract.date}
                onChange={handleContractInputChange}
                className="col-span-3 h-8 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="location" className="text-right text-sm">
                Location*
              </Label>
              <div className="col-span-3">
                <Select
                  name="location"
                  value={newContract.location}
                  onValueChange={(value) => handleSelectChange("location", value)}
                  required
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-sm">{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="packageType" className="text-right text-sm">
                Package*
              </Label>
              <div className="col-span-3">
                <Select
                  name="package"
                  value={newContract.package}
                  onValueChange={(value) => handleSelectChange("package", value)}
                  required
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luxury Bridal Package" className="text-sm">Luxury Bridal Package</SelectItem>
                    <SelectItem value="Premium Bridal & Bridal Party" className="text-sm">Premium Bridal & Bridal Party</SelectItem>
                    <SelectItem value="Full Bridal Experience" className="text-sm">Full Bridal Experience</SelectItem>
                    <SelectItem value="Basic Bridal Package" className="text-sm">Basic Bridal Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="totalAmount" className="text-right text-sm">
                Total Amount*
              </Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                value={newContract.totalAmount}
                onChange={handleContractInputChange}
                placeholder="0.00"
                className="col-span-3 h-8 text-sm"
                required
              />
              <div className="col-span-4 col-start-2 text-xs text-gray-500">
                Enter numeric value only (e.g. 2500)
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="deposit" className="text-right text-sm">
                Deposit*
              </Label>
              <Input
                id="deposit"
                name="deposit"
                value={newContract.deposit}
                onChange={handleContractInputChange}
                placeholder="0.00"
                className="col-span-3 h-8 text-sm"
                required
              />
              <div className="col-span-4 col-start-2 text-xs text-gray-500">
                Enter numeric value only (e.g. 1250)
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="notes" className="text-right text-sm">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={newContract.notes}
                onChange={handleContractInputChange}
                placeholder="Any special requirements or notes"
                className="col-span-3 text-sm"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter className="justify-center gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsNewContractOpen(false)} className="h-8 text-sm">Cancel</Button>
            <Button onClick={handleCreateContract} className="h-8 text-sm">Create Contract</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Contract Dialog */}
      <Dialog open={isEditContractOpen} onOpenChange={setIsEditContractOpen}>
        <DialogContent className="sm:max-w-[450px] mx-auto p-4">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg">Edit Wedding Contract</DialogTitle>
            <DialogDescription className="text-xs">
              Update the details for this wedding contract. All fields are required.
            </DialogDescription>
          </DialogHeader>
          {currentContract && (
            <div className="grid gap-3 py-3">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="editClientName" className="text-right text-sm">
                  Client Name*
                </Label>
                <Input
                  id="editClientName"
                  value={currentContract.client}
                  onChange={(e) => setCurrentContract({...currentContract, client: e.target.value})}
                  className="col-span-3 h-8 text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="editDate" className="text-right text-sm">
                  Wedding Date*
                </Label>
                <Input
                  id="editDate"
                  type="text" 
                  value={currentContract.date}
                  onChange={(e) => setCurrentContract({...currentContract, date: e.target.value})}
                  className="col-span-3 h-8 text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="editLocation" className="text-right text-sm">
                  Location*
                </Label>
                <div className="col-span-3">
                  <Select
                    value={currentContract.location}
                    onValueChange={(value) => setCurrentContract({...currentContract, location: value})}
                    required
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder={currentContract.location} />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-sm">{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="editPackage" className="text-right text-sm">
                  Package*
                </Label>
                <div className="col-span-3">
                  <Select
                    value={currentContract.package}
                    onValueChange={(value) => setCurrentContract({...currentContract, package: value})}
                    required
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder={currentContract.package} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Luxury Bridal Package" className="text-sm">Luxury Bridal Package</SelectItem>
                      <SelectItem value="Premium Bridal & Bridal Party" className="text-sm">Premium Bridal & Bridal Party</SelectItem>
                      <SelectItem value="Full Bridal Experience" className="text-sm">Full Bridal Experience</SelectItem>
                      <SelectItem value="Basic Bridal Package" className="text-sm">Basic Bridal Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="editTotal" className="text-right text-sm">
                  Total Amount*
                </Label>
                <Input
                  id="editTotal"
                  value={currentContract.totalAmount}
                  onChange={(e) => setCurrentContract({...currentContract, totalAmount: e.target.value})}
                  className="col-span-3 h-8 text-sm"
                  required
                />
                <div className="col-span-4 col-start-2 text-xs text-gray-500">
                  Enter numeric value only (e.g. 2500)
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="editDeposit" className="text-right text-sm">
                  Deposit*
                </Label>
                <Input
                  id="editDeposit"
                  value={currentContract.deposit}
                  onChange={(e) => setCurrentContract({...currentContract, deposit: e.target.value})}
                  className="col-span-3 h-8 text-sm"
                  required
                />
                <div className="col-span-4 col-start-2 text-xs text-gray-500">
                  Enter numeric value only (e.g. 1250)
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="editPaymentStatus" className="text-right text-sm">
                  Payment Status
                </Label>
                <div className="col-span-3">
                  <Select
                    value={currentContract.paymentStatus}
                    onValueChange={(value) => setCurrentContract({...currentContract, paymentStatus: value})}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder={currentContract.paymentStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending" className="text-sm">Pending</SelectItem>
                      <SelectItem value="deposit paid" className="text-sm">Deposit Paid</SelectItem>
                      <SelectItem value="fully paid" className="text-sm">Fully Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="editContractStatus" className="text-right text-sm">
                  Contract Status
                </Label>
                <div className="col-span-3">
                  <Select
                    value={currentContract.contractStatus}
                    onValueChange={(value) => setCurrentContract({...currentContract, contractStatus: value})}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder={currentContract.contractStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending" className="text-sm">Pending</SelectItem>
                      <SelectItem value="signed" className="text-sm">Signed</SelectItem>
                      <SelectItem value="cancelled" className="text-sm">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="justify-center gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsEditContractOpen(false)} className="h-8 text-sm">Cancel</Button>
            <Button onClick={handleSaveContractChanges} className="h-8 text-sm">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Template Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[600px] mx-auto">
          <DialogHeader className="text-center">
            <DialogTitle>{currentTemplate} Preview</DialogTitle>
          </DialogHeader>
          <div className="max-h-[450px] overflow-y-auto border p-4 rounded-md">
            {currentTemplate === "Standard Contract" ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">A+ Ladies Salon Wedding Service Contract</h3>
                <p className="text-sm">This agreement is made between A+ Ladies Salon and the client for wedding beauty services.</p>
                <div>
                  <h4 className="font-semibold">Services Included:</h4>
                  <ul className="list-disc pl-5">
                    <li>Bridal makeup application</li>
                    <li>Bridal hair styling</li>
                    <li>1 trial session for makeup and hair</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Terms and Conditions:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>50% non-refundable deposit required to secure the date</li>
                    <li>Final payment due 7 days before the wedding date</li>
                    <li>Cancellations must be made in writing</li>
                    <li>Rescheduling subject to availability</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">A+ Ladies Salon Premium Wedding Service Contract</h3>
                <p className="text-sm">This premium agreement is made between A+ Ladies Salon and the client for comprehensive wedding beauty services.</p>
                <div>
                  <h4 className="font-semibold">Premium Services Included:</h4>
                  <ul className="list-disc pl-5">
                    <li>Bridal makeup application with premium products</li>
                    <li>Bridal hair styling with extensions if needed</li>
                    <li>Full bridal party makeup and hair services</li>
                    <li>2 trial sessions for makeup and hair</li>
                    <li>Touch-up kit for the bride</li>
                    <li>Extended service hours on the wedding day</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Premium Terms and Conditions:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>50% non-refundable deposit required to secure the date</li>
                    <li>Final payment due 14 days before the wedding date</li>
                    <li>Cancellations must be made in writing</li>
                    <li>Complimentary rescheduling available once if made 60+ days before</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="justify-center">
            <Button onClick={() => setIsPreviewOpen(false)} className="h-8 text-sm">Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditTemplateOpen} onOpenChange={setIsEditTemplateOpen}>
        <DialogContent className="sm:max-w-[600px] mx-auto">
          <DialogHeader className="text-center">
            <DialogTitle>Edit {currentTemplate}</DialogTitle>
            <DialogDescription className="text-xs">
              Modify the template content and terms for this contract type.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div>
              <Label htmlFor="templateTitle" className="font-medium text-sm">
                Template Title
              </Label>
              <Input
                id="templateTitle"
                value={currentTemplate}
                className="mt-1 h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="templateContent" className="font-medium text-sm">
                Contract Content
              </Label>
              <Textarea
                id="templateContent"
                className="mt-1 h-[250px] text-sm"
                defaultValue={
                  currentTemplate === "Standard Contract"
                    ? "This agreement is made between A+ Ladies Salon and the client for wedding beauty services.\n\nServices Included:\n- Bridal makeup application\n- Bridal hair styling\n- 1 trial session for makeup and hair\n\nTerms and Conditions:\n- 50% non-refundable deposit required to secure the date\n- Final payment due 7 days before the wedding date\n- Cancellations must be made in writing\n- Rescheduling subject to availability"
                    : "This premium agreement is made between A+ Ladies Salon and the client for comprehensive wedding beauty services.\n\nPremium Services Included:\n- Bridal makeup application with premium products\n- Bridal hair styling with extensions if needed\n- Full bridal party makeup and hair services\n- 2 trial sessions for makeup and hair\n- Touch-up kit for the bride\n- Extended service hours on the wedding day\n\nPremium Terms and Conditions:\n- 50% non-refundable deposit required to secure the date\n- Final payment due 14 days before the wedding date\n- Cancellations must be made in writing\n- Complimentary rescheduling available once if made 60+ days before"
                }
              />
            </div>
          </div>
          <DialogFooter className="justify-center gap-2">
            <Button variant="outline" onClick={() => setIsEditTemplateOpen(false)} className="h-8 text-sm">Cancel</Button>
            <Button onClick={handleSaveTemplate} className="h-8 text-sm">Save Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWeddings;
