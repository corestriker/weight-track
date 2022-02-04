import Head from "next/head";
import React from "react";
import HeadTitle from "./HeadTitle";
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";

const Layout = ({ children, variant, tabTitle }) => {
  return (
    <>
      <HeadTitle tabTitle={tabTitle} />
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
