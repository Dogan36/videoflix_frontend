import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import arrow_back from "@/assets/arrow_back.svg";
import logo from "@/assets/logo.svg";
import logoText from "@/assets/logoText.svg";
function HomeHeader({ onResetActiveMovie }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const handleBack = () => {
    navigate("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer} 
        onClick={onResetActiveMovie}>
          <img className={styles.logo} src={logo} alt="" />
          {!isHome && <img src={logoText} alt="" />}
        </div>
        {isHome ? (
        <button className={styles.logoutButton}>Log Out</button>
      ) : (
        <img
        src={arrow_back}
        alt="Back"
        className={styles.backArrow}
        onClick={handleBack}
      />
      )}
      </div>
    </header>
  );
}

export default HomeHeader;
