import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import logoText from "@/assets/logoText.svg";
import { handleLogout } from "@/services/authHelpers";
import { useToast } from "../contexts/ToastContext";

/**
 * HomeHeader component that displays the header with a logo and a logout button.
 * It handles the logout functionality and shows a toast message on successful logout.
 */
function HomeHeader({ onResetActiveMovie }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { showToast } = useToast();

  /**
   * Function to handle the logout process.
   * It calls the handleLogout function and shows a toast message on success.
   * On error, it logs the error to the console.
   */
  const logout = () => {
    handleLogout()
      .then(() => {
        showToast({
          type: "success",
          message: "Logout erfolgreich.",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer} onClick={onResetActiveMovie}>
          <img className={styles.logo} src={logo} alt="" />
          {!isHome && <img src={logoText} alt="" />}
        </div>
        <button onClick={logout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </header>
  );
}

export default HomeHeader;
