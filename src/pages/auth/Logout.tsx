import React, { ReactElement } from "react";
import { Button } from "react-bulma-components";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import AuthContainer from "../../components/ui/AuthContainer";
import app from "../../config/firebase";
import logging from "../../config/logging";
const auth = getAuth(app);

export default function LogoutPage(): ReactElement {
  const navigate = useNavigate();

  const logout = (): void => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        logging.error(error);
      });
  };
  return (
    <AuthContainer header="Logout">
      <p>Are you sure you want to logout?</p>
      <Button.Group>
        <Button
          className="is-large"
          color="danger"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
        <Button className="is-large" color="info" onClick={logout}>
          Logout
        </Button>
      </Button.Group>
    </AuthContainer>
  );
}
