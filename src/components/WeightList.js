import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { queryLoadWeightsForUserId } from "../util/queryLoadWeightsForUserId";

const deleteWeight = async (userUid, weightId) => {
  //console.log("deleteing id: " + weightId);
  const weightRef = doc(db, "user", userUid, "weights", weightId);
  await deleteDoc(weightRef);
};

function WeightList({ currentUser }) {
  const [weights, setWeights] = useState([]);

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
  }, [currentUser, weights]);

  return (
    <Stack spacing={4} borderWidth={1} p={8} borderRadius="lg">
      <Heading fontSize="xl">Added Weights: </Heading>
      {weights && weights.length > 0
        ? weights.map((w) => (
            <Flex
              key={w.id}
              p={4}
              shadow="md"
              borderRadius="lg"
              borderWidth="1px"
              alignItems="center"
            >
              <Heading fontSize="xl" pr={6}>
                {w.data().weight} kg
              </Heading>

              <Text>
                added at: {w.data().date.toDate().toLocaleDateString("de-DE")}
              </Text>

              <Box ml="auto">
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  aria-label="Delete Weight"
                  onClick={async () => {
                    await deleteWeight(currentUser.uid, w.id);
                  }}
                  icon={<DeleteIcon />}
                />
              </Box>
            </Flex>
          ))
        : null}
    </Stack>
  );
}

export default WeightList;
