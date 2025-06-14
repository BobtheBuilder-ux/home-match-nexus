
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HM</span>
              </div>
              <span className="text-xl font-poppins font-bold">HomeMatch</span>
            </div>
            <p className="text-neutral-300 mb-4">
              Connecting property seekers with landlords and agents. Your trusted partner in finding the perfect rental home.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-neutral-400 hover:text-primary-400 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-neutral-400 hover:text-primary-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-neutral-400 hover:text-primary-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-neutral-400 hover:text-primary-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Find Rentals</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">List Property</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">For Agents</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Safety Tips</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Report Issue</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-primary-400" />
                <span className="text-neutral-300">support@homematch.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-primary-400" />
                <span className="text-neutral-300">1-800-HOME-MATCH</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-primary-400" />
                <span className="text-neutral-300">123 Real Estate Ave, San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © 2024 HomeMatch. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
