import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
// import { getProviders, signIn as signInToProvider } from "next-auth/react";
import React from "react";
import { auth, provider } from "../../../firebase";
import NavBar from "../../components/NavBar";

// function signin({ providers }) {
function signin() {
  const router = useRouter();

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
    <>
      <NavBar />
      <Flex
        flexDirection="column"
        alignItems="center"
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
    </>
  );
}

// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }

export default signin;
