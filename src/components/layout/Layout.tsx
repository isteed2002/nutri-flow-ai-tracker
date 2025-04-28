
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, requireAuth = false }) => {
  const { isLoggedIn } = useUser();

  // Redirect if authentication is required but user is not logged in
  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
