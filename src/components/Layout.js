import { Link, Text } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import HeadTitle from "./HeadTitle";
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";
import NextLink from "next/link";

const Layout = ({ children, variant, tabTitle }) => {
  return (
    <>
      <HeadTitle tabTitle={tabTitle} />
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
      <Footer>
        <NextLink href="#">
          <Link>GitHub</Link>
        </NextLink>
      </Footer>
    </>
  );
};

export default Layout;
