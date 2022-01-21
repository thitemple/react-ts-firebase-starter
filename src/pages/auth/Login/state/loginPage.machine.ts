import { createMachine } from "xstate";

import {
  LoginPageContext,
  LoginPageEvent,
  LoginPageTypeState,
} from "./loginPage.types";
import { updateEmail, updatePassword, updateError } from "./loginPage.actions";
import {
  signInWithEmailAndPassword,
  signInWithSocialMedia,
} from "./loginPage.services";
import {
  isEmailEmpty,
  isEmailInvalid,
  isPasswordEmpty,
} from "./loginPage.guards";

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
            actions: ["updateEmail"],
          },
          PASSWORD_CHANGED: {
            actions: ["updatePassword"],
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
                  empty: {
                    on: {
                      EMAIL_CHANGED: {
                        target: "#loginPage.editing",
                        actions: ["updateEmail"],
                      },
                    },
                  },
                  invalid: {
                    on: {
                      EMAIL_CHANGED: {
                        target: "#loginPage.editing",
                        actions: ["updateEmail"],
                      },
                    },
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
                initial: "empty",
                states: {
                  empty: {
                    on: {
                      PASSWORD_CHANGED: {
                        target: "#loginPage.editing",
                        actions: ["updatePassword"],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      signingInWithSocialMedia: {
        invoke: {
          src: signInWithSocialMedia.name,
          onError: "failed",
          onDone: "success",
        },
      },
      submitting: {
        invoke: {
          src: signInWithEmailAndPassword.name,
          onError: "failed",
          onDone: "success",
        },
      },
      success: {
        type: "final",
        entry: ["navigateToHome"],
      },
      failed: {
        entry: ["updateError"],
        on: {
          EMAIL_CHANGED: {
            target: "editing",
            actions: ["updateEmail"],
          },
          PASSWORD_CHANGED: {
            target: "editing",
            actions: ["updatePassword"],
          },
        },
      },
    },
  },
  {
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
    services: {
      signInWithEmailAndPassword,
      signInWithSocialMedia,
    },
  }
);
