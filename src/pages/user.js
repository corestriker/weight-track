import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import Layout from "../components/Layout";
import UserSettingsForm from "../components/UserSettingsForm";
import WeightList from "../components/WeightList";

function user() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.800" };
  const color = { light: "black", dark: "white" };

  const [currentUser, setCurrentUser] = useState(null);

  // Listen to onAuthStateChanged
  useEffect(() => {
    if (auth) {
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setCurrentUser(authUser);
        } else {
          setCurrentUser(null);
        }
      });
    }
  }, []);

  return (
    <Box bg={bgColor[colorMode]} color={color[colorMode]}>
      <Layout tabTitle="User">
        <div>User</div>

        {currentUser && (
          <Box p={4} borderWidth={1} borderRadius="lg">
            <Heading>Settings:</Heading>
            <UserSettingsForm currentUser={currentUser} />
          </Box>
        )}
        <Box pt={8}>
          {currentUser && <WeightList currentUser={currentUser} />}
        </Box>
      </Layout>
    </Box>
  );
}

export default user;
