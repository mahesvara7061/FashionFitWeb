import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
          {/* Logo and Description */}
          <div>
            <img src={assets.logo} className="mb-5 w-40" alt="Fashion Fit Logo" />
            <p className="w-full md:w-3/4 text-gray-600">
              First-ever online store for virtual fitting rooms. It's not just about clothes, but technology.
            </p>
            <p className="w-full md:w-3/4 text-gray-600 mt-2">
              We are a passionate team of students from HCMUS, creating a better experience for fashion enthusiasts.
            </p>
            <p className="w-full md:w-3/4 font-semibold text-gray-800 mt-4">We are Fashion Fit.</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-medium text-gray-800 mb-4 uppercase tracking-wide">Navigation</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/home" className="hover:text-gray-800 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/collection" className="hover:text-gray-800 transition">
                  Collection
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-800 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-800 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-medium text-gray-800 mb-4 uppercase tracking-wide">Contact Us</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:hcmus@student.edu.vn"
                  className="hover:text-gray-800 transition"
                >
                  hcmus@student.edu.vn
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-gray-800 transition"
                >
                  +1 234 567 890
                </a>
              </li>
              <li>Nguyen Van Cu, District 5, Ho Chi Minh City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-6 text-center text-gray-600 text-xs">
          <p>&copy; {new Date().getFullYear()} Fashion Fit. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy" className="hover:text-gray-800 transition">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms" className="hover:text-gray-800 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
