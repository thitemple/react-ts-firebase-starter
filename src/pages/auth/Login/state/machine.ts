import { createMachine } from "xstate";

type LoginPageEvent =
  | { type: "EMAIL_CHANGED"; email: string }
  | { type: "PASSWORD_CHANGED"; password: string }
  | { type: "FAILED"; error: string }
  | { type: "FORM_SUBMITTED" };

type Field = "email" | "password";

export type LoginPageContext = {
  email: string;
  password: string;
  errors?: Array<[Field, string]>;
};

type LoginPageTypeState =
  | { value: "loaded"; context: LoginPageContext & { errors: undefined } }
  | {
      value: "authenticating";
      context: LoginPageContext & { errors: undefined };
    }
  | { value: "failed"; context: LoginPageContext }
  | {
      value: "authenticated";
      context: LoginPageContext & { errors: undefined };
    }
  | { value: "invalid"; context: LoginPageContext };

export default createMachine<
  LoginPageContext,
  LoginPageEvent,
  LoginPageTypeState
>({
  id: "loginPage",
  initial: "loaded",
  context: { email: "", password: "", errors: [] },
  states: {
    loaded: {
      on: {
        FORM_SUBMITTED: {
          target: "authenticating",
        },
      },
    },
    authenticating: {},
    authenticated: {},
    failed: {},
    invalid: {},
  },
});
