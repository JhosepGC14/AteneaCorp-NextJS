import React from "react";
import { css } from "@emotion/core";

const PageNotFound = () => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      Page Not Found, Product Doesn't Exist
    </h1>
  );
};

export default PageNotFound;
