'use client';

import React from 'react';
import Navbar from '@/app/components/layout/navbar'; // ✅ Top navbar
import Navbar2 from '@/app/components/layout/navbar2'; // Uncomment if you have a sidebar component

export default function ApplyTaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Content area below navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (optional) */}
        <aside className="w-64 bg-gray-100 p-4 hidden md:block">
          {/* Sidebar content here */}
          <div className="text-gray-600 font-semibold">Sidebar</div>
          {/* You can replace this with <Sidebar /> if you have one */}
        </aside>

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
