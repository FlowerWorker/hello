"use client";
import React from 'react';
import Image from 'next/image';
import { Search, Zap, Mail, Phone, Bell, User, Home } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../app/public/gaddr_logo.png';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="rounded-lg">
              <Image 
                src={logo} 
                alt="gaddr-logo" 
                width={150} 
                height={50} 
                className="inline-block mr-2" 
              />
            </div>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Default"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
         
            

            {/* Contact Icons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-black transition-colors">
                <Home size={20} />
              </button>
              <button className="p-2 text-black transition-colors">
               <Mail size={20} />
              </button>
            </div>

            {/* Notifications */}
            <button className="p-2 text-black  transition-colors relative">
              <Bell size={20} />
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;