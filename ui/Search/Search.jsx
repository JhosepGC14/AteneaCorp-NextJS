import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const InputText = styled.input`
  border: 1px solid var(--grayLight);
  padding: 1rem;
  min-width: 300px;
  border-radius: 5px;
`;

const ButtonSearch = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 3rem;
  background-image: url(/static/img/buscar.png);
  background-repeat: no-repeat;
  position: absolute;
  right: 5.6rem;
  top: 5px;
  background-color: white;
  border: none;
  text-indent: -9999px;
  &hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    right: -12.6rem;
  }
`;

const Search = () => {
  return (
    <form
      action=""
      css={css`
        width: 32%;
        position: relative;
      `}
    >
      <InputText type="text" placeholder="Search Products" />
      <ButtonSearch type="submit">Search</ButtonSearch>
    </form>
  );
};

export default Search;
