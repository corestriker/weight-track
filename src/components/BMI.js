import { Box, Heading, Link, Text } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import NextLink from "next/link";

const calcBMI = (weight, height) => {
  return (parseInt(weight) / Math.pow(height / 100, 2)).toFixed(1);
};

function BMI({ user }) {
  //console.log(user.uid);
  const [userSettings, setUserSettings] = useState({});
  const [lastWeight, setLastWeight] = useState(null);

  useEffect(async () => {
    console.log("useEffect BMI");
    const userSettingsRef = await getDoc(doc(db, "user", user.uid));
    setUserSettings(userSettingsRef.data());

    const unsubscribe = onSnapshot(
      query(
        collection(db, "user", user.uid, "weights"),
        orderBy("date", "desc"),
        limit(1)
      ),
      (snapshot) => {
        // console.log(snapshot.docs);
        snapshot.docs.forEach((doc) => {
          // console.log(doc.data());
          // console.log("lastweight" + doc.data().weight);
          setLastWeight(doc.data().weight);
          //break;
        });
      }
    );
    // This function will be run when the component will be unmunted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box>
      <Heading>BMI:</Heading>
      <Text>Hight: {userSettings.height} cm</Text>
      <Text>Last Weight: {lastWeight} kg</Text>
      <Text>BMI: {calcBMI(lastWeight, userSettings.height)}</Text>

      <Text>
        Take a futher look into BMI {"->  "}
        <NextLink href="https://en.wikipedia.org/wiki/Body_mass_index" passHref>
          <Link>Wikipedia BMI</Link>
        </NextLink>
      </Text>
    </Box>
  );
}

export default BMI;
