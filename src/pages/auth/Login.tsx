import React, { ReactElement, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  AuthProvider,
} from "firebase/auth";
import { Form, Icon, Button } from "react-bulma-components";

import app, { Providers } from "../../config/firebase";
import logging from "../../config/logging";
import AuthContainer from "../../components/ui/AuthContainer";
import ErrorText from "../../components/ui/ErrorText/ErrorText";
import { SignInWithSocialMedia } from "./modules";
const auth = getAuth(app);

export default function LoginPage(): ReactElement {
  const [authenticating, setAuthenticating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signIn = (): void => {
    if (error !== "") {
      setError("");
    }

    setAuthenticating(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        logging.info(result);
        navigate("/");
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError("Unable to sign in. Please try again later");
      });
  };

  const signInWithSocialMedia = (provider: AuthProvider): void => {
    if (error !== "") {
      setError("");
    }

    setAuthenticating(true);
    SignInWithSocialMedia(provider)
      .then((result) => {
        logging.info(result);
        navigate("/");
      })
      .catch((error: { message: string }) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <AuthContainer header="Log in">
      <Form.Field>
        <Form.Label>E-mail</Form.Label>
        <Form.Control>
          <Form.Input
            className="is-large"
            type="email"
            name="email"
            id="email"
            placeholder="Your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Icon align="left" size="small">
            <i className="fas fa-envelope" />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>Password</Form.Label>
        <Form.Control>
          <Form.Input
            className="is-large"
            autoComplete="new-password"
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Icon align="left" size="small">
            <i className="fas fa-key" />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Button
            className="is-large"
            color="primary"
            type="submit"
            disabled={authenticating}
            onClick={() => signIn()}
          >
            Login
          </Button>
        </Form.Control>
      </Form.Field>
      <small className="is-size-6-touch">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p>
          <Link to="/password-reset">Forgot your password?</Link>
        </p>
      </small>
      <ErrorText error={error} />
      <hr />
      <Button
        disabled={authenticating}
        onClick={() => signInWithSocialMedia(Providers.google)}
        style={{
          backgroundColor: "#ea4335",
          borderColor: "#ea4335",
          color: "white",
        }}
      >
        <Icon size="small">
          <i className="fab fa-google"></i>
        </Icon>
        <span>Sign in with Google</span>
      </Button>
    </AuthContainer>
  );
}
