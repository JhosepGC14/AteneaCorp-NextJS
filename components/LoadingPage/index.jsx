import React from "react";
import Loader from "react-loader-spinner";
import Layout from "../Layout";
import { css } from "@emotion/core";

const LoadingPage = () => {
  return (
    <Layout>
      <Loader
        css={css`
          height: 100vh;
          display flex;
          justify-content: center;
          align-items: center;
        `}
        type="ThreeDots"
        color="#2c47c8"
        height={80}
        width={80}
      />
    </Layout>
  );
};

export default LoadingPage;
