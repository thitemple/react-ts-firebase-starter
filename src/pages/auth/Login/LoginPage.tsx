import React, { ReactElement, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Icon, Button } from "react-bulma-components";
import { useMachine } from "@xstate/react";

import { Providers } from "config/firebase";
import AuthContainer from "components/ui/AuthContainer";
import ErrorText from "components/ui/ErrorText/ErrorText";
import loginPageMachine from "./state";

export default function LoginPage(): ReactElement {
  const [current, send] = useMachine(loginPageMachine);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { email, password } = current.context;

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
            onChange={(e) =>
              send({ type: "EMAIL_CHANGED", email: e.target.value })
            }
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
            onChange={(e) =>
              send({ type: "PASSWORD_CHANGED", password: e.target.value })
            }
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
            disabled={current.matches("authenticating")}
            onClick={() => send({ type: "FORM_SUBMITTED" })}
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
        disabled={current.matches("authenticating")}
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
