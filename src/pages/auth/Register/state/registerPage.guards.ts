import { RegisterPageContext } from "./registerPage.types";

export function isPasswordInvalid(ctx: RegisterPageContext): boolean {
  return ctx.password.trim().length < 6;
}

export function isConfirmationInvalid(ctx: RegisterPageContext): boolean {
  return ctx.password !== ctx.confirmation;
}

export function isEmailInvalid(ctx: RegisterPageContext): boolean {
  return !ctx.email.includes("@");
}
