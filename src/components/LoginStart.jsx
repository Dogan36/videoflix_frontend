import styles from "./LoginStart.module.css"
import chevron_right from "@/assets/chevron_right.svg";
function LoginStart({ setStep }) {
    return (
      <div className={styles.container}>
        <h1>Movies, TV shows, and more</h1>
        <span style={{ fontSize: '18px' }}>Enter your email to create or restart your subscription.</span>
        <div className={styles.inputContainer}>
        <input type="email" placeholder="Email Address" />
        <button onClick={() => setStep("login")}>Sign Up <img src={chevron_right} alt="Weiter" /></button>
        </div>
      </div>
    );
  }
  
  export default LoginStart;