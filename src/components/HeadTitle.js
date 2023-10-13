import Head from "next/head";
import React from "react";

function HeadTitle({ tabTitle }) {
  return (
    <Head>
      <title>Weight Track test {tabTitle && "- " + tabTitle}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default HeadTitle;
