export const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email";
    }
    return "";
  };

export const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

export const validatePasswordRepeat = (password, passwordRepeat) => {
    if (!passwordRepeat) {
      return "Password confirmation is required";
    }
    if (password !== passwordRepeat) {
      return "Passwords do not match";
    }
    return "";
  };