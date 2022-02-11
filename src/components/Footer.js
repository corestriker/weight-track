import { Box, Flex, useColorMode } from "@chakra-ui/react";
import React from "react";

const Footer = (props) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.300", dark: "black" };
  const color = { light: "black", dark: "white" };
  return (
    <Box mt={8}>
      <Flex
        flexDirection="column"
        as="footer"
        py={8}
        justify="center"
        alignItems="center"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        {...props}
      />
    </Box>
  );
};

export default Footer;
