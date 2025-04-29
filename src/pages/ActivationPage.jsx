import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "@/services/api"; 
import LoginHeader from "../components/LoginHeader";

function ActivationPage() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await getData(`/users/activate/${uid}/${token}/`);
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Activation error:", err);
        setStatus("error");
      }
    };

    activate();
  }, [uid, token]);

  return (
    <>
    <LoginHeader context="activate" />
    <div style={{ padding: "1rem", textAlign: "center" }}>
      {status === "loading" && <p>Activating your account...</p>}
      {status === "success" && <p>✅ Your account has been activated!<br/>You can now log in.</p>}
      {status === "error" && <p>❌ Activation failed. The link might be invalid or expired.</p>}
    </div>
    </>
  );
}

export default ActivationPage;
