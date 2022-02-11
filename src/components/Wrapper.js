import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";

export const WrapperVariant = "small" | "regular";

const Wrapper = ({ children, variant = "regular" }) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.100", dark: "gray.800" };

  const color = { light: "black", dark: "white" };

  return (
    <Box
      height="100%"
      minH="100vh"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "1000px" : "500px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
