import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../config/firebase";

export type AuthRouteProps = {
  children: ReactNode;
};

export default function AuthRoute(props: AuthRouteProps): ReactElement | null {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/login");
    } else {
      setAuthenticated(true);
    }
  }, [auth.currentUser]);

  return authenticated ? <div>{children}</div> : null;
}
