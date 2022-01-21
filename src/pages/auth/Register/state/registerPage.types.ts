import { FirebaseError } from "firebase/app";

export type RegisterPageEvent =
  | {
      type: "error.platform.createUserWithEmailAndPassword";
      data: FirebaseError;
    }
  | { type: "EMAIL_CHANGED"; email: string }
  | { type: "PASSWORD_CHANGED"; password: string }
  | { type: "CONFIRMATION_CHANGED"; confirmation: string }
  | { type: "SUBMIT" };

export type RegisterPageContext = {
  email: string;
  password: string;
  confirmation: string;
  error?: string;
};

export type RegisterPageTypeState =
  | {
      value: "editing";
      context: RegisterPageContext & { error: undefined };
    }
  | {
      value: "submitting";
      context: RegisterPageContext & { error: undefined };
    }
  | { value: "failed"; context: RegisterPageContext; error: string }
  | {
      value: "success";
      context: RegisterPageContext & { error: undefined };
    };
