import TabNavigation from '../components/contactUs/TabNavigation';
import styles from '../styles/Terms.module.css';
import NewsletterAndFooter from '../components/contactUs/NewsletterAndFooter';
import Link from "next/link";
import Image from "next/image";
import termsMail from "@/app/public/termsmail.png";
import termsLocation from "@/app/public/termslocation.png"
export default function Terms() {
  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.termsContainer}>
        <div className={styles.header}>
          <h1>Terms & Conditions</h1>
          <TabNavigation />
        </div>
        <div className={styles.section}>
          <p>Welcome to FlowerWorker. These Terms and Conditions (“Terms”) govern your use of our platform, including project management, recruitment, and payment services. By accessing or using FlowerWorker, you agree to comply with these Terms. If you do not agree, you may not use the platform.</p>
          
        </div>
        <div className={styles.firstsection}>
          <div className={styles.innersection}>
          <h2>Acceptance of Terms</h2>
          <p>By creating an account or using FlowerWorker, you agree to these Terms and our Privacy Policy. We reserve the right to update or modify these Terms at any time. Continued use of the platform after changes signifies your acceptance of the updated Terms.</p>
          </div>
          <div className={styles.innersection}>
          <h2>Eligibility</h2>
          <p>You must be at least 18 years old and have the legal capacity to enter into binding agreements to use FlowerWorker. If you are using the platform on behalf of a company, you represent that you are authorized to bind that entity to these Terms.</p>
          </div>
        </div>
        <div className={styles.section}>
          <h2>User Accounts</h2>
          <ul>
            <li>Account Creation</li>
              <span className= {styles.innertext}>You must provide accurate, complete, and current information during registration.You are responsible for maintaining the confidentiality of your account credentials.</span>  <br></br>
              <br></br><li>Account Responsibility</li>
            <span className= {styles.innertext}> You are responsible for all activities that occur under your account.Notify us immediately of any unauthorized use of your account.</span>
            
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Use of the Platform</h2>
          <p>You agree to use FlowerWorker only for lawful purposes and in compliance with these Terms. Prohibited activities include but are not limited to:</p>
          <ul>
            <li>Posting false or misleading information.</li>
            <li>Using the platform for unauthorized commercial purposes.</li>
            <li>Uploading malicious software or files.</li>
            <li>Engaging in harassment, discrimination, or illegal activities.  </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Recruitment and Project Management</h2>
          <ul>
            <li>For Employers and Recruiters</li>
              <span className= {styles.innertext}>Employers and recruiters are solely responsible for the accuracy of job postings and recruitment activities.FlowerWorker does not guarantee the suitability of candidates or the success of hiring processes.</span><br></br>

            <br></br><li>For Job Seeker</li>
            <span className= {styles.innertext}> Job seekers are responsible for ensuring the accuracy of resumes, profiles, and other submitted information.FlowerWorker does not guarantee employment opportunities or outcomes.</span>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Payment and Billing</h2>
          <ul>
            <li>Payment Processing</li>
              <span className= {styles.innertext}>All payments are processed securely through our third-party payment providers.You are responsible for ensuring accurate payment information</span>  <br></br>
              <br></br><li>Refunds and Disputes</li>
            <span className= {styles.innertext}> Refunds, if applicable, will be processed in accordance with our refund policy.Payment disputes must be reported within 30 days of the transaction.</span>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Intellectual Property</h2>
          <ul>
            <li>Platform Content</li>
              <span className= {styles.innertext}>All content on the platform, including logos, text, graphics, and software, is the property of FlowerWorker or its licensors.You may not copy, modify, distribute, or reproduce platform content without our explicit consent.</span>  <br></br>
              <br></br><li>User Content</li>
            <span className= {styles.innertext}> You retain ownership of content you upload to the platform but grant us a non-exclusive, royalty-free license to use, display, and distribute such content for platform operations.</span>
          </ul>
        </div>
        <div className={styles.Disclaimersection}>
           <div className={styles.boxsection}>
            <h2>Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, FlowerWorker is not liable for:</p>
            <p>Indirect, incidental, or consequential damages.</p>
            <p>Loss of data, employment opportunities, or revenue.</p>
            <p>Errors, interruptions, or failures of the platform.</p>
           </div>
           <div className={styles.verticalLine}>
           </div>
           <div className={styles.boxsection}>
            <h2>Disclaimers</h2>
            <p>FlowerWorker is provided "as-is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the platform will meet your expectations or be error-free.</p>
           </div>

        </div>
        <div className={styles.Disclaimersection}>
           <div className={styles.boxsection}>
            <h2>Termination</h2>
            <p>We reserve the right to suspend or terminate your account or access to the platform at our sole discretion, with or without notice, for violations of these Terms or other reasons.</p>
           </div>
           <div className={styles.verticalLine}>
           </div>
           <div className={styles.boxsection}>
            <h2>Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of [Insert Jurisdiction], without regard to its conflict of law principles.</p>
           </div>

        </div>
        <div className={styles.Disclaimersection}>
           <div className={styles.boxsection}>
            <h2>Miscellaneous</h2>
            <p>Severability: If any provision of these Terms is found invalid, the remaining provisions will remain enforceable.</p>
            <p> No Waiver: Failure to enforce any provision of these Terms does not constitute a waiver of that right.</p>
            <p> Entire Agreement: These Terms, along with our Privacy Policy, constitute the entire agreement between you and FlowerWorker.</p>
           </div>
           <div className={styles.verticalLine}>
           </div>
           <div className={styles.boxsection}>
            <h2>Dispute Resolution</h2>
            <p>Any disputes arising from these Terms will be resolved through mediation or arbitration in [Insert Location]. If mediation fails, disputes may be brought before the courts of [Insert Jurisdiction].</p>
           </div>

        </div>
        <footer className={styles.footer}>
          <p>Contact us {' '}</p>
          <div className={styles.footerContact}>
            <Link href="mailto:example@example.com" className={styles.privacymail}>
            <Image 
              src = {termsMail} 
              alt="Mail Icon" 
              className={styles.termsmailicon} 
              priority
            />
            Info@flowerworker.com
            </Link>
            <Link href="mailto:example@example.com" className={styles.privacylocation}>
            <Image 
            src = {termsLocation} 
            alt="location Icon" 
            className={styles.termslocationicon} 
            priority
            />
            Gothenburg & Stockholm
            </Link>
            </div>
        </footer>
        <div className={styles.lastsection}>
          <p>By using FlowerWorker, you acknowledge that you have read and understood this Privacy Policy.</p>
        </div>
      </div>
       
      <NewsletterAndFooter />
    </div>
  );
}
