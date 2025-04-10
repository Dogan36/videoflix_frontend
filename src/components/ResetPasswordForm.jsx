import styles from "./LoginForm.module.css";
import eyeOpen from "@/assets/visibility.svg";
import eyeClosed from "@/assets/visibility_off.svg";
import { useState } from "react";
import warning from "@/assets/warning.svg";
import {  validatePassword, validatePasswordRepeat } from "@/utils/formvalidation";
import { handleReset } from "../services/authHelpers";

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordErr = validatePassword(password);
    const passwordRepeatErr = validatePasswordRepeat(password, passwordRepeat);
    
    setPasswordError(passwordErr);
    setPasswordRepeatError(passwordRepeatErr);
  
    if (passwordErr || passwordRepeatErr) return;
      handleReset({password, passwordRepeat, setPasswordError, setPasswordRepeatError });
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <span className="formHeader">Reset password</span>
      <span className="formSubheader">Create a new password for your <span style={{color: "var(--primary-color)"}}>Videoflix</span> account.</span>
      
      <div className={styles.inputWrapper}>
        <input
          className={styles.loginInput}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}

        />
        <img
          src={showConfirmPassword ? eyeClosed : eyeOpen}
          alt={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
          onClick={toggleConfirmPassword}
          className={styles.toggleIcon}
        />
      </div>
      {passwordRepeatError &&  <div className={styles.errorWrapper}><img src={warning} alt="" /><span>{passwordRepeatError}</span></div>}
      
      <button onClick={handleSubmit}>Reset my password</button>
    </form>
  );
}

export default ResetPasswordForm;