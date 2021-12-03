import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updatePassword } from "firebase/auth";
import { Form, Icon, Button } from "react-bulma-components";

import app from "../../config/firebase";
import logging from "../../config/logging";
import AuthContainer from "../../components/ui/AuthContainer";
import ErrorText from "../../components/ui/ErrorText/ErrorText";
const auth = getAuth(app);

export default function ChangePasswordPage(): ReactElement | null {
  const [changing, setChanging] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [old, setOld] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser?.providerData[0]?.providerId !== "password") {
      navigate("/");
    }
  }, []);

  const passwordChangeRequest = (): void => {
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
    updatePassword(auth.currentUser, password)
      .then(() => {
        logging.info("Password change successful.");
        navigate("/");
      })
      .catch((error) => {
        logging.error(error);
        setChanging(false);
        setError("Unable to change the password. Please try again later");
      });
  };

  return (
    <AuthContainer header="Update password">
      <Form.Field>
        <Form.Label>Current password</Form.Label>
        <Form.Control>
          <Form.Input
            className="is-large"
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Current password"
            value={old}
            onChange={(e) => setOld(e.target.value)}
          />
          <Icon align="left" size="small">
            <i className="fas fa-key" />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>New password</Form.Label>
        <Form.Control>
          <Form.Input
            className="is-large"
            autoComplete="new-password"
            type="password"
            name="password"
            id="password"
            placeholder="New password"
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
      <Form.Field>
        <Form.Control>
          <Button
            className="is-large"
            color="primary"
            disabled={changing}
            onClick={passwordChangeRequest}
          >
            Update password
          </Button>
        </Form.Control>
      </Form.Field>
      <ErrorText error={error} />
    </AuthContainer>
  );
}
