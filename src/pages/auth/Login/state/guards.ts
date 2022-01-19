import { LoginPageContext } from "./types";

export function isEmailEmpty(ctx: LoginPageContext): boolean {
  return ctx.email.trim().length === 0;
}

export function isPasswordEmpty(ctx: LoginPageContext): boolean {
  return ctx.email.trim().length === 0;
}

export function isEmailInvalid(ctx: LoginPageContext): boolean {
  return !ctx.email.includes("@");
}
