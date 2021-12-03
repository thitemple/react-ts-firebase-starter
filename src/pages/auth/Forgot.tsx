import React, { ReactElement, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Form, Icon, Button } from "react-bulma-components";

import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import AuthContainer from "../../components/ui/AuthContainer";
import ErrorText from "../../components/ui/ErrorText/ErrorText";

export default function ForgotPasswordPage(): ReactElement | null {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const resetPasswordRequest = (): void => {
    if (error !== "") {
      setError("");
    }

    setSending(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        logging.info("Email sent");
        setSent(true);
        setSending(false);
      })
      .catch((error: { message: string }) => {
        logging.error(error);
        setError(error.message);
        setSending(false);
      });
  };

  return (
    <AuthContainer header="Send password reset">
      {sent ? (
        <p>A link has been sent to your email with instructions.</p>
      ) : (
        <>
          <Form.Field>
            <Form.Label>Please enter your e-mail</Form.Label>
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
            <Form.Control>
              <Button
                className="is-large"
                color="primary"
                disabled={sending}
                onClick={() => resetPasswordRequest()}
              >
                Send reset link
              </Button>
            </Form.Control>
          </Form.Field>
          <ErrorText error={error} />
        </>
      )}
    </AuthContainer>
  );
}
