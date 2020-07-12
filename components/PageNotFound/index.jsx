import React from "react";
import { css } from "@emotion/core";

const PageNotFound = () => {
  return (
    <section
      css={css`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <h1
        css={css`
          margin-top: 5rem;
          text-align: center;
        `}
      >
        Page Not Found or Product Doesn't Exist
      </h1>
    </section>
  );
};

export default PageNotFound;
