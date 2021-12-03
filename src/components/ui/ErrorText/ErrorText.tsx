import React, { ReactElement } from "react";
import { Notification } from "react-bulma-components";

export type ErrorTextProps = {
  error: string;
};

export default function ErrorText(props: ErrorTextProps): ReactElement | null {
  const { error } = props;

  if (error === "") {
    return null;
  }

  return <Notification color="danger">{error}</Notification>;
}
