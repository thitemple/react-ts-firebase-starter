import React, { ReactElement, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Icon, Button } from "react-bulma-components";

import app from "../../config/firebase";
import logging from "../../config/logging";
import AuthContainer from "../../components/ui/AuthContainer";
import ErrorText from "../../components/ui/ErrorText/ErrorText";
const auth = getAuth(app);

export default function RegisterPage(): ReactElement {
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signUpWithEmailAndPassword = (): void => {
    if (password !== confirm) {
      setError("Please make sure your passwords match.");
    }
    if (error !== "") {
      setError("");
    }

    setRegistering(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        logging.info(result);
        navigate("/");
      })
      .catch((error: { code: string }) => {
        logging.error(error);

        if (error.code.includes("auth/weak-password")) {
          setError("Please enter a stronger password.");
        } else if (error.code.includes("auth/email-already-in-use")) {
          setError("E-mail already in use.");
        } else {
          setError("Unable to register. Please try again later.");
        }
        setRegistering(false);
      });
  };

  return (
    <AuthContainer header="Register">
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
        <Form.Label>Confirm your password</Form.Label>
        <Form.Control>
          <Form.Input
            className="is-large"
            autoComplete="new-password"
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Icon align="left" size="small">
            <i className="fas fa-key" />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Form.Field kind="group">
        <Form.Control>
          <Button
            className="is-large"
            color="primary"
            disabled={registering}
            onClick={() => signUpWithEmailAndPassword()}
          >
            Sign Up
          </Button>
        </Form.Control>
        <Form.Control>
          <Button color="link" renderAs={Link} to="/login" text inverted>
            Login
          </Button>
        </Form.Control>
      </Form.Field>
      <ErrorText error={error} />
    </AuthContainer>
  );
}
