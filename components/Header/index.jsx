import React, { Fragment } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Search from "../ui/Search";
import Navigation from "../Navigation";
import Button from "../ui/Button";

const ContainerHeader = styled.div`
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Cousine", serif;
  margin-right: 2rem;
  cursor: pointer;
`;

const Header = () => {
  const user = false;
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--grayLight);
        padding: 1rem 0;
      `}
    >
      <ContainerHeader>
        <div
          css={css`
            display: flex;
            align-items: center;
            width: 80%;
          `}
        >
          <Link href="/">
            <Logo>ATENEA-HUNT</Logo>
          </Link>
          {/* Buscador Aqui */}
          <Search />
          {/* nav aqui */}
          <Navigation />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <Fragment>
              <span
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hello: Jhosep
              </span>
              <Button bgColor="true">Log Out</Button>
            </Fragment>
          ) : (
            <Fragment>
              <Link href="/login">
                <Button bgColor="true">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </Fragment>
          )}
        </div>
      </ContainerHeader>
    </header>
  );
};

export default Header;
