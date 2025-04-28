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
          <LoginStart setStep={setStep} email={email} setEmail={setEmail} />
        )}
        {step === "login" && (
          <LoginForm setStep={setStep} email={email} setEmail={setEmail} />
        )}
        {step === "signup" && (
          <SignupForm setStep={setStep} email={email} setEmail={setEmail} />
        )}
        {step === "forgot" && (
          <ForgotForm setStep={setStep} email={email} setEmail={setEmail} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Login;
