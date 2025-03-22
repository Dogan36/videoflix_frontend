import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function LoginHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
      <h1 className={styles.logo}>VIDEOFLIX</h1>
      <button>Log In</button>
      </div>
    </header>
  );
}

export default LoginHeader;
