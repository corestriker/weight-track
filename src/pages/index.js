import {
  Box,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import AddWeightForm from "../components/AddWeightForm";
import Layout from "../components/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useRouter } from "next/router";
import WeightChart from "../components/WeightChart";
import BMI from "../components/BMI";
import { useState, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { queryLoadWeightsForUserId } from "../util/queryLoadWeightsForUserId";

const Index = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "gray.900" };
  const color = { light: "black", dark: "white" };
  const [user] = useAuthState(auth);
  const [userSettings, setUserSettings] = useState({});
  const [weights, setWeights] = useState([]);

  useEffect(async () => {
    if (user) {
      //load UserSettings
      const userSettingsRef = await getDoc(doc(db, "user", user.uid));
      setUserSettings(userSettingsRef.data());

      //load weights
      const unsubscribe = onSnapshot(
        queryLoadWeightsForUserId(user.uid, "asc"),
        (snapshot) => {
          setWeights(snapshot.docs);
        }
      );

      // This function will be run when the component will be unmunted
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <Box bg={bgColor[colorMode]} color={color[colorMode]}>
      <Layout>
        <Container pt={4} maxW="container.lg">
          {user ? (
            <>
              <Text fontSize="xl">Welcome {user.displayName}</Text>
              <Container maxW="container.lg">
                <Tabs
                  border="1px"
                  borderRadius="lg"
                  mt={8}
                  p={4}
                  isFitted
                  variant="enclosed"
                  minH={"72"}
                >
                  <TabList mb="1em">
                    <Tab>weight today</Tab>
                    <Tab>weight other day</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <>
                        <AddWeightForm />
                      </>
                    </TabPanel>
                    <TabPanel>
                      <AddWeightForm withDate />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Container>
              <Container mt={8} maxW="container.lg">
                <BMI weights={weights} userSettings={userSettings} />
              </Container>
              <Container mt={8} maxW="container.lg">
                <WeightChart weights={weights} />
              </Container>
            </>
          ) : (
            <Box>
              <Text>Please login to use these App :)</Text>
              <Button
                onClick={() => {
                  router.push("/auth/signin");
                }}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Container>
      </Layout>
    </Box>
  );
};

export default Index;
