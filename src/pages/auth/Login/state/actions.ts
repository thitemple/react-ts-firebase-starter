import { assign } from "xstate";

import { LoginPageEvent, LoginPageContext } from "./types";

export function updateEmail(_ctx: LoginPageContext, evt: LoginPageEvent): void {
  if (evt.type !== "EMAIL_CHANGED") {
    return;
  }
  assign({ email: evt.email });
}

export function updatePassword(
  _ctx: LoginPageContext,
  evt: LoginPageEvent
): void {
  if (evt.type !== "PASSWORD_CHANGED") {
    return;
  }
  assign({ password: evt.password });
}

export function updateError(_ctx: LoginPageContext, evt: LoginPageEvent): void {
  if (evt.type !== "AUTH_ERROR") {
    return;
  }
  if (evt.data.code === "auth/wrong-password") {
    assign({ error: "Invalid username or password" });
  }
}
