import { assign } from "xstate";

import { LoginPageEvent, LoginPageContext } from "./loginPage.types";

export const updateEmail = assign(
  (_ctx: LoginPageContext, evt: LoginPageEvent): { email?: string } => {
    if (evt.type !== "EMAIL_CHANGED") {
      return {};
    }
    return { email: evt.email };
  }
);

export const updatePassword = assign(
  (_ctx: LoginPageContext, evt: LoginPageEvent): { password?: string } => {
    if (evt.type !== "PASSWORD_CHANGED") {
      return {};
    }

    return { password: evt.password };
  }
);

export const updateError = assign(
  (_ctx: LoginPageContext, evt: LoginPageEvent): { error?: string } => {
    if (evt.type !== "error.platform.signInWithEmailAndPassword") {
      return {};
    }
    if (evt.data.code === "auth/wrong-password") {
      return { error: "Invalid username or password" };
    }
    return { error: "Unexpected error" };
  }
);
