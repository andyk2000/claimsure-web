"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handlescrolled = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };
    window.addEventListener("scroll", handlescrolled);
    return () => {
      if (window) {
        window.removeEventListener("scroll", handlescrolled);
      }
    };
  });

  return (
    <div className={styles.page}>
      <div
        className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
      >
        <Image src="/Logo.png" alt="image2" height={50} width={50}></Image>
        <div className={styles.headerMenu}>
          <div className={styles.headerMenuList}>Home</div>
          <div className={styles.headerMenuList}>About Us</div>
          <div className={styles.headerMenuList}>Contact us</div>
          <div className={styles.headerMenuList}>How It works</div>
        </div>
        <div className={styles.headerLoginSection}>
          <Link href="/login" className={styles.loginButton}>LOGIN</Link>
          <button className={styles.signUpButton}>SIGN UP</button>
        </div>
      </div>
      <div className={styles.poster}>
        <Image
          src="/Logo.png"
          alt="logo"
          width={200}
          height={200}
          className={styles.logoPoster}
        />
        <div className={styles.slogant}>
          Get your healthcare services faster
        </div>
        <div className={styles.disclaimer}>
          <text className={styles.disclaimerText}>
            CLAIMSURE is a platform that connects RSSB with everyone, get the
            very best of{" "}
          </text>
          <text className={styles.disclaimerText}>
            medical care with the very best insurance company, serving over 13
            millions
          </text>
          <text className={styles.disclaimerText}>
            people from all across Rwanda.
          </text>
          <text className={styles.disclaimerText}>
            Your health insurance is now faster than ever.
          </text>
        </div>
      </div>
      <div className={styles.poster2}>
        <text className={styles.slogant2}>
          Our mission is a healthy society
        </text>
      </div>
      <div className={styles.aboutSection}>
        <div className={styles.aboutPicSection}>
          <Image
            src="/user.png"
            alt="image2"
            height={500}
            width={750}
            className={styles.aboutPic}
          ></Image>
        </div>
        <div className={styles.readMore}>
          <text className={styles.readMoreTitle}>
            Get the best out of Claimsure
          </text>
          <div className={styles.readMoreText}>
            <text className={styles.readMoreTextLine}>
              Do you wish to bring the best out of this platform?
            </text>
            <text className={styles.readMoreTextLine}>
              Learn how to use the platform with our under 35 minute training
            </text>
            <text className={styles.readMoreTextLine}>platform.</text>
            <text className={styles.readMoreTextLine}>
              Learn how to use this tool.
            </text>
            <text className={styles.readMoreTextLine}>
              Get a feel of a good health insurance.
            </text>
          </div>
          <div className={styles.readMoreButtonSection}>
            <button className={styles.readMoreButton}>Read More</button>
          </div>
        </div>
      </div>
      <div className={styles.contactSection}>
        <div className={styles.contactLeftSection}>
          <Image src="/Logo2.png" alt="Logo2" height={100} width={100}></Image>
          <text className={styles.contactDisclaimer}>
            You have any question need clarification, any input to provide tous,
            don’t hesitate to <span className={styles.spanBlue}>contact</span>{" "}
            <span className={styles.spanYellow}>us.</span>
          </text>
        </div>
        <div className={styles.contactRightSection}>
          <text className={styles.contactTitle}>Contact Us</text>
          <div className={styles.contactForm}>
            <div className={styles.contactName}>
              <text className={styles.contactLabel}>Full Name</text>
              <input className={styles.contactField1} />
            </div>
            <div className={styles.contactEmail}>
              <text className={styles.contactLabel}>Email</text>
              <input className={styles.contactField1} />
            </div>
            <div className={styles.contactMessage}>
              <text className={styles.contactLabel}>Message</text>
              <textarea className={styles.contactField2} />
            </div>
            <div className={styles.submitButtonSection}>
              <button className={styles.submitButton}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerSection}>
        <div className={styles.footerLogoSection}>
          <Image src="/Logo2.png" alt="image2" height={100} width={100} />
        </div>
        <div className={styles.footerLinkSection}>
          <div className={styles.navigationSection}>
            <h3 className={styles.navigationTitle}>Important Links</h3>
            <p>Home</p>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>How It Works</p>
          </div>
          <div className={styles.navigationSection}>
            <h3>Get In Touch</h3>
            <p>KN 3 Rd African Boulevard</p>
            <p>Kiyovu, Nyarugenge</p>
            <p>Tel: 0781010123</p>
            <p>P.O Box: 00000</p>
          </div>
          <div className={styles.navigationSection}>
            <h3>Follow Us</h3>
            <div>
              <Icon icon="ph:x-logo" width="25" height="25" />
              <p>@claimsure</p>
            </div>
            <div>
              <Icon icon="ph:instagram-logo" width="25" height="25" />
              <p>@claimsure</p>
            </div>
            <div>
              <Icon icon="ph:linkedin-logo" width="25" height="25" />
              <p>@claimsure</p>
            </div>
            <div>
              <Icon icon="ph:envelope" width="25" height="25" />
              <p>info@claimsure.rw</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
