import styles from "./LoginForm.module.css";

import eyeOpen from "@/assets/visibility.svg";
import eyeClosed from "@/assets/visibility_off.svg";
import warning from "@/assets/warning.svg";
import { useState } from "react";

function LoginForm({ setStep }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [emailError, setEmailError] = useState("test");
  const [passwordError, setPasswordError] = useState("test");
  return (
    <div className={styles.container}>
      <span class="formHeader">Log In</span>
      <input
        className={styles.loginInput}
        type="email"
        placeholder="Email Address"
      />
      
      {emailError &&  <div className={styles.errorWrapper}><img src={warning} alt="" /><span>{emailError}</span></div>}
      
      <div className={styles.inputWrapper}>
        <input
          className={styles.loginInput}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <img
          src={showPassword ? eyeClosed : eyeOpen}
          alt={showPassword ? "Hide password" : "Show password"}
          onClick={togglePassword}
          className={styles.toggleIcon}
        />
      </div>
      {passwordError &&  <div className={styles.errorWrapper}><img src={warning} alt="" /><span>{passwordError}</span></div>}
      <button>Log in</button>
      <button className="noButton">Forgot Password?</button>
      <div className={styles.formLastChild}>
        <span>New to Videoflix?</span>
        <button className="noButton" onClick={() => setStep("signup")}>
          Sign up now
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
