import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bulma-components";

import { auth } from "config/firebase";

export default function HomePage(): ReactElement {
  return (
    <Container>
      <Card>
        <Card.Content>
          <p>Welcome to this page that is protected by Firebase auth!</p>
          <p>
            User: {auth.currentUser?.displayName ?? auth.currentUser?.email}
          </p>
          <p>
            <Link to="/update-password">Update password</Link>
          </p>
          <p>
            Click <Link to="/logout">here</Link> to logout
          </p>
        </Card.Content>
      </Card>
    </Container>
  );
}
