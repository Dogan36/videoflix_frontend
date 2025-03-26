import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import NotFound from "./pages/NotFound";
import Watch from "./pages/Watch";


import "./App.css";
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
      </Routes>
      
    </Router>
  );
}

export default App;