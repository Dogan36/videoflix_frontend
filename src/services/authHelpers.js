import { postDataWJSON } from "./api";
import { removeAuthCredentials } from "./api";

/**
 * Handles user registration by sending a POST request to the server.
 */
export async function handleRegistration({ email, password, passwordRepeat }) {
    const res = await postDataWJSON("users/register/", {
      email,
      password,
      password2: passwordRepeat,
    });
  return res;
}

/**
 * Handles user login by sending a POST request to the server.
 */
export async function handleLogin({ email, password }) {
  const res = await postDataWJSON("users/login/", {
    email,
    password,
  });
  return res;
}

/**
 * Handles user activation by sending a POST request to the server.
 */
export async function handleForgot({ email }) {
    const res = await postDataWJSON("users/password-reset/", {
      email,
    });
  return res;
}

/**
 * Handles user logout by removing authentication credentials.
 * This function does not send a request to the server.
 */
export async function handleLogout() {
  try {
    removeAuthCredentials();
    return true;
  } catch (error) {
    return error;
  }
}

/**
 * Handles password reset confirmation by sending a POST request to the server.
 * It requires the new password, password confirmation, user ID, and token.
 */
export async function handleReset(password, passwordRepeat, uid, token) {
    const res = await postDataWJSON(
      `users/password-reset-confirm/${uid}/${token}/`,
      {
        password,
        password2: passwordRepeat,
      }
    );
  return res;
}

/**
 * Resends the activation email to the user.
 * This function sends a POST request to the server with the user's email.
 */
export async function resendActivation(email) {
  const res = await postDataWJSON("users/resend-activation/", {
    email,
  });
  return res;
}
