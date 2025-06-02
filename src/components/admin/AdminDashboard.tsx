
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, DollarSign, Users, Truck, Percent, Tag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Mock data
  const statCards = [
    {
      title: "Total Bookings",
      value: "156",
      change: "+12% from last month",
      icon: <Calendar className="h-8 w-8 text-salon-purple" />,
      background: "bg-salon-pink/10",
      linkTo: "/admin/bookings"
    },
    {
      title: "Active Beauticians",
      value: "8",
      change: "+2 this month",
      icon: <Users className="h-8 w-8 text-salon-purple" />,
      background: "bg-salon-pink/10",
      linkTo: "/admin/stylists"
    },
    {
      title: "Revenue",
      value: "$24,580",
      change: "+18% from last month",
      icon: <DollarSign className="h-8 w-8 text-salon-purple" />,
      background: "bg-salon-pink/10",
      linkTo: "/admin/payments"
    },
    {
      title: "Active Discounts",
      value: "3",
      change: "50+ redemptions",
      icon: <Percent className="h-8 w-8 text-salon-purple" />,
      background: "bg-salon-pink/10",
      linkTo: "/admin/promotions"
    }
  ];

  // Mock upcoming bookings with location information
  const upcomingBookings = [
    {
      id: "BK-1234",
      client: "Fatima Ahmed",
      service: "Bridal Makeup",
      stylist: "Layla Mohammed",
      date: "May 2, 2025",
      time: "10:00 AM",
      status: "confirmed",
      vanAssigned: true,
      van: "GlamVanLuxury",
      location: "New Cairo, Rehab City"
    },
    {
      id: "BK-1235",
      client: "Mariam Khalid",
      service: "Hair & Nails",
      stylist: "Nora Abdullah",
      date: "May 3, 2025",
      time: "2:30 PM",
      status: "confirmed",
      vanAssigned: false,
      van: null,
      location: "Cairo, Maadi"
    },
    {
      id: "BK-1236",
      client: "Sara Ali",
      service: "Full Glam Package",
      stylist: "Aisha Hassan",
      date: "May 4, 2025",
      time: "11:15 AM",
      status: "pending",
      vanAssigned: true,
      van: "GlamVanLuxury",
      location: "Giza, Sheikh Zayed"
    }
  ];

  // Mock van assignments needed
  const vanAssignmentsNeeded = 2;
  
  // Mock contracts needing approval
  const contractsNeedingApproval = 1;
  
  // Mock pending promotions
  const pendingPromotions = 2;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link to={stat.linkTo} key={index} className="block">
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.background} p-2 rounded-md`}>
                    {stat.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Van Assignments Alert */}
      {vanAssignmentsNeeded > 0 && (
        <Card className="border-none shadow-md border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-yellow-700">
                  <Truck className="mr-2 h-5 w-5" />
                  Van Assignments Required
                </CardTitle>
                <CardDescription>
                  {vanAssignmentsNeeded} bookings need van assignments for upcoming appointments
                </CardDescription>
              </div>
              <Button asChild>
                <Link to="/admin/vans">Assign Vans</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Upcoming Bookings */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Recently scheduled appointments that need attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 border-b">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Stylist</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Van</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {upcomingBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium">
                      {booking.id}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {booking.client}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {booking.service}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {booking.stylist}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {booking.date} at {booking.time}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-salon-purple" />
                        {booking.location}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {booking.vanAssigned ? (
                        <span className="text-green-600 flex items-center">
                          <Truck className="h-3 w-3 mr-1" />
                          {booking.van}
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center">
                          Not assigned
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Link to="/admin/bookings" className="text-salon-purple hover:underline text-sm">View all bookings →</Link>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-salon-purple" />
              Van Assignments
            </CardTitle>
            <CardDescription>Assign van to upcoming bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{vanAssignmentsNeeded} bookings need van assignment</p>
          </CardContent>
          <CardFooter>
            <Link to="/admin/vans" className="text-salon-purple hover:underline text-sm">Manage assignments →</Link>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="h-5 w-5 mr-2 text-salon-purple" />
              Discount Codes
            </CardTitle>
            <CardDescription>Manage active promotions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{pendingPromotions} new promotions ready to activate</p>
          </CardContent>
          <CardFooter>
            <Link to="/admin/promotions" className="text-salon-purple hover:underline text-sm">Manage promotions →</Link>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-salon-purple" />
              Wedding Contracts
            </CardTitle>
            <CardDescription>Manage upcoming wedding bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{contractsNeedingApproval} contract needs approval</p>
          </CardContent>
          <CardFooter>
            <Link to="/admin/weddings" className="text-salon-purple hover:underline text-sm">Process contracts →</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
