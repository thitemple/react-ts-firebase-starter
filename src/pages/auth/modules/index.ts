import { AuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { auth } from "../../../config/firebase";
export async function SignInWithSocialMedia(
  provider: AuthProvider
): Promise<UserCredential> {
  return await new Promise<UserCredential>((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}
