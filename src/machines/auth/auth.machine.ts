import { createMachine } from "xstate";

import { AuthContext, AuthEvents } from "./auth.types";
import { watchAuthState } from "./auth.services";

export default createMachine<AuthContext, AuthEvents>(
  {
    id: "auth",
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: watchAuthState.name,
          onDone: "unauthenticated",
        },
        on: {
          SIGN_IN: "authenticated",
          SIGN_OUT: "unauthenticated",
        },
      },
      authenticated: {
        on: {
          SIGN_OUT: "unauthenticated",
        },
      },
      unauthenticated: {
        on: {
          SIGN_IN: "authenticated",
        },
      },
    },
  },
  {
    services: {
      watchAuthState,
    },
  }
);
