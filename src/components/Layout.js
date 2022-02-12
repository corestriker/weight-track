import { Link } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import HeadTitle from "./HeadTitle";
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";

const Layout = ({ children, variant, tabTitle }) => {
  return (
    <>
      <HeadTitle tabTitle={tabTitle} />
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
      <Footer>
        <a target="_blank" href="https://github.com/corestriker/weight-track">
          <Link>GitHub</Link>
        </a>
      </Footer>
    </>
  );
};

export default Layout;
