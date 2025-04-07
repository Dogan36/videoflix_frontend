import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
function LoginHeader({step, setStep, context = "login" }) {
  const navigate = useNavigate();
  const handleButton = () => {
    if (context === "login") {
      setStep("login");
    } else if (context === "reset") {
      navigate("/"); // oder navigate("/") – je nach gewünschtem Verhalten
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
      <h1 className={styles.logo}>VIDEOFLIX</h1>
      {step !== "login" &&
      <button onClick={()=>handleButton()}>Log In</button>}
      </div>
    </header>
  );
}

export default LoginHeader;
