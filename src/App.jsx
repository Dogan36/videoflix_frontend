import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import NotFound from "./pages/NotFound";
import Watch from "./pages/Watch";


import "./App.css";
import ActivationPage from "./pages/ActivationPage";
import ResetPasswort from "./pages/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/legal-notice" element={<LegalNotice/>} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/watch/:movieId" element={<Watch />} />
        <Route path="/activate/:uid/:token" element={<ActivationPage/>} />
        <Route path="/reset-password/:uid/:token" element={<ResetPasswort />} />
      </Routes>
      
    </Router>
  );
}

export default App;