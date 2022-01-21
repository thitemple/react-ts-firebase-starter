import { createMachine } from "xstate";

import {
  RegisterPageContext,
  RegisterPageEvent,
  RegisterPageTypeState,
} from "./registerPage.types";
import {
  updateError,
  updateEmail,
  updateConfirmation,
  updatePassword,
} from "./registerPage.actions";
import {
  isEmailInvalid,
  isConfirmationInvalid,
  isPasswordInvalid,
} from "./registerPage.guards";
import { createUserWithEmailAndPassword } from "./registerPage.services";

export default createMachine<
  RegisterPageContext,
  RegisterPageEvent,
  RegisterPageTypeState
>(
  {
    id: "registerPage",
    initial: "editing",
    context: { email: "", password: "", confirmation: "" },
    states: {
      editing: {
        on: {
          SUBMIT: [
            { target: "editing.email.error", cond: isEmailInvalid.name },
            { target: "editing.password.error", cond: isPasswordInvalid.name },
            {
              target: "editing.confirmation.error",
              cond: isConfirmationInvalid.name,
            },
            { target: "submitting" },
          ],
          EMAIL_CHANGED: {
            actions: ["updateEmail"],
          },
          PASSWORD_CHANGED: {
            actions: ["updatePassword"],
          },
          CONFIRMATION_CHANGED: {
            actions: ["updateConfirmation"],
          },
        },
        type: "parallel",
        states: {
          email: {
            initial: "valid",
            states: {
              valid: {},
              error: {
                on: {
                  EMAIL_CHANGED: {
                    target: "#registerPage.editing",
                    actions: ["updateEmail"],
                  },
                },
              },
            },
          },
          password: {
            initial: "valid",
            states: {
              valid: {},
              error: {
                on: {
                  PASSWORD_CHANGED: {
                    target: "#registerPage.editing",
                    actions: ["updatePassword"],
                  },
                },
              },
            },
          },
          confirmation: {
            initial: "valid",
            states: {
              valid: {},
              error: {
                on: {
                  CONFIRMATION_CHANGED: {
                    target: "#registerPage.editing",
                    actions: ["updateConfirmation"],
                  },
                },
              },
            },
          },
        },
      },
      submitting: {
        invoke: {
          src: createUserWithEmailAndPassword.name,
          onDone: "success",
          onError: "failed",
        },
      },
      failed: {
        on: {
          EMAIL_CHANGED: {
            target: "editing",
            actions: ["updateEmail"],
          },
          PASSWORD_CHANGED: {
            target: "editing",
            actions: ["updatePassword"],
          },
          CONFIRMATION_CHANGED: {
            target: "editing",
            actions: ["updateConfirmation"],
          },
        },
        entry: ["updateError"],
      },
      success: {
        type: "final",
        entry: ["navigateToHome"],
      },
    },
  },
  {
    actions: {
      updateEmail,
      updatePassword,
      updateConfirmation,
      updateError,
    },
    guards: {
      isPasswordInvalid,
      isEmailInvalid,
      isConfirmationInvalid,
    },
    services: {
      createUserWithEmailAndPassword,
    },
  }
);
