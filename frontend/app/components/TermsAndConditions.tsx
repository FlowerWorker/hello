import React from "react";
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { Footer, Navbar , InfoPageHeader} from "./layout";

const TermsAndConditions = () => {
    return (
      <div className="w-full bg-bgdarkv1 text-white text-base overflow-x-hidden">
        <header className="relative z-30">
          <Navbar className="z-40" />
        </header>
        <main className="flex flex-col w-full max-w-[1920px] mx-auto h-auto px-[2%] md:px-[12%] py-0 md:py-[80px] gap-8 md:gap-[64px]">
          
          <div className="container mx-auto">
            <InfoPageHeader title="Terms & Conditions" />
          </div>

          
          <div className="flex flex-col h-auto px-4 gap-7 md:gap-[80px]">
            <p className="font-open-sans text-sm md:text-2xl">
              Welcome to FlowerWorker. These Terms and Conditions (&quot;Terms&quot;) govern
              your use of our platform, including project management, recruitment, and
              payment services. By accessing or using FlowerWorker, you agree to comply
              with these Terms. If you do not agree, you may not use the platform.
            </p>

            {/* Acceptance of Terms and Eligibility */}
            <div className="flex flex-col md:flex-row gap-7 md:gap-56 ">
              <div className="flex-1 max-w-sm">
                <h2 className="md:text-2xl font-bold font-montserrat mb-4">Acceptance of Terms</h2>
                <p className="text-sm md:text-base font-open-sans">
                  By creating an account or using FlowerWorker, you agree to these
                  Terms and our Privacy Policy. We reserve the right to update or
                  modify these Terms at any time. Continued use of the platform after
                  changes signifies your acceptance of the updated Terms.
                </p>
              </div>

              <div className="flex-1 max-w-sm">
                <h2 className="sm:text-lg md:text-2xl font-bold font-montserrat mb-4">Eligibility</h2>
                <p className="text-sm md:text-base font-open-sans">
                  You must be at least 18 years old and have the legal capacity to
                  enter into binding agreements to use FlowerWorker. If you are using
                  the platform on behalf of a company, you represent that you are
                  authorized to bind that entity to these Terms.
                </p>
              </div>
            </div>

            {/* User Accounts */}
            <section className="flex flex-col max-w-2xl gap-6">
              <h2 className="md:text-2xl font-bold font-montserrat">User Accounts</h2>
              <ul className="text-sm md:text-base flex flex-col list-disc pl-6 gap-2">
                <li className="">
                  <h3 className="font-open-sans">Account Creation</h3>
                  <p className="font-open-sans">
                    You must provide accurate, complete, and current information
                    during registration.<br/>
                    You are responsible for maintaining the confidentiality
                    of your account credentials.
                  </p>
                </li>
                <li>
                  <h3 className="font-open-sans">Account Responsibility</h3>
                  <p className="font-open-sans">
                    You are responsible for all activities that occur under your account.<br/>
                    Notify us immediately of any unauthorized use of your account.
                  </p>
                </li>
              </ul>
              
            </section>

            {/* Use of the Platform */}
            <section className="flex flex-col gap-6">
              <div>
                <h2 className="md:text-2xl font-bold font-montserrat mb-4">Use of the Platform</h2>
                <p className="text-sm md:text-base font-open-sans">
                  You agree to use FlowerWorker only for lawful purposes and in compliance
                  with these Terms. Prohibited activities include but are not limited to:
                </p>
              </div>
              <ul className="text-sm md:text-base font-open-sans list-disc pl-6 mt-4">
                <li>Posting false or misleading information.</li>
                <li>Using the platform for unauthorized commercial purposes.</li>
                <li>Uploading malicious software or files.</li>
                <li>Engaging in harassment, discrimination, or illegal activities.</li>
              </ul>
            </section>

            {/* Recruitment and Project Management */}
            <section className="flex flex-col gap-6">
              <h2 className="md:text-2xl font-bold font-montserrat">Recruitment and Project Management</h2>
              <ul className="text-sm md:text-base list-disc pl-6">
                <li>
                  <h3 className="font-open-sans">For Employers and Recruiters</h3>
                  <p className="font-open-sans">
                    Employers and recruiters are solely responsible for the accuracy of
                    job postings and recruitment activities.<br/> FlowerWorker does not
                    guarantee the suitability of candidates or the success of hiring
                    processes.
                  </p>
                </li>
                <li>
                  <h3 className="font-open-sans mt-4">For Job Seekers</h3>
                  <p className="font-open-sans">
                    Job seekers are responsible for ensuring the accuracy of resumes,
                    profiles, and other submitted information.<br/> FlowerWorker does not
                    guarantee employment opportunities or outcomes.
                  </p>
                </li>
              </ul>
            </section>

            {/* Payment and Billing */}
            <section className="flex flex-col gap-6">
              <h2 className="md:text-2xl font-bold font-montserrat">Payment and Billing</h2>
              <ul className="text-sm md:text-base list-disc pl-6">
                <li>
                  <h3 className="font-open-sans">Payment Processing</h3>
                  <p className="font-open-sans">
                    All payments are processed securely through our third-party payment
                    providers.<br/> You are responsible for ensuring accurate payment information.
                  </p>
                </li>
                <li>
                  <h3 className="font-open-sans mt-4">Refunds and Disputes</h3>
                  <p className="font-open-sans">
                    Refunds, if applicable, will be processed in accordance with our refund
                    policy.<br/> Payment disputes must be reported within 30 days of the
                    transaction.
                  </p>
                </li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="flex flex-col gap-6 max-w-6xl">
              <h2 className="md:text-2xl font-bold font-montserrat">Intellectual Property</h2>
              
              <ul className="text-sm md:text-base list-disc pl-6">
                <li>
                  <h3 className="font-open-sans">Platform Content</h3>
                  <p className="font-open-sans">
                    All content on the platform, including logos, text, graphics, and
                    software, is the property of FlowerWorker or its licensors.<br/> You
                    may not copy, modify, distribute, or reproduce platform content
                    without our explicit consent.
                  </p>
                </li>
                <li>
                  <h3 className="font-open-sans mt-4">User Content</h3>
                  <p className="font-open-sans">
                    You retain ownership of content you upload to the platform but grant
                    us a non-exclusive, royalty-free license to use, display, and
                    distribute such content for platform operations.
                  </p>
                </li>
              </ul>
            </section>

            {/* Limitation of Liability and Disclaimers */}
            <div className="flex flex-col md:flex-row gap-7 md:gap-28 relative">
              <div className="flex-1 max-w-sm">
                <h2 className="md:text-2xl font-bold font-montserrat mb-4">Limitation of Liability</h2>
                <p className="text-sm md:text-base font-open-sans">
                  To the fullest extent permitted by law, FlowerWorker is not liable for:
                  <br/> indirect, incidental, or consequential damages. Loss of data, 
                  employment opportunities, or revenue.<br/> Errors, interruptions, or 
                  failures of the platform.
                </p>
              </div>
                
              {/* Divider*/}
              <div className="flex items-center justify-center">
                <div className="h-[1px] w-[80%] md:h-[80%] md:w-[1px] bg-[#C5C1BB]"></div>
              </div>

              <div className="flex-1 max-w-sm">
                <h2 className="md:text-2xl font-bold font-montserrat mb-4">Disclaimers</h2>
                <p className="text-sm md:text-base font-open-sans">
                  FlowerWorker is provided &quot;as-is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that the platform will meet your expectations or be error-free.
                </p>
              </div>
            </div>

            {/* Divider for mobile only*/}
            <div className="flex items-center justify-center md:hidden">
              <div className="h-[1px] w-[80%] md:h-[80%] md:w-[1px] bg-[#C5C1BB]"></div>
            </div>

            {/* Termination and Governing Law */}
            <div className="flex flex-col md:flex-row gap-7 md:gap-28 relative">
              <div className="flex-1 max-w-sm">
                <h2 className="md:text-2xl font-bold font-montserrat mb-4">Termination</h2>
                <p className="text-sm md:text-base font-open-sans">
                  We reserve the right to suspend or terminate your account or access
                  to the platform at our sole discretion, with or without notice, for
                  violations of these Terms or other reasons.
                </p>
              </div>

              {/* Divider*/}
              <div className="flex items-center justify-center">
                <div className="h-[1px] w-[80%] md:h-[80%] md:w-[1px] bg-[#C5C1BB]"></div>
              </div>

              <div className="flex-1 max-w-sm">
                <h2 className="md:text-2xl font-bold font-montserrat mb-4">Governing Law</h2>
                <p className="text-sm md:text-base font-open-sans">
                  These Terms are governed by and construed in accordance with the laws
                  of [Insert Jurisdiction], without regard to its conflict of law
                  principles.
                </p>
              </div>
            </div>

            {/* Divider for mobile only*/}
            <div className="flex items-center justify-center md:hidden">
              <div className="h-[1px] w-[80%] md:h-[80%] md:w-[1px] bg-[#C5C1BB]"></div>
            </div>

            {/* Miscellaneous and Dispute Resolution */}
            <div className="flex flex-col md:flex-row gap-7 md:gap-28 relative">
                <div className="flex-1 max-w-sm">
                  <h2 className="md:text-2xl font-bold font-montserrat mb-4">Miscellaneous</h2>
                  <p className="text-sm md:text-base font-open-sans">
                    Severability: If any provision of these Terms is found invalid, the
                    remaining provisions will remain enforceable.<br />
                    No Waiver: Failure to enforce any provision of these Terms does not
                    constitute a waiver of that right.<br />
                    Entire Agreement: These Terms, along with our Privacy Policy,
                    constitute the entire agreement between you and FlowerWorker.
                  </p>
                </div>
              
              {/* Divider*/}
              <div className="flex items-center justify-center">
                <div className="h-[1px] w-[80%] md:h-[80%] md:w-[1px] bg-[#C5C1BB]"></div>
              </div>
              
              <div className="flex-1 max-w-sm">
                <h2 className="md:text-2xl font-bold font-montserrat mb-4">Dispute Resolution</h2>
                <p className="text-sm md:text-base font-open-sans">
                  Any disputes arising from these Terms will be resolved through mediation
                  or arbitration in [Insert Location]. If mediation fails, disputes may
                  be brought before the courts of [Insert Jurisdiction].
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <section className="flex flex-col gap-6">
              <h2 className="md:text-2xl font-bold font-montserrat">Contact us</h2>
              <div className="flex flex-col md:flex-row md:gap-10 gap-2">
                {/* Email */}
                <div className="flex items-center gap-3 text-base">
                  <FaEnvelope className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  <p className="text-sm md:text-base">Info@flowerworker.com</p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-base">
                  <FaMapMarkerAlt className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  <p className="text-sm md:text-base">Gothenburg &amp; Stockholm</p>
                </div>
              </div>
            </section>

            
          </div>
        </main>
        
        {/* Acknowledgment */}
        <section className="w-full max-w-[1920px] mx-auto h-auto px-[2%] md:px-[12%] py-[16px]">
          <p className="text-xs md:text-base font-open-sans text-right">By using FlowerWorker, you acknowledge that you have read and understood this Privacy Policy.</p>
        </section>
        
        <footer>
          <Footer />
        </footer>

      </div>
    );
  }

  export default TermsAndConditions;