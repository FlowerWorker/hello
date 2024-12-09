import styles from '../styles/NewsletterAndFooter.module.css'; // CSS module for styling
const NewsletterAndFooter = () => {
  return (
    <div className={styles.newsContainer}>
      {/* Newsletter Section */}
      <div className={styles.newsletterContainer}>
        <h2 className={styles.newsletterHeading}>
          Receive newsletters to explore <span className={styles.highlight}>FlowerWork</span>
        </h2>
        <p className={styles.newsletterDescription}>
        Leave your email to receive information about upcoming features  
        </p>
        <div className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email address"
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.subscribeButton}>
            Send
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <img src="/logo.png" className={styles.iconImage} />
          <a href="/about" className={styles.footerLink}>
            About FlowerWork
          </a>
          <span className={styles.divider}></span>
          <a href="/contact" className={styles.footerLink}>
            Contact Us
          </a>
          <span className={styles.divider}></span>
          <a href="/terms" className={styles.footerLink}>
            Terms & Conditions
          </a>
          <span className={styles.divider}></span>
          <a href="/privacy" className={styles.footerLink}>
            Privacy Policy
          </a>
        </div>
        <div className={styles.footerIcons}>
          <a href="https://www.facebook.com" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
          <img src = "/logo.png"  className={styles.iconImage} />
          </a>
          <a href="https://www.instagram.com" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
          <img src="/Instagram.png" className={styles.iconImage} />
          </a>
          <a href="https://www.linkedin.com" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
          <img src="/linkedin.png" className={styles.iconImage} />
          </a>
          <a href="https://www.facebook.com" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
          <img src="/facebook.png" className={styles.iconImage} />
          </a>
          <a href="https://www.xing.com" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
          <img src="/xing.png" className={styles.iconImage} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NewsletterAndFooter;
