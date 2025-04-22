import { postDataWJSON } from "./api";
import { setAuthCredentials } from "./api";
import { removeAuthCredentials } from "./api";
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
      console.log("✅ Registrierung erfolgreich", res.data);
      setToastType("success");
      setToastMessage(
        "Registrierung erfolgreich! Bitte überprüfe deine E-Mails."
      );
      setToastButtonText("Log in");
      setToastButtonAction(() => () => {
        setShowToast(false);
        setStep("login");
      });
      setShowToast(true);

      return;
    }

    // Fehlerbehandlung anhand von Statuscodes
    console.log("handleRegistration", res.status, res.data);
    switch (res.status) {
      case 400:
        console.log("E-Mail bereits registriert", res.data);
        if (
          res.data?.email?.[0] === "custom user with this email already exists."
        ) {
          setToastMessage("E-Mail-Adresse bereits registriert.");
          setToastButtonText("Login");
          setToastButtonAction(() => () => {
            setShowToast(false);
            setStep("login");
          });
          setToastType("error");
          setShowToast(true);
        } else {
          setToastMessage(
            "Fehler bei der Registrierung. Bitte überprüfe deine Eingaben."
          );
          setToastButtonText("OK");
          setToastButtonAction(() => () => {
            setShowToast(false);
            setStep("signup");
          });
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
  console.log("handleLogin", email, password);

  try {
    const res = await postDataWJSON("users/login/", {
      email,
      password,
    });

    if (res.ok) {
      console.log("✅ Login erfolgreich", res.data);
      setAuthCredentials(res.data.token, res.data.user_id); // Setze Authentifizierungsdaten
      navigate("/"); // Navigiere direkt
    } else {
      // Fehlerhafte Logindaten → Backend-Fehler auswerten
      if (!res.ok) {
        console.log("❌ Login fehlgeschlagen", res.status, res.data);
        if (res.status === 404) {
          setToastMessage("Diese E-Mail ist nicht registriert.");
          setToastButtonText("Registrieren");
          setToastButtonAction(() => () => {
            setShowToast(false);
            setStep("signup");
          });
          setToastType("error");
          setShowToast(true);
          return;
        }
        if (res.status === 401) {
          setToastMessage(
            "Account nicht aktiviert. Bitte bestätige deine E-Mail."
          );
          setToastType("error");
          setShowToast(true);
          return;
        }

        // Allgemeiner Fehler
        console.log("allgemeiner Fehler", res.status, res.data);
        setToastMessage(
          "Login fehlgeschlagen. Bitte überprüfe deine Eingaben."
        );
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
  navigateHook,
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
        setToastMessage(
          "Fehler beim Zurücksetzen des Passworts. Bitte überprüfe deine Eingaben."
        );

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

export async function handleLogout() {
  try {
    removeAuthCredentials();
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export async function handleReset(
  password,
  passwordRepeat,
  uid,
  token,
  setStep,
  setToastMessage,
  setToastButtonAction,
  setToastButtonText,
  setToastType,
  setShowToast
) {
  try {
    const res = await postDataWJSON(
      `users/reset_password_confirm/${uid}/${token}`,
      {
        password,
        password2: passwordRepeat,
      }
    );

    if (res.ok) {
      setToastMessage("Passwort erfolgreich zurückgesetzt.");
      setToastButtonText("Login");
      setToastButtonAction(() => () => setStep("login"));
      setToastType("success");
      setShowToast(true);
    } else {
      // Fehlerbehandlung anhand von Statuscodes
      switch (res.status) {
        case 400:
          setToastMessage(
            "Fehler beim Zurücksetzen des Passworts. Bitte überprüfe deine Eingaben."
          );
          break;
        default:
          setToastMessage("Unbekannter Fehler. Bitte versuche es erneut.");
      }
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
