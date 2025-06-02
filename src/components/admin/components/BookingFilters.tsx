
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar as CalendarIcon } from "lucide-react";

interface BookingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  paymentFilter: string;
  setPaymentFilter: (payment: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
}

const BookingFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  paymentFilter,
  setPaymentFilter,
  dateFilter,
  setDateFilter,
}: BookingFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Search by client, date, service..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Status filter */}
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
          <SelectItem value="unassigned">Unassigned</SelectItem>
        </SelectContent>
      </Select>

      {/* Payment status filter */}
      <Select value={paymentFilter} onValueChange={setPaymentFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by payment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payments</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="not paid">Not Paid</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
        </SelectContent>
      </Select>
      
      {/* Date filter */}
      <div className="relative">
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          type="date" 
          className="pl-10"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BookingFilters;
