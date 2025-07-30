'use client';

import React, { useState } from 'react';
import Header from './Header';
import PortfolioUploadSection from './PortfolioUploadSection';
import ScreeningQuestions from './ScreeningQuestions';
import PasteLinksSection from './PasteLinksSection';
import ConsentFooter from './ConsentFooter';

export default function ApplyJobForm() {
  const [activeTab, setActiveTab] = useState<'resume' | 'portfolio' | 'saved'>('resume');

  return (
    <form className="max-w-4xl mx-auto p-6 space-y-10 bg-black text-white rounded-xl">
      <Header />
      <PortfolioUploadSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'saved' && <PasteLinksSection />}
      <ScreeningQuestions tab={activeTab} />

      <ConsentFooter />
    </form>
  );
}
