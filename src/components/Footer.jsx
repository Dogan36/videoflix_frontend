import styles from "./Footer.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className={`${styles.footer} ${isHomePage ? styles.footerHome : styles.footerLogin}`}>
      <div className={`${styles.footerContent} ${isHomePage ? styles.footerContentHome : styles.footerContentLogin}`}>
        <Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link> <span>• </span> 
        <Link to="/legal-notice" className={styles.link}>Legal Notice</Link>
      </div>
    </footer>
  );
}

export default Footer;