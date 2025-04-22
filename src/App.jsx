import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import NotFound from "./pages/NotFound";
import Watch from "./pages/Watch";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import "./App.css";
import ActivationPage from "./pages/ActivationPage";
import ResetPasswort from "./pages/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route
          path="/watch"
          element={
            <PrivateRoute>
              <Watch />
            </PrivateRoute>
          }
        />
        <Route
          path="/watch/:movieId"
          element={
            <PrivateRoute>
              <Watch />
            </PrivateRoute>
          }
        />
        <Route path="users/activate/:uid/:token" element={<ActivationPage />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPasswort />} />
      </Routes>
    </Router>
  );
}

export default App;
