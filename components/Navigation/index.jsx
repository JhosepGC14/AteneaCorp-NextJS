import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";

const Nav = styled.nav`
  padding-left: 2rem;
  ul {
    display: flex;
    align-items: center;
  }
  ul li a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray);
    font-family: "Cousine", sans-serif;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      text-decoration: underline;
      font-weight: 700;
    }
  }
`;

const Navigation = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <Nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/mostPopular">
            <a>Most Popular</a>
          </Link>
        </li>
        {user && (
          <li>
            <Link href="/newProduct">
              <a>Create Product</a>
            </Link>
          </li>
        )}
      </ul>
    </Nav>
  );
};

export default Navigation;
