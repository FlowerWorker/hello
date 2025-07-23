import React, { useState } from 'react';
import { ChevronDown,Twitter,Linkedin,Instagram, LinkedinIcon } from 'lucide-react';
import InstagramIcon from '@/app/components/icons/InstagramIcon';

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR €');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const languages = ['English (US)', 'Shqip', 'Français', 'Deutsch', 'Español'];
  const currencies = ['EUR €', 'USD $', 'GBP £'];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-semibold text-lg text-gray-900">Gaddr Jobs</span>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <div className="w-6 h-6"> <Twitter/>  </div>
              <div className="w-6 h-6"> <LinkedinIcon/> </div>
              <div className="w-6 h-6"> <InstagramIcon/>  </div>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Overview</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Solutions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Status</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Security</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © 2025 Gadr Jobs. All rights reserved.
          </div>

          {/* Language and Currency Selectors */}
          <div className="flex space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="text-sm">{selectedLanguage}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-40 z-10">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="text-sm">{selectedCurrency}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCurrencyOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-24 z-10">
                  {currencies.map((currency) => (
                    <button
                      key={currency}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setIsCurrencyOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;