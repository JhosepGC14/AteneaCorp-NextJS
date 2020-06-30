import React, { Fragment, useState, useContext } from "react";
import Layout from "../components/Layout";
import Section from "../ui/Section";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import { css } from "@emotion/core";
import { Form, Camp, ButtonSubmit, Error } from "../ui/Form/Form";
//validaciones
import useValidation from "../hooks/useValidation";
import validationProduct from "../validation/validationProduct";
//firebase
import { FirebaseContext } from "../firebase";

const stateInitial = {
  nameProduct: "",
  company: "",
  // image: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  //state de las imagenes
  const [nameImage, saveNameImage] = useState("");
  const [upload, saveUpload] = useState(false);
  const [progress, saveProgress] = useState(0);
  const [urlImage, saveUrlImage] = useState("");

  //state de los errores
  const [errorCreate, saveErrorCreate] = useState(false);

  const {
    value,
    error,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(stateInitial, validationProduct, createProduct);

  const { nameProduct, company, image, url, description } = value;

  //hook de routing para redireccionar
  const router = useRouter();

  //context con las operaciones CRUD de firebase
  const { user, firebase } = useContext(FirebaseContext);

  console.log("info aqui", user);

  async function createProduct() {
    console.log("CREANDO PRODUCTO...");

    //si no hay usuario logeado llevar al login
    if (!user) {
      return router.push("/login");
    }

    //creando el objeto de nuevo producto
    const product = {
      nameProduct,
      company,
      url,
      urlImage,
      description,
      like: 0,
      comment: [],
      created: Date.now(),
      createdBy: {
        id: user.uid,
        name: user.displayName,
      },
    };

    //insertarlo en la base de datos
    firebase.db.collection("products").add(product);

    return router.push("/");
  }

  //funciones de las imagenes
  const handleUploadStart = () => {
    saveProgress(0);
    saveUpload(true);
  };

  const handleProgress = (progress) => saveProgress({ progress });

  const handleUploadError = (error) => {
    saveUpload(error);
    console.error(error);
  };

  const handleUploadSuccess = (nameImage) => {
    saveProgress(100);
    saveUpload(false);
    saveNameImage(nameImage);
    firebase.storage
      .ref("products")
      .child(nameImage)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        saveUrlImage(url);
      });
  };

  return (
    <Fragment>
      <Layout>
        <Section
          css={css`
            height: 100%;
          `}
        >
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Create New Product
          </h1>
          <Form
            onSubmit={handleSubmit}
            noValidate
            css={css`
              max-width: 50%;
            `}
          >
            <fieldset
              css={css`
                margin-bottom: 10px;
              `}
            >
              <legend>General Information</legend>
              <Camp>
                <label htmlFor="nameProduct">Name's Product:</label>
                <input
                  type="text"
                  id="nameProduct"
                  placeholder="Name Complete"
                  name="nameProduct"
                  value={nameProduct}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Camp>
              {error.nameProduct && <Error>{error.nameProduct}</Error>}

              <Camp>
                <label htmlFor="company">Company Name:</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Company Name"
                  name="company"
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Camp>
              {error.company && <Error>{error.company}</Error>}

              <Camp>
                <label htmlFor="image">Imagen:</label>
                <FileUploader
                  accept="image/*"
                  id="image"
                  placeholder="Image"
                  name="image"
                  randomizeFilename
                  storageRef={firebase.storage.ref("products")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Camp>

              <Camp>
                <label htmlFor="url">URL:</label>
                <input
                  type="url"
                  id="url"
                  placeholder="URL"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Camp>
              {error.url && <Error>{error.url}</Error>}
            </fieldset>

            <fieldset
              css={css`
                margin-bottom: 30px;
              `}
            >
              <legend>About your Product</legend>
              <Camp>
                <label htmlFor="Description">Description:</label>
                <textarea
                  id="description"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Camp>
              {error.description && <Error>{error.description}</Error>}
            </fieldset>
            <ButtonSubmit type="submit">Create Product</ButtonSubmit>
            {errorCreate && <Error>{errorCreate}</Error>}
          </Form>
        </Section>
      </Layout>
    </Fragment>
  );
};

export default NewProduct;
