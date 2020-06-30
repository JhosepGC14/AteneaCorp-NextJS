import React, { Fragment, useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { css } from "@emotion/core";
import Section from "../ui/Section";
import { Form, Camp, ButtonSubmit, Error } from "../ui/Form/Form";
//validaciones
import useValidation from "../hooks/useValidation";
import validationRegister from "../validation/validationRegister";
//firebase
import firebase from "../firebase";

const stateInitial = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [errorCreate, saveErrorCreate] = useState(false);

  const {
    value,
    error,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(stateInitial, validationRegister, registerUser);

  const { name, email, password } = value;

  async function registerUser() {
    try {
      await firebase.register(name, email, password);
      Router.push("/newProduct");
    } catch (error) {
      console.error("It was a error ", error.message);
      saveErrorCreate(error.message);
    }
  }

  return (
    <Fragment>
      <Layout>
        <Section
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
            Register
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Camp>
              <label htmlFor="name">Name Complete:</label>
              <input
                type="text"
                id="name"
                placeholder="Name Complete"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Camp>
            {error.name && <Error>{error.name}</Error>}
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
            <ButtonSubmit type="submit">Register</ButtonSubmit>
            {errorCreate && <Error>{errorCreate}</Error>}
          </Form>
        </Section>
      </Layout>
    </Fragment>
  );
};

export default Register;
