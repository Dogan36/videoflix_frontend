import { useEffect, useState } from "react";
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
  
  const [showToast, setShowToast] = useState(true);
  const [toastType, setToastType] = useState("error"); // "error" or "success"
  const [toastMessage, setToastMessage] = useState("Dies ist eine Toast-Nachricht. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  const [toastButtonText, setToastButtonText] = useState("test");
  const [toastButtonAction, setToastButtonAction] = useState(() => () => {});
  
  useEffect(() => {
    console.log("Toast Type:", toastType);
    console.log("Toast Message:", toastMessage);
    console.log("Toast Button Text:", toastButtonText);
    console.log("Toast Button Action:", toastButtonAction);
  }, [toastType, toastMessage, toastButtonText, toastButtonAction]);


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
          
          />
        )}
        {step === "login" && (
          <LoginForm
          setStep={setStep}
          email={email} 
          setEmail={setEmail} 
          setShowToast={setShowToast}
          setToastType={setToastType}
          setToastMessage={setToastMessage} 
          setToastButtonAction={setToastButtonAction} 
          setToastButtonText={setToastButtonText} />
        )}
        {step === "signup" && (
          <SignupForm
          setStep={setStep}
          email={email} 
          setEmail={setEmail} 
          setShowToast={setShowToast} 
          setToastType={setToastType}
          setToastMessage={setToastMessage} 
          setToastButtonAction={setToastButtonAction} 
          setToastButtonText={setToastButtonText} />
        )}
        {step === "forgot" && (
          <ForgotForm
          setStep={setStep}
          email={email} 
          setEmail={setEmail} 
          setShowToast={setShowToast} 
          setToastMessage={setToastMessage} 
          setToastButtonAction={setToastButtonAction} 
          setToastButtonText={setToastButtonText} />
        )}
      </div>
      <Footer />
      {showToast && (
        <ToastWrapper>
          <Toast 
          buttonText={toastButtonText}
          message={toastMessage} onClose={() => setShowToast(false)} 
          onAction={toastButtonAction}
          type={toastType}
          />
        </ToastWrapper>
      )}
      

    </>
  );
}

export default Login;
