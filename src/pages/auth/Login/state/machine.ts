import { createMachine, assign } from "xstate";
import { AuthError } from "firebase/auth";

import { signInWithEmailAndPassword } from "./actions";

type LoginPageEvent =
  | { type: "AUTH_ERROR"; data: AuthError }
  | { type: "EMAIL_CHANGED"; email: string }
  | { type: "PASSWORD_CHANGED"; password: string }
  | { type: "SUBMIT" };

export type LoginPageContext = {
  email: string;
  password: string;
  errors: string[];
  serverError: string;
};

type LoginPageTypeState =
  | {
      value: "editing";
      context: LoginPageContext & { errors: [] };
    }
  | { value: "failed"; context: LoginPageContext; error: string }
  | {
      value: "success";
      context: LoginPageContext & { errors: []; serverError: "" };
    };

function isEmailInvalid(ctx: LoginPageContext): boolean {
  return ctx.email.length > 0;
}

export default createMachine<
  LoginPageContext,
  LoginPageEvent,
  LoginPageTypeState
>(
  {
    id: "loginPage",
    initial: "editing",
    context: { email: "", password: "", errors: [], serverError: "" },
    states: {
      editing: {
        on: {
          SUBMIT: [
            {
              target: "editing",
              cond: isEmailInvalid.name,
            },
            {
              target: "submitting",
            },
          ],
          EMAIL_CHANGED: {
            actions: assign({ email: (_, { email }) => email }),
          },
          PASSWORD_CHANGED: {
            actions: assign({ password: (_, { password }) => password }),
          },
        },
      },
      submitting: {
        invoke: {
          src: signInWithEmailAndPassword.name,
          onError: {
            target: "failed",
            actions: ["updateError"],
          },
          onDone: {
            target: "authenticated",
            actions: ["navigateToHome"],
          },
        },
      },
      success: {
        type: "final",
      },
      failed: {
        on: {
          EMAIL_CHANGED: {
            actions: assign({ email: (_, { email }) => email }),
          },
          PASSWORD_CHANGED: {
            actions: assign({ password: (_, { password }) => password }),
          },
        },
      },
    },
  },
  {
    services: {
      signInWithEmailAndPassword,
    },
    actions: {
      updateError: (_ctx, evt) => {
        if (evt.type !== "AUTH_ERROR") {
          return;
        }
        console.debug("DAS", evt.data.code);
        if (evt.data.code === "auth/wrong-password") {
          assign({ serverError: "Invalid username or password" });
        }
      },
    },
    guards: {
      isEmailInvalid,
    },
  }
);
