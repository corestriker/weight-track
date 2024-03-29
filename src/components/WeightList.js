import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

//Achtung mit pagination das delete geht dann aber nicht mehr

const deleteWeight = async (userUid, weightId) => {
  //console.log("deleteing id: " + weightId);
  const weightRef = doc(db, "user", userUid, "weights", weightId);
  await deleteDoc(weightRef);
};

function WeightList({ currentUser }) {
  const [weightList, setWeightList] = useState([]);

  const wieghtsRef = collection(db, "user", currentUser.uid, "weights");

  useEffect(() => {
    // console.log("useeffect weightList");
    const unsubscribe = onSnapshot(
      query(wieghtsRef, orderBy("date", "desc")),
      (snapshot) => {
        console.log("useeffect setting weights for list");

        setWeightList(snapshot.docs);
      }
    );
    // This function will be run when the component will be unmunted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Stack spacing={4} borderWidth={1} p={8} borderRadius="lg">
      <Heading fontSize="xl">Added Weights: </Heading>
      {weightList && weightList.length > 0
        ? weightList.map((w) => (
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
