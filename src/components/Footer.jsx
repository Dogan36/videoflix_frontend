import styles from "./Footer.module.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className={`${styles.footer} ${isHomePage ? styles.footerHome : styles.footerLogin}`}>
      <a href="#" className={styles.link}>Datenschutz</a> •  
      <a href="#" className={styles.link}> Impressum</a>
    </footer>
  );
}

export default Footer;