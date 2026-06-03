import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/RouteContext.jsx"; // Adjust path

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Show a blank dark screen or spinner while checking cookies
  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // If logged in, render the protected pages. If not, kick them to the login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
}