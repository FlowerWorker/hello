import Link from 'next/link';
import styles from '../styles/TabNavigation.module.css';

const TabNavigation = () => {
  return (
    <div className={styles.tabs}>
    <div className={styles.tabContainer}>
      <Link href="/privacy-policy" className={styles.tabItem}>
        Privacy Policy
      </Link>
      <Link href="/terms" className={styles.tabItem}>
        Terms & Conditions
      </Link>
      <Link href="/contact" className={styles.tabItem}>
        Contact Us
      </Link>
     </div>
     <p className={styles.effectiveDate}>Effective Date: 21. Nov. 2024</p>
     </div>
  );
};

export default TabNavigation;
