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
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

const selectLimit = 5;

const deleteWeight = async (userUid, weightId) => {
  //console.log("deleteing id: " + weightId);
  const weightRef = doc(db, "user", userUid, "weights", weightId);
  await deleteDoc(weightRef);
};

function WeightList({ currentUser }) {
  const [weightList, setWeightList] = useState([]);
  const [lastWeight, setLastWeight] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const wieghtsRef = collection(db, "user", currentUser.uid, "weights");

  useEffect(() => {
    // console.log("useeffect weightList");
    const unsubscribe = onSnapshot(
      query(wieghtsRef, orderBy("date", "desc"), limit(selectLimit)),
      (snapshot) => {
        // console.log("useeffect setting weights for list");
        updateWeightList(snapshot);
      }
    );
    // This function will be run when the component will be unmunted
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const updateWeightList = (weights) => {
    if (weights.size > 0) {
      setWeightList((weightList) => [...weightList, ...weights.docs]);
      setLastWeight(weights.docs[weights.docs.length - 1]);
      if (weights.size < selectLimit) {
        setBtnDisabled(true);
      }
    } else {
      setBtnDisabled(true);
    }
    setLoading(false);
  };

  const fetchMore = async () => {
    setLoading(true);
    await getDocs(
      query(
        wieghtsRef,
        orderBy("date", "desc"),
        limit(selectLimit),
        startAfter(lastWeight)
      )
    ).then((weights) => {
      //console.log(weights.docs);
      updateWeightList(weights);
    });
  };

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
      <Button disabled={btnDisabled} isLoading={loading} onClick={fetchMore}>
        Load More
      </Button>
    </Stack>
  );
}

export default WeightList;
