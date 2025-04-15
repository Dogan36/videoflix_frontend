import { postDataWJSON } from "./api";

let navigate;
export async function handleRegistration({
  email,
  password,
  passwordRepeat,
  setStep,
  setToastMessage,
  setToastButtonAction,
  setToastButtonText,
  setToastType,
  setShowToast,
}) {
  try {
    const res = await postDataWJSON("users/register/", {
      email,
      password,
      password2: passwordRepeat,
    });

    if (res.ok) {
      setToastType("success");
      setToastMessage("Registrierung erfolgreich! Bitte überprüfe deine E-Mails.");
      setToastButtonText("Log in");
      setToastButtonAction(() => () => setStep("login"));
      setShowToast(true);
      return;
    }

    // Fehlerbehandlung anhand von Statuscodes
    switch (res.status) {
      case 400:
        if (res.data?.email?.[0] === "user with this email already exists.") {
          setToastMessage("E-Mail-Adresse bereits registriert.");
          setToastButtonText("Login");
          setToastButtonAction(() => () => setStep("login"));
        } else {
          setToastMessage("Fehler bei der Registrierung. Bitte überprüfe deine Eingaben.");
          setToastButtonText("OK");
          setToastButtonAction(() => () => setStep("signup"));
        }
        setToastType("error");
        setShowToast(true);
        break;

      default:
        setToastMessage("Unbekannter Fehler. Bitte versuche es erneut.");
       
        setToastType("error");
        setShowToast(true);
    }
  } catch (err) {
    console.error("❌ Netzwerkfehler:", err);
    setToastMessage("Netzwerkfehler. Bitte versuche es erneut.");
    setToastType("error");
    setShowToast(true);
  }
}

export async function handleLogin({
  email,
  password,
  setStep,
  setToastMessage,
  setToastButtonAction,
  setToastButtonText,
  setToastType,
  setShowToast,
  navigate,
}) {
 
  try {
    const res = await postDataWJSON("users/login/", {
      email,
      password,
    });

    if (res.ok) {
      console.log("✅ Login erfolgreich", res.data);
      localStorage.setItem("auth-user", res.data.token);
      localStorage.setItem("auth-user-id", res.data.user_id);
      navigate("/"); // Navigiere direkt

    } else {
      // Fehlerhafte Logindaten → Backend-Fehler auswerten
      if (!res.ok) {      
        if (res.status === 404) {
          setToastMessage("Diese E-Mail ist nicht registriert.");
          setToastButtonText("Registrieren");
          setToastButtonAction(() => () => {
            setStep("signup");
          });
          setToastType("error");
          setShowToast(true);
          return;
        }
        if (res.status === 401) {
          setToastMessage("Account nicht aktiviert. Bitte bestätige deine E-Mail.");
          setToastType("error");
          setShowToast(true);
          return;
        }

        // Allgemeiner Fehler
        setToastMessage("Login fehlgeschlagen. Bitte überprüfe deine Eingaben.");
        setToastButtonText("OK");
        setToastButtonAction(() => () => {});
        setToastType("error");
        setShowToast(true);
      }
    }
  } catch (err) {
    console.error("❌ Netzwerkfehler:", err);
    setToastMessage("Netzwerkfehler. Bitte versuche es erneut.");
    setToastType("error");
    setShowToast(true);
  }
}

export async function handleForgot({
  email,
  setStep,
  setToastMessage,
  setToastButtonAction,
  setToastButtonText,
  setToastType,
  setShowToast,
  navigateHook
}) {
  navigate = navigateHook();
  try {
    const res = await postDataWJSON("users/reset_password/", {
      email,
    });

    if (res.ok) {
      setToastMessage("E-Mail zum Zurücksetzen des Passworts gesendet.");
      setToastButtonText("Login");
      setToastButtonAction(() => () => {
        setStep("login");
        navigate("/login"); // Redirect to login page
      });
      setToastType("success");
      setShowToast(true);
    } else {
      // Fehlerhafte Logindaten → Backend-Fehler auswerten
      if (!res.ok) {      
        if (res.status === 404) {
          setToastMessage("Diese E-Mail ist nicht registriert.");
          setToastButtonText("Sign Up");
          setToastButtonAction(() => () => {
            setStep("signup");
          });
          setToastType("error");
          setShowToast(true);
          return;
        }

        // Allgemeiner Fehler
        setToastMessage("Fehler beim Zurücksetzen des Passworts. Bitte überprüfe deine Eingaben.");

        setToastType("error");
        setShowToast(true);
      }
    }
  } catch (err) {
    console.error("❌ Netzwerkfehler:", err);
    setToastMessage("Netzwerkfehler. Bitte versuche es erneut.");
    setToastType("error");
    setShowToast(true);
  }
}

export async function handleReset(){
  return
}


