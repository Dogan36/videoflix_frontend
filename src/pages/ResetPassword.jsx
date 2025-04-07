import { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import ResetPasswordForm from "../components/ResetPasswordForm";
import styles from "./Login.module.css";
import Footer from "../components/Footer";
import backgroundLogin from "@/assets/background-login.webp";
function ResetPasswort() {
  const [step, setStep] = useState("start");
  const [email, setEmail] = useState("")
  const backgroundImage = `url(${backgroundLogin})`;
  
  

  return (
    <>
      <LoginHeader step={step} setStep={setStep} context="reset" />
      <div className={styles.parent} style={{ backgroundImage: backgroundImage }}>
        <ResetPasswordForm setStep={setStep} email={email} setEmail={setEmail} />
      </div>
      <Footer />
    </>
  );
}

export default ResetPasswort;
