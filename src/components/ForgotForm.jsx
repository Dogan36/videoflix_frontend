import styles from "./LoginForm.module.css";
import warning from "@/assets/warning.svg";
import { useState } from "react";
import { validateEmail} from "@/utils/formvalidation";
import { handleForgot } from "../services/authHelpers";
import { useToast } from "@/contexts/ToastContext";

/**
 * ForgotForm component that handles the password reset process.
 * It validates the email input and sends a request to the server to initiate the password reset process.
 */
function ForgotForm({setStep, email, setEmail}) {  
  const [emailError, setEmailError] = useState();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    if (emailErr) return;
    const res = await handleForgot({email});
    if (res.ok) {
      showToast({ type: "success", message: `${res.data.detail}` });
    }
    else if (res.status === 400) {
      showToast({ type: "error", message: `${res.data.detail}`, buttonText: "Sign Up", buttonAction: () => setStep("signup") });
    } else {
      console.error(res);
      showToast({ type: "error", message: "Unknown error. Please try again later" });
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <span className="formHeader">Forgot your password?</span>
        <span className="formSubheader">We will send you an email with Instructions to reset your password.</span>
      <input
        className={styles.loginInput}
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      {emailError &&  <div className={styles.errorWrapper}><img src={warning} alt="" /><span>{emailError}</span></div>}
      <button type="submit">Send Email</button>
    </form>
  );
}

export default ForgotForm;
