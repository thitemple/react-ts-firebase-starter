import {
  signInWithEmailAndPassword as performSignInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

import { SignInWithSocialMedia } from "../../modules";
import { auth } from "config/firebase";
import { LoginPageContext, LoginPageEvent } from "./types";

export async function signInWithEmailAndPassword({
  email,
  password,
}: LoginPageContext): Promise<UserCredential> {
  return await performSignInWithEmailAndPassword(auth, email, password);
}

export async function signInWithSocialMedia(
  _ctx: LoginPageContext,
  evt: LoginPageEvent
): Promise<UserCredential> {
  if (evt.type !== "SIGN_IN_WITH_SOCIAL_MEDIA") {
    return await Promise.reject("Invalid event");
  }
  return await SignInWithSocialMedia(evt.provider);
}
