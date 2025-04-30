import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import logoText from "@/assets/logoText.svg";

/**
 * LoginHeader component that displays the header with a logo and a login button.
 * It handles the navigation to the login page or the activation page based on the context.
 */
function LoginHeader({step, setStep, context = "login" }) {
  const navigate = useNavigate();
  const handleButton = () => {
    if (context === "login") {
      setStep("login");
    } else if (context === "reset") {
      navigate("/"); // oder navigate("/") – je nach gewünschtem Verhalten
    }
    else if (context === "activate") {
      navigate("/login", { state: { step: "login"} });
    } 
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <img className={styles.logoText} src={logoText} alt="Logo Text" />
      </div>
      {step !== "login" &&
      <button onClick={()=>handleButton()}>Log In</button>}
      </div>
      
    </header>
  );
}

export default LoginHeader;
