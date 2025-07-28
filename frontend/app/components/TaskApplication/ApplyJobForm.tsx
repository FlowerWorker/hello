"use client";

import React, { useState } from "react";

// Imports from your project structure
import InfoPageHeader from "../layout/InfoPageHeader";
import SectionComponent from "../layout/SectionComponent";
import { Button } from "../popup/TaskManagementProfile/components/common/Button";
import { FormField } from "../popup/TaskManagementProfile/components/settings/AccountSettings/FormField";

import FileUploader from "../upload/FileUploader";
import LinkInput from "./LinkInput";
import ScreeningQuestions from "./ScreeningQuestions";
import TermsCheckbox from "./TermsCheckbox";

export default function ApplyJobForm({ jobTitle }: { jobTitle: string }) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [supportingUrls, setSupportingUrls] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const screeningQuestions = [
    { id: "experience", question: "What experience do you have with e-commerce websites?" },
    { id: "years", question: "How many years of experience do you have in e-commerce design?" },
    { id: "availability", question: "What is your availability to start?" },
  ];

  const handleSubmit = () => {
    if (!resumeUrl) {
      alert("Uploading Resume is mandatory!");
      return;
    }
    if (!termsAccepted) {
      alert("Please accept terms & conditions.");
      return;
    }

    const applicationData = {
      resumeUrl,
      supportingUrls,
      links,
      answers,
    };

    console.log("Submitted Application Data:", applicationData);
    alert("Application Submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <InfoPageHeader title={`Apply: ${jobTitle}`} />

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">Submit Your Application</h2>
        <p className="text-gray-600">
          Upload your CV and answer the required questions to apply.
        </p>
      </div>


      {/* File Upload Section */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-lg">Resume and Supporting Documents</h3>

        <FileUploader
          label="Upload Your Resume (Required)"
          onUploadComplete={(urls) => setResumeUrl(urls[0])}
        />

        <FileUploader
          label="Upload Portfolio or Supporting Files (Optional)"
          multiple
          onUploadComplete={setSupportingUrls}
        />

        <LinkInput links={links} setLinks={setLinks} />
      </div>

      <ScreeningQuestions
        questions={screeningQuestions}
        answers={answers}
        setAnswers={setAnswers}
      />

      <TermsCheckbox checked={termsAccepted} onChange={setTermsAccepted} />

      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Application
        </Button>
      </div>
    </div>
  );
}
