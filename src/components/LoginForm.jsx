import styles from "./LoginForm.module.css";
import eyeOpen from "@/assets/visibility.svg";
import eyeClosed from "@/assets/visibility_off.svg";
import warning from "@/assets/warning.svg";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/formvalidation";

function LoginForm({ setStep }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
  
    setEmailError(emailErr);
    setPasswordError(passwordErr);
  
    if (emailErr || passwordErr) return;
  
    // ✅ Wenn alles ok ist → Submit
    console.log("Logging in with:", { email, password });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <span class="formHeader">Log In</span>
      <input
        className={styles.loginInput}
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      {emailError &&  <div className={styles.errorWrapper}><img src={warning} alt="" /><span>{emailError}</span></div>}
      
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
      <button type="submit">Log in</button>
      <button className="noButton">Forgot Password?</button>
      <div className={styles.formLastChild}>
        <span>New to Videoflix?</span>
        <button className="noButton" onClick={() => setStep("signup")}>
          Sign up now
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
