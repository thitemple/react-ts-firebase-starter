import React, { ReactElement, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Progress, Box, Section } from "react-bulma-components";
import { onAuthStateChanged } from "firebase/auth";
import "bulma/css/bulma.min.css";

import routes from "./config/routes";
import AuthRoute from "./components/ui/AuthRoute";
import { auth } from "./config/firebase";
import logging from "./config/logging";

function Application(): ReactElement {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        logging.info("User detected.");
      } else {
        logging.info("No user detected.");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
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
