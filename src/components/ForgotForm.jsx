import styles from "./LoginForm.module.css";
import warning from "@/assets/warning.svg";
import { useState } from "react";
import { validateEmail} from "@/utils/formvalidation";

function ForgotForm({email, setEmail }) {
  

  const [emailError, setEmailError] = useState();
 
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const emailErr = validateEmail(email);
  
  
    setEmailError(emailErr);
   
  
    if (emailErr) return;
  
    // ✅ Wenn alles ok ist → Submit
    console.log("submit in with:", { email});
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <span className="formHeader">Forgot your password?#2E3EDF</span>
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
