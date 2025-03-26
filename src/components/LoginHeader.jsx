import styles from "./Header.module.css";

function LoginHeader({step, setStep}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
      <h1 className={styles.logo}>VIDEOFLIX</h1>
      {step !== "login" &&
      <button onClick={()=>setStep("login")}>Log In</button>}
      </div>
    </header>
  );
}

export default LoginHeader;
