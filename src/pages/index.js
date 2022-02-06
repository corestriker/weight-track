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
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import WeightChart from "../components/WeightChart";

const Index = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.800" };
  const color = { light: "black", dark: "white" };
  const [user] = useAuthState(auth);

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
                <Text>Chart:</Text>
                <WeightChart user={user} />
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
