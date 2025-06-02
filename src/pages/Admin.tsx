
import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminBookings from "@/components/admin/AdminBookings";
import AdminStylists from "@/components/admin/AdminStylists";
import AdminPromotions from "@/components/admin/AdminPromotions";
import AdminWeddings from "@/components/admin/AdminWeddings";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminVans from "@/components/admin/AdminVans";

const Admin = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // For development/demo purposes: commented out the redirect
    // This allows access to the admin pages without authentication
    // In a production environment, you would want to uncomment this
    /*
    if (!isAuthenticated || !isAdmin) {
      navigate("/");
    }
    */
  }, [isAuthenticated, isAdmin, navigate]);

  // Remove this check to always render the admin interface
  // This is for development/demo purposes
  // In production, you would keep this check
  /*
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  */

  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/bookings" element={<AdminBookings />} />
        <Route path="/stylists" element={<AdminStylists />} />
        <Route path="/beauticians" element={<AdminStylists />} />
        <Route path="/promotions" element={<AdminPromotions />} />
        <Route path="/weddings" element={<AdminWeddings />} />
        <Route path="/payments" element={<AdminPayments />} />
        <Route path="/vans" element={<AdminVans />} />
        
        {/* Redirect root admin path to dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Default route for any other unmatched paths */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
