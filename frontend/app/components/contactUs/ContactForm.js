"use client"
import React, { useState } from 'react';
import styles from "@/app/styles/contact.module.css";
import Link from "next/link";
import Image from "next/image";
import contactlogo from "@/app/public/contactlogo.png";
import contactlogo1 from "@/app/public/contactlogo1.png";
import contactinstagram from "@/app/public/contactinstagram.png";
import contactlinkedin from "@/app/public/contactlinkedin.png";
import contactfacebook from "@/app/public/contactfacebook.png";
import contactxing from "@/app/public/contactxing.png";
import mailfull from "@/app/public/Mailfull.png";
import Locationfull from "@/app/public/Locationfull.png"
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
            <Link href="/">
            <Image 
              src = {contactlogo} 
              alt="Contact Logo" 
              className={styles.contactImage} 
              priority
            />
          
            </Link>
            <p>Get in touch with us. We're here to assist you</p>
              <div className={styles.contactIcons}>
                <Link href="https://www.facebook.com" className={styles.iconLink}>
                <Image src = {contactlogo1} className={styles.contacticonImage} alt="Facebook" priority />
                </Link>
                <Link href="https://www.instagram.com" className={styles.iconLink}>
                <Image src = {contactinstagram} className={styles.contacticonImage} alt="Instagram" priority />
                </Link>
                <Link href="https://www.linkedin.com" className={styles.iconLink}>
                <Image src = {contactlinkedin} className={styles.contacticonImage} alt="LinkedIn" priority />
                </Link>
                <Link href="https://www.facebook.com" className={styles.iconLink}>
                <Image src = {contactfacebook} className={styles.contacticonImage} alt="Facebook" priority />
                </Link>
                <Link href="https://www.xing.com" className={styles.iconLink}>
                <Image src = {contactxing} className={styles.contacticonImage} alt="Xing" priority />
                </Link>
              </div>
              <div className={styles.contactMail}>
                <Link href="mailto:example@example.com" className={styles.email}>
                <Image src = {mailfull} alt="Mail Icon" className={styles.icon} priority />
                </Link>
                  Info@flowerworker.com
              </div>
              <div className={styles.locationMail}>
                <Link href="/" className={styles.email}>
                <Image src = {Locationfull} alt="Mail Icon" className={styles.icon} priority />
                </Link>
                  Gothenburg & Stockholm
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

