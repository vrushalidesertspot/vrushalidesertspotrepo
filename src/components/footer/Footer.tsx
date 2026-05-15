import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-4xl">🎂</span>
              <span className="font-playfair text-2xl font-bold">Vrushali Desert Spot</span>
            </div>
            <p className="text-primary-cream/80 mb-6">
              Crafting sweet memories since 2010 at Vrushali Desert Spot. Premium quality cakes for every celebration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-primary-cream/10 rounded-full hover:bg-primary-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-primary-cream/10 rounded-full hover:bg-primary-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-primary-cream/10 rounded-full hover:bg-primary-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/cakes" className="text-primary-cream/80 hover:text-primary-gold transition-colors">
                  All Cakes
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-primary-cream/80 hover:text-primary-gold transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-primary-cream/80 hover:text-primary-gold transition-colors">
                  Custom Cakes
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-primary-cream/80 hover:text-primary-gold transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-primary-cream/80 hover:text-primary-gold transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary-gold" />
                <span className="text-primary-cream/80">
                  123 Baker Street, Sweet Town, ST 413401
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary-gold" />
                <span className="text-primary-cream/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary-gold" />
                <span className="text-primary-cream/80">
                  hello@vrushalidesertspot.com
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Business Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 flex-shrink-0 text-primary-gold" />
                <div>
                  <p className="text-primary-cream/80">Mon - Sat: 9:00 AM - 9:00 PM</p>
                  <p className="text-primary-cream/80">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-primary-cream/10 rounded-lg">
              <p className="text-sm text-primary-cream/80">
                🎁 Free delivery on orders above ₹999
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-cream/20 mt-12 pt-8 text-center">
          <p className="text-primary-cream/60 text-sm">
            © 2024 Vrushali Desert Spot. All rights reserved. Made with ❤️ for cake lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
