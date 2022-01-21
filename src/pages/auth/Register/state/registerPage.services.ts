import {
  createUserWithEmailAndPassword as performCreateUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

import { auth } from "config/firebase";
import { RegisterPageContext } from "./registerPage.types";

export async function createUserWithEmailAndPassword({
  email,
  password,
}: RegisterPageContext): Promise<UserCredential> {
  return await performCreateUserWithEmailAndPassword(auth, email, password);
}
