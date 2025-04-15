import styles from "./LoginForm.module.css";
import eyeOpen from "@/assets/visibility.svg";
import eyeClosed from "@/assets/visibility_off.svg";
import warning from "@/assets/warning.svg";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/formvalidation";
import { handleLogin } from "@/services/authHelpers";
function LoginForm({ setStep, email, setEmail }) {
  
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
  
    setEmailError(emailErr);
    setPasswordError(passwordErr);
  
    if (emailErr || passwordErr) return;
  
    handleLogin({
      email,
      password,
      setStep,
      setEmailError,
      setPasswordError,
      setEmail,
      setPassword,
      setToastMessage: () => {},
      setToastButtonAction: () => {},
      setToastButtonText: () => {},
      setToastType: () => {},
      setShowToast: () => {},
      navigate
    });
    
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <span className="formHeader">Log In</span>
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
      <button onClick={() => setStep("forgot")} className="noButton">Forgot Password?</button>
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
