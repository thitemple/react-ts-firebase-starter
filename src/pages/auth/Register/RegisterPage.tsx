import React, { ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Icon, Button } from "react-bulma-components";
import { useMachine } from "@xstate/react";

import AuthContainer from "components/ui/AuthContainer";
import ErrorText from "components/ui/ErrorText/ErrorText";
import { registerPageMachine } from "./state";

export default function RegisterPage(): ReactElement {
  const navigate = useNavigate();
  const [state, send] = useMachine(registerPageMachine, {
    actions: {
      navigateToHome: () => {
        navigate("/");
      },
    },
    devTools: true,
  });
  const { email, password, confirmation, error } = state.context;

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            color={state.matches("editing.email.error" as any) ? "danger" : ""}
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
          state.matches("editing.email.error" as any) && (
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
          state.matches("editing.password.error" as any) && (
            <Form.Help color="danger">The password is not valid</Form.Help>
          )
        }
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
            value={confirmation}
            color={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              state.matches("editing.confirmation.error" as any) ? "danger" : ""
            }
            onChange={(e) =>
              send({
                type: "CONFIRMATION_CHANGED",
                confirmation: e.target.value,
              })
            }
          />
          <Icon align="left" size="small">
            <i className="fas fa-key" />
          </Icon>
        </Form.Control>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.matches("editing.confirmation.error" as any) && (
            <Form.Help color="danger">The passwords don't match</Form.Help>
          )
        }
      </Form.Field>
      <Form.Field kind="group">
        <Form.Control>
          <Button
            className="is-large"
            color="primary"
            disabled={state.matches("submitting")}
            onClick={() => send({ type: "SUBMIT" })}
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
      {state.matches("failed") && <ErrorText error={error} />}
    </AuthContainer>
  );
}
