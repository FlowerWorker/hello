import TabNavigation from '../components/contactUs/TabNavigation';
import styles from '../styles/PrivacyPolicy.module.css';
import NewsletterAndFooter from '../components/contactUs/NewsletterAndFooter';
import Link from "next/link";
import Image from "next/image";
import privacyMail from "@/app/public/privacyMail.png";
import privacyLocation from  "@/app/public/privacylocation.png"
export default function PrivacyPolicy() {
  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h1>Privacy Policy</h1>
          <TabNavigation />
        </div>
        <div className={styles.section}>
          <p>We at FlowerWorker values your privacy and are committed to protecting the personal information you share with us.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including project management, recruitment, and payment functionalities.</p><br></br>

          <p>By accessing or using FlowerWorker, you agree to the practices described in this Privacy Policy.</p>
        </div>
        <div className={styles.section}>
          <h2>Information We Collect</h2>
          <p>We may collect the following types of personal information:</p><br></br>
          <ul>
            <li>Personal Identification Information: Name, Email address, Contact details (phone number, address, etc.).</li>
            <li>Employment and Recruitment Information: Resumes/CVs, Work experience and professional background, Skills, certifications, and references.</li>
            <li>Account Information: Username and password, Profile photo (optional).</li>
            <li>Payment Information: Billing address, Payment details (e.g., credit card information or payment processor details).</li>
            <li>Usage Data: IP address, Device type and browser information, Usage statistics and interaction data. </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p><br></br>
          <ul>
           <li>Provide, operate, and maintain our platform.</li>
           <li>Facilitate recruitment, project management, and payment processing.</li>
           <li>Communicate with you, including responding to inquiries or sending notifications.</li>
           <li>Enhance user experience through personalized content and recommendations.</li>
           <li>Improve the platform and conduct analytics.</li>
           <li>Enforce our terms and conditions and comply with legal obligations.</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Sharing Your Information</h2>
          <p>We may share your personal information in the following circumstances:</p><br></br>
          <ul>
            <li>With Employers and Recruiters: To facilitate recruitment and job matching.</li>
            <li>Service Providers: To support payment processing, email delivery, analytics, and other operational services.</li>
            <li>Legal Compliance: If required by law, regulation, or legal process.</li>
            <li>Business Transfers: In the event of a merger, sale, or acquisition.</li>
          </ul><br></br>
          <p> We will never sell your information to third parties for marketing purposes.</p>
        </div>
        <div className={styles.section}>
          <h2>Data Security</h2>
          <p>We implement industry-standard security measures to protect your information. These include encryption, firewalls, and secure server storage. However, no system is completely secure, and we cannot guarantee the absolute safety of your data.</p>
        </div>
        <div className={styles.section}>
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p><br></br>
          <ul>
            <li>Access and request copies of your data.  </li>
            <li>Correct or update inaccurate information.  </li>
            <li>Request deletion of your personal information.  </li>
            <li>Restrict or object to processing.  </li>
            <li>Withdraw consent where processing is based on consent.  </li>
          </ul><br></br>
          <p>To exercise these rights, contact us at{' '}
          <span style={{ color: '#BD71D4' }}>
           info@flowerworker.com
          </span>
      .   </p>
        </div>
        <div className={styles.cookiessection}>
           <div className={styles.boxsection}>
            <h2>Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to improve user experience and collect usage data. You can control cookies through your browser settings.</p>
           </div>
           <div className={styles.verticalLine}>
           </div>
           <div className={styles.boxsection}>
            <h2>Children's Privacy</h2>
            <p>FlowerWorker is not intended for use by children under 16, and we do not knowingly collect information from them.</p>
           </div>
        </div>
        <div className={styles.cookiessection}>
           <div className={styles.boxsection}>
            <h2>Retention of Data</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements.</p>
           </div>
           <div className={styles.verticalLine}>
           </div>

           <div className={styles.boxsection}>
            <h2>Third-Party Links</h2>
            <p>Our platform may contain links to third-party websites or services. We are not responsible for their privacy practices, and we encourage you to review their privacy policies before sharing your information.</p>
           </div>
        </div>
        <div className={styles.section}>
          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy to reflect changes in our practices or legal requirements. Updates will be posted with the "Effective Date" at the top.</p>
        </div>
        <footer className={styles.footer}>
          <p>Contact us {' '}</p>
          <div className={styles.footerContact}>
          <Link href="mailto:example@example.com" className={styles.privacymail}>
          <Image 
            src = {privacyMail} 
            alt="Mail Icon" 
            className={styles.privacymailicon} 
            priority
          />
          Info@flowerworker.com
         
          </Link>
          <Link href="mailto:example@example.com" className={styles.privacylocation}>
          <Image 
            src = {privacyLocation} 
            alt="location Icon" 
            className={styles.privacylocationicon} 
            priority
          />
          Gothenburg & Stockholm
         
          </Link>
          {/* <img src="../../public/privacylocation.png" alt="Mail Icon" className={styles.privacylocationicon} />
          <a href="mailto:example@example.com" className={styles.privacylocation}>
          Gothenburg & Stockholm
          </a> */}
          </div>
            {/* <span style={{ color: '#ffff', fontsize: 16,fontweight: 400,lineheight: 21.79}}>
            Gothenburg & Stockholm
            </span>  */}
        </footer>
        <div className={styles.lastsection}>
          <p>By using FlowerWorker, you acknowledge that you have read and understood this Privacy Policy.</p>
        </div>
      </div>
      <NewsletterAndFooter />
    </div>
  );
}
