import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../config/firebase";

import { AuthEvents } from "./auth.types";

export function watchAuthState(): (
  callback: (eventType: AuthEvents["type"]) => void
) => () => void {
  return (callback: (eventType: AuthEvents["type"]) => void) => {
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
