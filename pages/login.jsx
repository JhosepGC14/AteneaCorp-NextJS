import React, { Fragment, useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { css } from "@emotion/core";
import { Form, Camp, ButtonSubmit, Error } from "../ui/Form/Form";
//validaciones
import useValidation from "../hooks/useValidation";
import validationLogin from "../validation/validationLogin";
//firebase
import firebase from "../firebase";

const stateInitial = {
  email: "",
  password: "",
};

const Login = () => {
  const [errorCreate, saveErrorCreate] = useState(false);

  const {
    value,
    error,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(stateInitial, validationLogin, LoginUser);

  const { email, password } = value;

  async function LoginUser() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error("It was an error at authenticated", error.message);
      saveErrorCreate(error.message);
    }
  }

  return (
    <Fragment>
      <Layout>
        <section
          css={css`
            height: 100vh;
          `}
        >
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Login
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Camp>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Camp>
            {error.email && <Error>{error.email}</Error>}
            <Camp>
              <label htmlFor="password">Your Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Camp>
            {error.password && <Error>{error.password}</Error>}
            <ButtonSubmit type="submit">Login</ButtonSubmit>
            {errorCreate && <Error>{errorCreate}</Error>}
          </Form>
        </section>
      </Layout>
    </Fragment>
  );
};

export default Login;
