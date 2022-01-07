import {
  AuthProvider,
  signInWithEmailAndPassword as performSignInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "config/firebase";
import { SignInWithSocialMedia } from "../../modules";
import { LoginPageContext } from "./machine";
import logging from "config/logging";

export function signInWithEmailAndPassword({
  email,
  password,
}: LoginPageContext): void {
  performSignInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      logging.info(result);
      navigate("/");
    })
    .catch(() => {
      send({
        type: "FAILED",
        error: "Unable to sign in. Please try again later",
      });
    });
}

export function signInWithSocialMedia(provider: AuthProvider): void {
  SignInWithSocialMedia(provider)
    .then((result) => {
      logging.info(result);
      navigate("/");
    })
    .catch((error: { message: string }) => {
      send({ type: "FAILED", error: error.message });
    });
}
