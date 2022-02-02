import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const bgColor = { light: "gray.100", dark: "gray.900" };
  const color = { light: "black", dark: "white" };

  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      p={2}
    >
      <Flex flex={1} m="auto" maxW={1100} align="center">
        <NextLink href="/">
          <Link>
            <Heading>Weight-Tracker</Heading>
          </Link>
        </NextLink>

        <Flex ml="auto" alignItems="center">
          <Switch
            mr={4}
            color="green"
            isChecked={isDark}
            onChange={toggleColorMode}
          />
          {user ? (
            <>
              <NextLink href="/user">
                <Image
                  cursor="pointer"
                  mr={4}
                  borderRadius="full"
                  border="1px"
                  borderColor="white"
                  boxSize="2.5rem"
                  src={user.photoURL}
                  alt="profile-image"
                />
              </NextLink>
              <Button
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      console.log("logged out");
                      router.push("/");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                router.push("/auth/signin");
              }}
            >
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
