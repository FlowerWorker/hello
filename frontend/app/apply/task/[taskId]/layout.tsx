'use client';

import React from 'react';
import Navbar from '@/app/components/layout/navbar'; // ✅ Top navbar

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


        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
