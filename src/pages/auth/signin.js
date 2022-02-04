import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
// import { getProviders, signIn as signInToProvider } from "next-auth/react";
import React from "react";
import { auth, provider } from "../../../firebase";
import HeadTitle from "../../components/HeadTitle";
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";

// function signin({ providers }) {
function signin() {
  const router = useRouter();

  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.800" };
  const color = { light: "black", dark: "white" };

  const googleHandler = async () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });
        router.push("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Box bg={bgColor[colorMode]} color={color[colorMode]} h="100vh">
      <HeadTitle tabTitle="sign in" />
      <NavBar />
      <Box pt={4}>
        <Flex
          flexDirection="column"
          alignItems="center"
          h="100vh"
          minH="100vh"
          justifyContent="center"
          textAlign="center"
          mt={-56}
        >
          <Heading>Weight-Tracker</Heading>
          <Box mt={8}>
            <div>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={async () => {
                  await googleHandler();
                }}
              >
                sign in with Google
              </Button>
            </div>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }

export default signin;
