import { AuthError, AuthProvider } from "firebase/auth";

export type LoginPageEvent =
  | { type: "AUTH_ERROR"; data: AuthError }
  | { type: "EMAIL_CHANGED"; email: string }
  | { type: "PASSWORD_CHANGED"; password: string }
  | { type: "SIGN_IN_WITH_SOCIAL_MEDIA"; provider: AuthProvider }
  | { type: "SUBMIT" };

export type LoginPageContext = {
  email: string;
  password: string;
  error?: string;
};

export type LoginPageTypeState =
  | {
      value: "editing";
      context: LoginPageContext & { error: undefined };
    }
  | {
      value: "submitting";
      context: LoginPageContext & { error: undefined };
    }
  | {
      value: "signingInWithSocialMedia";
      context: LoginPageContext & { error: undefined };
    }
  | { value: "failed"; context: LoginPageContext; error: string }
  | {
      value: "success";
      context: LoginPageContext & { error: undefined };
    };
