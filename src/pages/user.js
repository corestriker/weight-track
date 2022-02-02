import { Box, useColorMode } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import Layout from "../components/Layout";
import { queryLoadWeightsForUserId } from "../util/queryLoadWeightsForUserId";

function user() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.800" };
  const color = { light: "black", dark: "white" };
  const [weights, setWeights] = useState([]);

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

  useEffect(() => {
    if (currentUser) {
      return onSnapshot(
        queryLoadWeightsForUserId(currentUser.uid, "desc"),
        (snapshot) => {
          setWeights(snapshot.docs);
        }
      );
    } else {
      return null;
    }
  }, [currentUser]);

  return (
    <Box bg={bgColor[colorMode]} color={color[colorMode]}>
      <Layout>
        <div>User</div>
        <Box>
          {weights &&
            weights.length > 0 &&
            weights.map((weight) => (
              <Box key={weight.id} mt={4}>
                <p>Weight: {weight.data().weight} kg</p>
                <p>
                  Date:{" "}
                  {weight.data().date.toDate().toLocaleDateString("de-DE")}
                </p>
              </Box>
            ))}
        </Box>
      </Layout>
    </Box>
  );
}

export default user;
