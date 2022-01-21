import { assign } from "xstate";

import { RegisterPageEvent, RegisterPageContext } from "./registerPage.types";

export const updateEmail = assign(
  (_ctx: RegisterPageContext, evt: RegisterPageEvent): { email?: string } => {
    if (evt.type !== "EMAIL_CHANGED") {
      return {};
    }
    return { email: evt.email };
  }
);

export const updatePassword = assign(
  (
    _ctx: RegisterPageContext,
    evt: RegisterPageEvent
  ): { password?: string } => {
    if (evt.type !== "PASSWORD_CHANGED") {
      return {};
    }

    return { password: evt.password };
  }
);

export const updateConfirmation = assign(
  (
    _ctx: RegisterPageContext,
    evt: RegisterPageEvent
  ): { confirmation?: string } => {
    if (evt.type !== "CONFIRMATION_CHANGED") {
      return {};
    }

    return { confirmation: evt.confirmation };
  }
);

export const updateError = assign(
  (_ctx: RegisterPageContext, evt: RegisterPageEvent): { error?: string } => {
    if (evt.type !== "error.platform.createUserWithEmailAndPassword") {
      return {};
    }
    switch (evt.data.code) {
      case "auth/email-already-in-use":
        return { error: "E-mail already in use" };
      default:
        return { error: "Unexpected error" };
    }
  }
);
