// import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.Header}>
        <div className={styles.HeaderMenu}>
          <div className={styles.HeaderMenuList}>Home</div>
          <div className={styles.HeaderMenuList}>About Us</div>
          <div className={styles.HeaderMenuList}>Contact us</div>
          <div className={styles.HeaderMenuList}>How It works</div>
        </div>
        <div className={styles.headerLoginSection}>
          <button className={styles.loginButton}>LOGIN</button>
          <button className={styles.SignUpButton}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
}
