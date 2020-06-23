import React from "react";
import Link from "next/link";
import { css } from "@emotion/core";

const Navigation = () => {
  return (
    <nav
      css={css`
        margin-left: 2rem;
        width: 30%;
      `}
    >
      <ul
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/nosotros">Most Popular</Link>
        </li>
        <li>
          <Link href="/nosotros">New Product</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
