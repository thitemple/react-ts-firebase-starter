import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { Form, Icon, Button } from "react-bulma-components";

import app from "../../config/firebase";
import logging from "../../config/logging";
import AuthContainer from "../../components/ui/AuthContainer";
import ErrorText from "../../components/ui/ErrorText/ErrorText";
const auth = getAuth(app);

export default function ResetPasswordPage(): ReactElement | null {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [changing, setChanging] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [oobCode, setOobCode] = useState("");
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const oobCodeParam = searchParams.get("oobCode");

  const verifyPasswordResetLink = (code = ""): void => {
    verifyPasswordResetCode(auth, code)
      .then((result) => {
        logging.info(result);
        setVerifying(false);
        setVerified(true);
        setOobCode(code);
      })
      .catch((error) => {
        logging.error(error);
        setVerifying(false);
        setVerified(false);
      });
  };

  useEffect(() => {
    if (oobCodeParam !== null) {
      verifyPasswordResetLink(oobCodeParam);
    }
  }, []);

  const passwordResetRequest = (): void => {
    if (password !== confirm) {
      setError("Make sure your passwords are matching");
      return;
    }

    if (error !== "") {
      setError("");
    }

    if (auth.currentUser === null) {
      navigate("/login");
      return;
    }

    setChanging(true);
    confirmPasswordReset(auth, oobCode, password)
      .then(() => {
        navigate("/login");
      })
      .catch((error: { message: string }) => {
        logging.error(error);
        setChanging(false);
        setError(error.message);
      });
  };

  return (
    <AuthContainer header="Reset password">
      {verifying ? (
        <div>loading</div>
      ) : (
        <>
          {verified ? (
            <>
              <p>Please enter a strong password</p>
              <Form.Field>
                <Form.Label>New password</Form.Label>
                <Form.Control>
                  <Form.Input
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Icon align="left" size="small">
                    <i className="fas fa-key" />
                  </Icon>
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control>
                  <Form.Input
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm your new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <Icon align="left" size="small">
                    <i className="fas fa-key" />
                  </Icon>
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Button
                    color="primary"
                    disabled={changing}
                    onClick={passwordResetRequest}
                  >
                    Reset password
                  </Button>
                </Form.Control>
              </Form.Field>
            </>
          ) : (
            <p>Invalid link</p>
          )}
        </>
      )}
      <ErrorText error={error} />
    </AuthContainer>
  );
}
