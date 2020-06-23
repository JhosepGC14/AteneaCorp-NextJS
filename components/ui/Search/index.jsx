import React from "react";
import { css } from "@emotion/core";

const Search = () => {
  return (
    <form
      action=""
      css={css`
        width: 30%;
      `}
    >
      <input type="text" />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
