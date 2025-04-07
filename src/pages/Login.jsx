import { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import LoginStart from "../components/LoginStart";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import ForgotForm from "../components/ForgotForm";
import styles from "./Login.module.css";
import Footer from "../components/Footer";
import ToastWrapper from "../components/ToastWrapper";
import Toast from "../components/Toast";

import backgroundStart from "@/assets/background-start.webp";
import backgroundLogin from "@/assets/background-login.webp";
import backgroundSignup from "@/assets/background-signup.webp";
function Login() {
  const [step, setStep] = useState("start");
  const [email, setEmail] = useState("");
  
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("error"); // "error" or "success"
  const [toastMessage, setToastMessage] = useState("");
  const [toastButtonText, setToastButtonText] = useState("");
  const [toastButtonAction, setToastButtonAction] = useState(() => () => {});
  
  const backgroundImage = {
    start: `url(${backgroundStart})`,
    login: `url(${backgroundLogin})`,
    signup: `url(${backgroundSignup})`,
    forgot: `url(${backgroundLogin})`,
  };
  return (
    <>
      <LoginHeader step={step} setStep={setStep} context="login" />
      <div
        className={styles.parent}
        style={{ backgroundImage: backgroundImage[step] }}
      >
        {step === "start" && (
          <LoginStart 
          setStep={setStep} 
          email={email} 
          setEmail={setEmail} 
          setShowToast={setShowToast} 
          setToastMessage={setToastMessage} 
          setToastButtonAction={setToastButtonAction} 
          setToastButtonText={setToastButtonText}
          setToastType={setToastType}
          />
        )}
        {step === "login" && (
          <LoginForm
          setStep={setStep}
          email={email} 
          setEmail={setEmail} 
          setShowToast={setShowToast} 
          setToastMessage={setToastMessage} 
          setToastButtonAction={setToastButtonAction} 
          setToastButtonText={setToastButtonText} />
        )}
        {step === "signup" && (
          <SignupForm setStep={setStep}
          email={email} 
          setEmail={setEmail} 
          setShowToast={setShowToast} 
          setToastMessage={setToastMessage} 
          setToastButtonAction={setToastButtonAction} 
          setToastButtonText={setToastButtonText} />
        )}
        {step === "forgot" && (
          <ForgotForm setStep={setStep} email={email} setEmail={setEmail} />
        )}
      </div>
      <Footer />
      {showToast && (
        <ToastWrapper>
          <Toast 
          buttonText={toastButtonText}
          message={toastMessage} onClose={() => setShowToast(false)} 
          onClick={toastButtonAction}
          type={toastType}
          />
        </ToastWrapper>
      )}
      

    </>
  );
}

export default Login;
