import styles from "./LoginForm.module.css";
import eyeOpen from "@/assets/visibility.svg";
import eyeClosed from "@/assets/visibility_off.svg";
import { useState } from "react";
import warning from "@/assets/warning.svg";
import {
  validateEmail,
  validatePassword,
  validatePasswordRepeat,
} from "@/utils/formvalidation";
import { handleRegistration } from "../services/authHelpers";
import { useToast } from "@/contexts/ToastContext";

/**
 * SignupForm component that handles the signup process.
 * It validates the email, password, and password repeat inputs and sends a request to the server to register the user.
 * It also handles the display of error messages and the visibility of the password inputs.
 */
export default function SignupForm({ setStep, email, setEmail }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const { showToast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const passwordRepeatErr = validatePasswordRepeat(password, passwordRepeat);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setPasswordRepeatError(passwordRepeatErr);

    if (emailErr || passwordErr || passwordRepeatErr) return;
    const res = await handleRegistration({
      email,
      password,
      passwordRepeat,
      setStep,
    });
    if (res.ok) {
      setPassword("");
      setPasswordRepeat("");
      showToast({
        type: "success",
        message:
          "Successfully registered. Please check your email to activate your account.",
        buttonText: "Login",
        buttonAction: () => {
          setStep("login");
        },
      });
    } else if (res.status === 400) {
      showToast({
        type: "error",
        message: `${res.data.detail}`,
      });
    } else {
      showToast({
        type: "error",
        message: "Unknown error. Try again later",
      });
    }
  };
  
  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <span className="formHeader">Sign Up</span>
      <input
        className={styles.loginInput}
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && (
        <div className={styles.errorWrapper}>
          <img src={warning} alt="" />
          <span>{emailError}</span>
        </div>
      )}
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
      {passwordError && (
        <div className={styles.errorWrapper}>
          <img src={warning} alt="" />
          <span>{passwordError}</span>
        </div>
      )}
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
          alt={
            showConfirmPassword
              ? "Hide password confirmation"
              : "Show password confirmation"
          }
          onClick={toggleConfirmPassword}
          className={styles.toggleIcon}
        />
      </div>
      {passwordRepeatError && (
        <div className={styles.errorWrapper}>
          <img src={warning} alt="" />
          <span>{passwordRepeatError}</span>
        </div>
      )}

      <button onClick={handleSubmit}>Get Started</button>
    </form>
  );
}
