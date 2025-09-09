import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-rose-200 pt-12 pb-8 text-gray-600 text-sm">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

        {/* Branding */}
        <div>
          <p className="text-pink-500 text-lg font-bold mb-2">StyleNest</p>
          <p>&copy; 2025 StyleNest. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="font-semibold mb-2">Quick Links</p>
          <ul className="space-y-1">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <p className="font-semibold mb-2">Connect with Us</p>
          <div className="flex justify-center md:justify-start gap-4 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            <a href="mailto:support@stylenest.com"><Mail size={20} /></a>
          </div>
          <p>Email: support@stylenest.com</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
