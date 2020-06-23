import React, { Fragment } from "react";
import Header from "../Header";
import { Global, css } from "@emotion/core";
import Head from "next/head";

const Layout = (props) => {
  return (
    <Fragment>
      <Global
        styles={css`
          :root {
            --gray: #6f6f6f;
            --grayDark: #3d3d3d;
            --grayLight: #e1e1e1;
            --orange: #da552f;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            line-height: 1.5;
            font-family: "Cousine", serif;
          }
          h1,
          h2 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
            font-family: "Roboto", serif;
            font-weight: 500;
          }
          h3 {
            font-family: "Cousine", serif;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          a {
            text-decoration: none;
          }
        `}
      />
      <Head>
        <html lang="es" />
        <title>.:Firebase and Next - Product Hunt:.</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/static/css/app.css" />
      </Head>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
