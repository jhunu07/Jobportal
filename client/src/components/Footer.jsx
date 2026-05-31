import React, { useState } from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [logoError, setLogoError] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Jobs", href: "#job-list" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: assets.facebook_icon },
    { name: "Twitter", icon: assets.twitter_icon },
    { name: "LinkedIn", icon: assets.linkedin_icon },
  ];

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .footer-col {
          animation: slideInUp 0.6s ease-out forwards;
        }
        .link-item {
          position: relative;
          transition: all 0.3s ease;
        }
        .link-item::before {
          content: '';
          position: absolute;
          left: -8px;
          width: 3px;
          height: 0;
          background: linear-gradient(180deg, #3b82f6, #2563eb);
          transition: height 0.3s ease;
        }
        .link-item:hover::before {
          height: 100%;
        }
        .link-item:hover {
          color: #2563eb;
          padding-left: 8px;
        }
        .social-icon {
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          transform: translateY(-5px) scale(1.1);
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
      `}</style>

      <footer className="bg-gradient-to-b from-white to-gray-50 mt-20 border-t border-gray-200">
        {/* Main Footer Content */}
        <div className="container 2xl:px-20 mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Column 1: Brand & Mission */}
            <div className="footer-col" style={{ animationDelay: "0s" }}>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  {!logoError && assets.logo ? (
                    <img
                      src={assets.logo}
                      alt="JobPortal"
                      className="h-10 w-auto"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      JP
                    </div>
                  )}
                 
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Empowering careers, connecting talent with opportunity. Your journey to success starts here.
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 font-semibold">Follow Us</p>
                <div className="flex gap-3 mt-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="social-icon w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:border-blue-500"
                      title={social.name}
                    >
                      <img src={social.icon} alt={social.name} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="footer-col" style={{ animationDelay: "0.1s" }}>
              <h3 className="font-black text-lg text-gray-900 mb-8">Navigation</h3>
              <ul className="space-y-4">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="link-item text-gray-700 text-sm font-semibold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="footer-col" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-black text-lg text-gray-900 mb-8">Support</h3>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Email</p>
                    <a href="mailto:support@jobportal.com" className="text-sm text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                      support@jobportal.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.26.559.934 1.42 2.513 2.99 1.579 1.579 2.431 2.252 2.99 2.513l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986v2.153a1 1 0 01-1 1h-2C5.77 19 2 15.23 2 10.5V3z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Phone</p>
                    <a href="tel:+15551234567" className="text-sm text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="footer-col" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-black text-lg text-gray-900 mb-8">Newsletter</h3>
              <p className="text-gray-700 text-sm font-medium mb-4">
                Get latest job opportunities delivered to your inbox
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Subscribe Now
                </button>
              </form>
              <p className="text-xs text-gray-600 mt-3">
                ✓ No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-700 font-semibold">
                © {new Date().getFullYear()} JobPortal. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Connecting talent with opportunity worldwide
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-xs text-gray-700 font-semibold">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
