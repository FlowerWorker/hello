import ContactForm from '../components/contactUs/ContactForm';
import TabNavigation from '../components/contactUs/TabNavigation';
import styles from '../styles/contact.module.css';
import NewsletterAndFooter from '../components/contactUs/NewsletterAndFooter';

export default function ContactPage() {
  return (
    <div className={styles.pageContainer}>
      
    <div className={styles.contentContainer}>
      <div className={styles.header}>
        <h1>Help and Contact Support</h1>
        <TabNavigation />
      </div>
      <div className={styles.section}>
          <p>Welcome to FlowerWorker. These Terms and Conditions (“Terms”) govern your use of our platform, including project management, recruitment, and payment services. By accessing or using FlowerWorker, you agree to comply with these Terms. If you do not agree, you may not use the platform.</p>
        </div>
      {/* Contact Form Section */}
      <ContactForm />
    </div>
    <NewsletterAndFooter />
    </div>
  );
}

