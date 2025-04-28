
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-8 border-t">
      <div className="nutriflow-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-nutriflow-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">NF</span>
              </div>
              <span className="font-bold text-xl text-nutriflow-dark">NutriFlow</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Your personal AI-powered nutrition tracker for healthier living.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-nutriflow-dark mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/meal-plan" className="text-gray-600 hover:text-nutriflow-primary text-sm">Meal Plans</Link></li>
              <li><Link to="/log-meal" className="text-gray-600 hover:text-nutriflow-primary text-sm">Meal Tracking</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-nutriflow-primary text-sm">Nutrition Analytics</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-nutriflow-dark mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-nutriflow-primary text-sm">Blog</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-nutriflow-primary text-sm">Nutrition Tips</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-nutriflow-primary text-sm">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-nutriflow-dark mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-nutriflow-primary text-sm">About Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-nutriflow-primary text-sm">Contact</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-nutriflow-primary text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            &copy; {currentYear} NutriFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
