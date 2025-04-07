import styles from "./LoginStart.module.css"
import chevron_right from "@/assets/chevron_right.svg";

import { postDataWJSON } from "@/services/api";

function LoginStart({ setStep, email, setEmail }) {
  

  const handleCheckEmail = async () => {
    if (!email){
      setStep("signup");
      return;} 
      

    try {
      const res = await postDataWJSON("/users/check-email/", { email });
      if (res.ok) {
        setStep(res.data.exists ? "login" : "signup");
      } else {
        console.error("Fehler bei der Anfrage", res);
      }
    } catch (err) {
      console.error("Fehler:", err);
    }
  };
    return (
      <div className={styles.container}>
        <h1>Movies, TV shows, and more</h1>
        <span style={{ fontSize: '18px' }}>Enter your email to create or restart your subscription.</span>
        <div className={styles.inputContainer}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCheckEmail}>Sign Up <img src={chevron_right} alt="Weiter" /></button>
        </div>
      </div>
    );
  }
  
  export default LoginStart;