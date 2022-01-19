import React, { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { Progress, Box, Section } from "react-bulma-components";
import "bulma/css/bulma.min.css";
import { useMachine } from "@xstate/react";

import routes from "./config/routes";
import AuthRoute from "./components/ui/AuthRoute";
import { authMachine } from "./machines/auth";

function Application(): ReactElement {
  const [authState] = useMachine(authMachine);

  if (authState.matches("loading")) {
    return (
      <Box>
        <Progress color="info" />
      </Box>
    );
  }

  return (
    <Section>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                <AuthRoute>
                  <route.component />
                </AuthRoute>
              ) : (
                <route.component />
              )
            }
          />
        ))}
      </Routes>
    </Section>
  );
}

export default Application;
