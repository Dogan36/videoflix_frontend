import styles from "./LoginForm.module.css";

import eyeOpen from "@/assets/visibility.svg";
import eyeClosed from "@/assets/visibility_off.svg";
import { useState } from "react";
import warning from "@/assets/warning.svg";
function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const [emailError, setEmailError] = useState("test");
  const [passwordError, setPasswordError] = useState("test");
  const [passwordRepeatError, setPasswordRepeatError] = useState("test");

  return (
    <div className={styles.container}>
      <span class="formHeader">Sign Up</span>
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
      <div className={styles.inputWrapper}>
        <input
          className={styles.loginInput}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Password"
        />
        <img
          src={showConfirmPassword ? eyeClosed : eyeOpen}
          alt={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
          onClick={toggleConfirmPassword}
          className={styles.toggleIcon}
        />
      </div>
      {passwordRepeatError &&  <div className={styles.errorWrapper}><img src={warning} alt="" /><span>{passwordRepeatError}</span></div>}
      
      <button>Get Started</button>
    </div>
  );
}

export default SignupForm;