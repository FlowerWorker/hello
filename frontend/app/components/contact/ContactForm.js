import { useState } from 'react';
import styles from '../styles/contact.module.css';
import RichTextEditor from './RichTextEditor';

const ContactPage = () => {
  const [message, setMessage] = useState('');

  const handleSave = (event) => {
    event.preventDefault();
    console.log('Message Content:', message); // Submit the content or perform an action
    alert('Form submitted successfully!');
  };

  return (
    <div className={styles.contactSection}>
      <div className={styles.contactBox}>
        <div className={styles.contactContent}>
          <h2>Contact Information</h2>
          <img src="/contactlogo.png" className={styles.contactImage} alt="Contact Logo" />
          <p>Get in touch with us. We're here to assist you</p>
          <div className={styles.contactIcons}>
            <a
              href="https://www.facebook.com"
              className={styles.iconLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/contactlogo1.png" className={styles.contacticonImage} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com"
              className={styles.iconLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/contactinstagram.png" className={styles.contacticonImage} alt="Instagram" />
            </a>
            <a
              href="https://www.linkedin.com"
              className={styles.iconLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/contactlinkedin.png" className={styles.contacticonImage} alt="LinkedIn" />
            </a>
            <a
              href="https://www.facebook.com"
              className={styles.iconLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/contactfacebook.png" className={styles.contacticonImage} alt="Facebook" />
            </a>
            <a
              href="https://www.xing.com"
              className={styles.iconLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/contactxing.png" className={styles.contacticonImage} alt="Xing" />
            </a>
          </div>
          <div className={styles.contactMail}>
            <img src="/mailfull.png" alt="Mail Icon" className={styles.icon} />
            <a href="mailto:example@example.com" className={styles.email}>
              Info@flowerworker.com
            </a>
          </div>
          <div className={styles.locationMail}>
            <img src="/Locationfull.png" alt="Location Icon" className={styles.icon} />
            <a href="#" className={styles.email}>
              Gothenburg & Stockholm
            </a>
          </div>
        </div>
        <form className={styles.contactForm} onSubmit={handleSave}>
          <p>
            Don't hesitate to reach out! We're happy to answer any questions you have, no matter how
            big or small.
          </p>
          <div className={styles.nameSection}>
            <div className={styles.nameContent}>
              <label htmlFor="name">Name</label>
<input type="text" placeholder="Enter Your Name..." required id="name" />
</div>
<div className={styles.nameContent}>
<label htmlFor="surname">Surname</label>
<input type="text" placeholder="Enter Your Surname..." id="surname" />
</div>
</div>
<label htmlFor="phone">Phone number (Optional)</label>
<input type="text" placeholder="Enter Your Phone number..."  />
<label htmlFor="email">Email</label>
<input type="email" placeholder="Enter Your Email..." required />
<label htmlFor="message">Write us a message</label>
{/* Replace the <textarea> with the RichTextEditor */}
<RichTextEditor value={message} onChange={setMessage} />
<button type="submit">Save</button>
</form>
</div>
</div>
);
};

export default ContactPage;

