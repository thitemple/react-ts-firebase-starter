import { createMachine } from "xstate";

import { LoginPageContext, LoginPageEvent, LoginPageTypeState } from "./types";
import { updateEmail, updatePassword, updateError } from "./actions";
import { signInWithEmailAndPassword, signInWithSocialMedia } from "./services";
import { isEmailEmpty, isEmailInvalid, isPasswordEmpty } from "./guards";

export default createMachine<
  LoginPageContext,
  LoginPageEvent,
  LoginPageTypeState
>(
  {
    id: "loginPage",
    initial: "editing",
    context: { email: "", password: "" },
    states: {
      editing: {
        on: {
          SUBMIT: [
            {
              target: "editing.email.error.empty",
              cond: isEmailEmpty.name,
            },
            {
              target: "editing.email.error.invalid",
              cond: isEmailInvalid.name,
            },
            {
              target: "editing.password.error.empty",
              cond: isPasswordEmpty.name,
            },
            {
              target: "submitting",
            },
          ],
          EMAIL_CHANGED: {
            actions: updateEmail.name,
          },
          PASSWORD_CHANGED: {
            actions: updatePassword.name,
          },
          SIGN_IN_WITH_SOCIAL_MEDIA: "signingInWithSocialMedia",
        },
        type: "parallel",
        states: {
          email: {
            initial: "valid",
            states: {
              valid: {},
              error: {
                initial: "empty",
                states: {
                  empty: {},
                  invalid: {},
                },
              },
            },
          },
          password: {
            initial: "valid",
            states: {
              valid: {},
              error: {
                initial: "empty",
                states: {
                  empty: {},
                },
              },
            },
          },
        },
      },
      signingInWithSocialMedia: {
        invoke: {
          src: signInWithSocialMedia.name,
          onError: {
            target: "failed",
            actions: updateError.name,
          },
          onDone: {
            target: "success",
            actions: ["navigateToHome"],
          },
        },
      },
      submitting: {
        invoke: {
          src: signInWithEmailAndPassword.name,
          onError: {
            target: "failed",
            actions: updateError.name,
          },
          onDone: {
            target: "success",
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
            actions: updateEmail.name,
          },
          PASSWORD_CHANGED: {
            actions: updatePassword.name,
          },
        },
      },
    },
  },
  {
    services: {
      signInWithEmailAndPassword,
      signInWithSocialMedia,
    },
    actions: {
      updateEmail,
      updatePassword,
      updateError,
    },
    guards: {
      isEmailEmpty,
      isEmailInvalid,
      isPasswordEmpty,
    },
  }
);
