import React, { Fragment, useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Search from "../../ui/Search/Search";
import Navigation from "../Navigation";
import Button from "../../ui/Button/Button";
//firebase
import { FirebaseContext } from "../../firebase";

const ContainerHeader = styled.div`
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--blue);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Cousine", serif;
  margin-right: 2rem;
  cursor: pointer;
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
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
            width: 75%;
            flex-wrap: wrap;
          `}
        >
          <Link href="/">
            <Logo>ATENEA CORP.</Logo>
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
                Hello: {user.displayName}
              </span>
              <Button
                bgColor="true"
                onClick={() => {
                  firebase.logOut();
                }}
              >
                Log Out
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Link href="/login">
                <Button
                  css={css`
                    margin-right: 2rem;
                  `}
                  bgColor="true"
                >
                  Login
                </Button>
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
