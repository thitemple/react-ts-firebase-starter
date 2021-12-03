import React, { ReactElement, ReactNode } from "react";
import { Card, Container } from "react-bulma-components";

export type AuthContainerProps = {
  header: ReactNode;
  children: ReactNode;
};

export default function AuthContainer(props: AuthContainerProps): ReactElement {
  const { children, header } = props;

  return (
    <Container>
      <Card>
        <Card.Header>
          <Card.Header.Title>{header}</Card.Header.Title>
        </Card.Header>
        <Card.Content>{children}</Card.Content>
      </Card>
    </Container>
  );
}
