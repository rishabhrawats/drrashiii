import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks, doctorInfo } from '../data/mock';
import { Menu, X, Phone, Calendar, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (href) => {
    if (href.startsWith('/#')) {
      const element = document.getElementById(href.slice(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const forceTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-card-strong py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={forceTop} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-display font-bold text-lg">
              RA
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg font-semibold text-slate-800">
                Dr. Rashi Agrawal
              </p>
              <p className="text-xs text-slate-500">Radiation Oncologist</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('/#')) {
                    e.preventDefault();
                    scrollToSection(link.href);
                    forceTop();
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${doctorInfo.phone.replace(/\s/g, '')}`}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Phone size={18} />
              <span className="hidden lg:inline">Call Now</span>
            </a>
            <Link
              to="/book-appointment"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-card-strong border-t border-slate-200/50 shadow-xl">
            <nav className="flex flex-col p-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('/#')) {
                      e.preventDefault();
                      scrollToSection(link.href);
                      forceTop();
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                <a
                  href={`tel:${doctorInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-3 text-blue-600 font-medium border border-blue-200 rounded-xl hover:bg-blue-50"
                >
                  <Phone size={18} />
                  {doctorInfo.phone}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
