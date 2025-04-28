
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="nutriflow-container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-nutriflow-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">NF</span>
          </div>
          <span className="font-bold text-xl text-nutriflow-dark">NutriFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-nutriflow-dark hover:text-nutriflow-primary transition-colors">Home</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-nutriflow-dark hover:text-nutriflow-primary transition-colors">Dashboard</Link>
              <Link to="/meal-plan" className="text-nutriflow-dark hover:text-nutriflow-primary transition-colors">Meal Plan</Link>
              <Link to="/log-meal" className="text-nutriflow-dark hover:text-nutriflow-primary transition-colors">Log Meal</Link>
              <Link to="/profile" className="text-nutriflow-dark hover:text-nutriflow-primary transition-colors">Profile</Link>
              <Button onClick={handleLogout} variant="outline" className="border-nutriflow-primary text-nutriflow-primary hover:bg-nutriflow-primary hover:text-white">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-nutriflow-primary text-nutriflow-primary hover:bg-nutriflow-primary hover:text-white">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-nutriflow-primary text-white hover:bg-nutriflow-dark">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-nutriflow-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 bg-white border-t mt-4 animate-fade-in">
          <div className="nutriflow-container flex flex-col space-y-4">
            <Link to="/" className="text-nutriflow-dark hover:text-nutriflow-primary px-4 py-2 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-nutriflow-dark hover:text-nutriflow-primary px-4 py-2 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/meal-plan" className="text-nutriflow-dark hover:text-nutriflow-primary px-4 py-2 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Meal Plan</Link>
                <Link to="/log-meal" className="text-nutriflow-dark hover:text-nutriflow-primary px-4 py-2 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Log Meal</Link>
                <Link to="/profile" className="text-nutriflow-dark hover:text-nutriflow-primary px-4 py-2 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                <Button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="bg-nutriflow-primary text-white w-full">Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="border-nutriflow-primary text-nutriflow-primary w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="bg-nutriflow-primary text-white w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
