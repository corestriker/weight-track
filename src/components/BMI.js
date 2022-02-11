import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import NextLink from "next/link";
import { coloringOptions } from "../util/coloringOptions";

const calcBMI = (weight, height) => {
  return (parseInt(weight) / Math.pow(height / 100, 2)).toFixed(1);
};

function BMI({ weights, userSettings }) {
  const [firstWeight, setFirstWeight] = useState(null);
  const [lastWeight, setLastWeight] = useState(null);
  const [diffWeight, setDiffWeight] = useState(null);
  const [coloring, setColoring] = useState("");

  useEffect(async () => {
    //console.log(weights.length - 1);
    if (weights.length > 0) {
      setFirstWeight(weights[0].data().weight);
      setLastWeight(weights[weights.length - 1].data().weight);

      setDiffWeight(lastWeight - firstWeight);
    }

    // Detmine coloring
    if (userSettings) {
      const colorOption = userSettings.colorOption;
      if (colorOption === "none") {
      } else if (colorOption === "weightLoss") {
        if (diffWeight <= 0) {
          setColoring("green.500");
        } else {
          setColoring("red.500");
        }
      } else if (colorOption === "weightGain") {
        if (diffWeight >= 0) {
          setColoring("green.500");
        } else {
          setColoring("red.500");
        }
      }
    }
  }, [weights, diffWeight]);

  return (
    <Box mt={10}>
      {/* <Heading>BMI:</Heading> */}
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex alignItems="center">
          <Text fontSize="xl" pr={2}>
            actual weight:{" "}
          </Text>
          <Text color={coloring} fontSize="xl">
            {lastWeight} kg
          </Text>
        </Flex>

        <Flex alignItems="center">
          <Text fontSize="xl" pr={2}>
            diff from start:{" "}
          </Text>
          <Text color={coloring} fontSize="xl">
            {diffWeight > 0 ? "+" + diffWeight : diffWeight} kg
          </Text>
        </Flex>

        <Text pt={2} fontSize="xl">
          BMI: {calcBMI(lastWeight, userSettings.height)}
        </Text>

        <Text pt={2}>
          Take a futher look into BMI {"->  "}
          <NextLink
            href="https://en.wikipedia.org/wiki/Body_mass_index"
            passHref
          >
            <Link>Wikipedia BMI</Link>
          </NextLink>
        </Text>
      </Flex>
    </Box>
  );
}

export default BMI;
