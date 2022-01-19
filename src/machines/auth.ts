import { createMachine } from "xstate";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase";

type Context = unknown;

type Events = { type: "SIGN_IN" } | { type: "SIGN_OUT" };

function watchAuthState() {
  return (callback: (eventType: Events["type"]) => void) => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        callback("SIGN_IN");
      } else {
        callback("SIGN_OUT");
      }
    });

    return () => {
      console.debug("exiting");
    };
  };
}

export const authMachine = createMachine<Context, Events>(
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
