'use client';

import React from 'react';
import Header from './Header';
import PortfolioUploadSection from './PortfolioUploadSection';
import ScreeningQuestions from './ScreeningQuestions';
import ConsentFooter from './ConsentFooter';


export default function ApplyJobForm() {
  return (
    <form className="max-w-4xl mx-auto p-6 space-y-10 bg-black text-white rounded-xl">
      <Header />
      <PortfolioUploadSection />
      <ScreeningQuestions />
      <ConsentFooter />
    </form>
  );
}
