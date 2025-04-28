import { postDataWJSON } from "./api";

import { removeAuthCredentials } from "./api";

export async function handleRegistration({ email, password, passwordRepeat }) {
    const res = await postDataWJSON("users/register/", {
      email,
      password,
      password2: passwordRepeat,
    });
  return res;
}

export async function handleLogin({ email, password }) {
  const res = await postDataWJSON("users/login/", {
    email,
    password,
  });
  return res;
}

export async function handleForgot({ email }) {
    const res = await postDataWJSON("users/password-reset/", {
      email,
    });
  return res;
}

export async function handleLogout() {
  try {
    removeAuthCredentials();
    return true;
  } catch (error) {
    return error;
  }
}

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

export async function resendActivation(email) {
  const res = await postDataWJSON("users/resend-activation/", {
    email,
  });
  return res;
}
