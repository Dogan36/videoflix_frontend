import { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import LoginStart from "../components/LoginStart";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import styles from "./Login.module.css";

function Login() {
  const [step, setStep] = useState("start");
  const backgroundImage = {
    start: "url('src/assets/background-start.webp')",
    login: "url('src/assets/background-login.webp')",
    signup: "url('src/assets/background-signup.webp')",
    forgot: "url('src/assets/background-login.webp')",
  };
  return (
    <>
      <LoginHeader step={step} setStep={setStep} />
      <div className={styles.parent} style={{ backgroundImage: backgroundImage[step] }}>
        {step === "start" && <LoginStart setStep={setStep} />}
        {step === "login" && <LoginForm setStep={setStep} />}
        {step === "signup" && <SignupForm setStep={setStep} />}
      </div>
      <Footer />
    </>
  );
}

export default Login;
