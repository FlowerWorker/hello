import React from "react";
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { Footer, Navbar , InfoPageHeader} from "./layout";

const PrivacyPolicy = () => {
    return (
        <div className="w-full bg-bgdarkv1 text-white text-base overflow-x-hidden">
          <header className="relative z-30">
            <Navbar className="z-40" />
          </header>
          <main className="flex flex-col w-full max-w-[1920px] mx-auto h-auto px-[2%] md:px-[12%] py-0 md:py-[80px] gap-8 md:gap-[64px]">
            
            <div className="container mx-auto">
              <InfoPageHeader title="Privacy Policy" />
            </div>
  
            
            <div className="flex flex-col h-auto px-4 gap-8 md:gap-[80px]">
                <p className="font-open-sans text-sm md:text-2xl">
                    We at FlowerWorker value your privacy and are committed to protecting the personal information you share with us.<br></br>
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform,
                    including project management, recruitment, and payment functionalities.<br></br><br></br>
                    By accessing or using FlowerWorker, you agree to the practices described in this Privacy Policy.
                </p>
  
                {/* Data gathering */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Information We Collect</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            We may collect the following types of personal information:
                        </p>
                    </div>
                    <ul className="text-sm md:text-base font-open-sans list-disc pl-6 mt-4">
                        <li>Personal Identification Information: Name, Email address, Contact details (phone number, address, etc.).</li>
                        <li>Employment and Recruitment Information: Resumes/CVs, Work experience and professional background, Skills, certifications, and references.</li>
                        <li>Account Information: Username and password, Profile photo (optional).</li>
                        <li>Payment Information: Billing address, Payment details (e.g., credit card information or payment processor details).</li>
                        <li>Usage Data: IP address, Device type and browser information, Usage statistics and interaction data.</li>
                    </ul>
                </section>
  
                {/* Data usage */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">How We Use Your Information</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            We use the information we collect to:
                        </p>
                    </div>
                    <ul className="text-sm md:text-base font-open-sans list-disc pl-6 mt-4">
                        <li>Provide, operate, and maintain our platform.</li>
                        <li>Facilitate recruitment, project management, and payment processing.</li>
                        <li>Communicate with you, including responding to inquiries or sending notifications.</li>
                        <li>Enhance user experience through personalized content and recommendations.</li>
                        <li>Improve the platform and conduct analytics.</li>
                        <li>Enforce our terms and conditions and comply with legal obligations.</li>
                    </ul>
                </section>

                {/* Sharing your information */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Sharing Your Information</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            We may share your personal information in the following circumstances:
                        </p>
                    </div>
                    <ul className="text-sm md:text-base font-open-sans list-disc pl-6 mt-4">
                        <li>With Employers and Recruiters: To facilitate recruitment and job matching.</li>
                        <li>Service Providers: To support payment processing, email delivery, analytics, and other operational services.</li>
                        <li>Legal Compliance: If required by law, regulation, or legal process.</li>
                        <li>Business Transfers: In the event of a merger, sale, or acquisition.</li>
                    </ul>
                    <p className="text-sm md:text-base font-open-sans">
                        We will never sell your information to third parties for marketing purposes.
                    </p>
                </section>

                {/* Data Security */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Data Security</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            We implement industry-standard security measures to protect your information. These include encryption, firewalls, and secure server storage.
                            However, no system is completely secure, and we cannot guarantee the absolute safety of your data.
                        </p>
                    </div>
                </section>

                {/* Your rights */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Your Rights</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            Depending on your location, you may have the following rights regarding your personal information:
                        </p>
                    </div>
                    <ul className="text-sm md:text-base font-open-sans list-disc pl-6 mt-4">
                        <li>Access and request copies of your data.</li>
                        <li>Correct or update inaccurate information.</li>
                        <li>Request deletion of your personal information.</li>
                        <li>Restrict or object to processing.</li>
                        <li>Withdraw consent where processing is based on consent.</li>
                    </ul>
                    <p className="text-sm md:text-base font-open-sans">
                        To exercise these rights, contact us at info@flowerworker.com
                    </p>
                </section>
  
                {/* Cookies and Tracking and Children's Privacy */}
                <div className="flex flex-col md:flex-row gap-7 md:gap-28 relative">
                    <div className="flex-1 max-w-sm">
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Cookies and Tracking</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            We use cookies and similar technologies to improve user experience and collect usage data.
                             You can control cookies through your browser settings.
                        </p>
                    </div>
                    
                    {/* Divider*/}
                    <div className="md:flex items-center justify-center hidden">
                        <div className="h-[1px] w-[80%] md:h-[80%] md:w-[1px] bg-[#C5C1BB]"></div>
                    </div>
    
                    <div className="flex-1 max-w-sm">
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Children&apos;s Privacy</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            FlowerWorker is not intended for use by children under 16, and we do not knowingly collect information from them.
                        </p>
                    </div>
                </div>
    
                {/* Retention of Data and Third-Party Links */}
                <div className="flex flex-col md:flex-row gap-7 md:gap-28 relative">
                    <div className="flex-1 max-w-sm">
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Retention of Data</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy,
                            comply with legal obligations, resolve disputes, and enforce agreements.
                        </p>
                    </div>
    
                    {/* Divider*/}
                    <div className="md:flex items-center justify-center hidden">
                        <div className="h-[1px] w-[80%] md:h-[80%] md:w-[1px] bg-[#C5C1BB]"></div>
                    </div>
    
                    <div className="flex-1 max-w-sm">
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Third-Party Links</h2>
                        <p className="text-sm md:text-base font-open-sans">
                            Our platform may contain links to third-party websites or services. We are not responsible for their privacy practices, 
                            and we encourage you to review their privacy policies before sharing your information.
                        </p>
                    </div>
                </div>
  
                {/* Changes to This Policy */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="md:text-2xl font-bold font-montserrat mb-4">Changes to This Policy</h2>
                        <p className="text-sm md:text-base font-open-sans">
                        We may update this Privacy Policy to reflect changes in our practices or legal requirements.
                         Updates will be posted with the &quot;Effective Date&quot; at the top.
                        </p>
                    </div>
                </section>
  
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

export default PrivacyPolicy