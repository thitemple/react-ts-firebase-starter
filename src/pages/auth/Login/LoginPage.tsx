import React, { ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Icon, Button } from "react-bulma-components";
import { useMachine } from "@xstate/react";

import { loginPageMachine } from "./state";
import AuthContainer from "components/ui/AuthContainer";
import ErrorText from "components/ui/ErrorText/ErrorText";
import { Providers } from "config/firebase";

export default function LoginPage(): ReactElement {
  const navigate = useNavigate();
  const [state, send] = useMachine(loginPageMachine, {
    actions: {
      navigateToHome: () => {
        navigate("/");
      },
    },
    devTools: true,
  });
  const { email, password, error } = state.context;
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
            color={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              state.matches("editing.email.error" as any) ? "danger" : ""
            }
            onChange={(e) =>
              send({ type: "EMAIL_CHANGED", email: e.target.value })
            }
          />
          <Icon align="left" size="small">
            <i className="fas fa-envelope" />
          </Icon>
        </Form.Control>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.matches("editing.email.error.empty" as any) && (
            <Form.Help color="danger">The e-mail must not be empty</Form.Help>
          )
        }
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.matches("editing.email.error.invalid" as any) && (
            <Form.Help color="danger">The e-mail is not valid</Form.Help>
          )
        }
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
            color={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              state.matches("editing.password.error" as any) ? "danger" : ""
            }
            onChange={(e) =>
              send({ type: "PASSWORD_CHANGED", password: e.target.value })
            }
          />
          <Icon align="left" size="small">
            <i className="fas fa-key" />
          </Icon>
        </Form.Control>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.matches("editing.password.error.empty" as any) && (
            <Form.Help color="danger">The password must not be empty</Form.Help>
          )
        }
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Button
            className="is-large"
            color="primary"
            type="submit"
            disabled={state.matches("submitting")}
            onClick={() => send({ type: "SUBMIT" })}
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
      {state.matches("failed") && <ErrorText error={error} />}
      <hr />
      <Button
        disabled={state.matches("signingInWithSocialMedia")}
        onClick={() =>
          send({
            type: "SIGN_IN_WITH_SOCIAL_MEDIA",
            provider: Providers.google,
          })
        }
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
