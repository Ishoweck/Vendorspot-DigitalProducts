import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold font-display">Vendorspot</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Nigeria's most secure online marketplace for digital products.
              Safe, stress-free buying and selling with instant delivery.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  Digital Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  Vendors
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-500" />
                <span className="text-neutral-400 text-sm">
                  support@vendorspot.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-500" />
                <span className="text-neutral-400 text-sm">
                  +234 123 456 7890
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span className="text-neutral-400 text-sm">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2024 Vendorspot. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
