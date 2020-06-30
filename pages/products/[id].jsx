import React, { useEffect, useContext, useState, Fragment } from "react";
//components
import Layout from "../../components/Layout";
import Section from "../../ui/Section";
import PageNotFound from "../../components/PageNotFound";
import LoadingPage from "../../components/LoadingPage";
//next y styledComponent
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Camp, ButtonSubmit } from "../../ui/Form/Form";
import Button from "../../ui/Button/Button";
//firebase
import { FirebaseContext } from "../../firebase";
//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

//styles
const ContainerProduct = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
    img {
      display: block;
      margin: 5rem auto;
    }
  }
`;

const Products = () => {
  //state del producto
  const [products, saveProducts] = useState({});

  //state del error
  const [error, setError] = useState(false);

  //routing para obtener el id actual
  const router = useRouter();

  //destructuring
  const {
    query: { id },
  } = router;

  //context de firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const getProducts = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        if (product.exists) {
          saveProducts(product.data());
        } else {
          setError(true);
        }
      };
      getProducts();
    }
  }, [id]);

  if (Object.keys(products).length === 0) return <LoadingPage />;

  const {
    nameProduct,
    url,
    urlImage,
    like,
    company,
    description,
    comment,
    created,
    createdBy,
  } = products;
  return (
    <Fragment>
      <Layout>
        <Section
          css={css`
            height: 100%;
          `}
        >
          {error && <PageNotFound />}
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
              `}
            >
              {nameProduct}
            </h1>
            <ContainerProduct>
              <div>
                <p
                  css={css`
                    font-size: 1.4rem;
                    font-weight: 700;
                  `}
                >
                  Publicado hace:{" "}
                  {formatDistanceToNow(new Date(created), {
                    locale: es,
                  })}
                </p>
                <p
                  css={css`
                    font-size: 1.4rem;
                    font-weight: 700;
                  `}
                >
                  Por: {createdBy.name} de la Empresa {company}
                </p>
                <img src={urlImage} alt={nameProduct} />
                <p
                  css={css`
                    text-align: justify;
                  `}
                >
                  {description}
                </p>

                <h2>Add your Comment:</h2>
                <form>
                  <Camp>
                    <input type="text" name="message" />
                  </Camp>
                  <ButtonSubmit type="submit">ADD COMMENT </ButtonSubmit>
                </form>
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comments:
                </h2>
                {comment.map((comment) => (
                  <li>
                    <p>{comment.name}</p>
                    <p>Written by: {comment.username}</p>
                  </li>
                ))}
              </div>
              <aside>
                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <Button target="_blank" bgColor="true" href={url}>
                    Visit URL
                  </Button>
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {like} Likes
                  </p>
                  <Button
                    css={css`
                      margin: auto;
                    `}
                  >
                    Give Like
                  </Button>
                </div>
              </aside>
            </ContainerProduct>
          </div>
        </Section>
      </Layout>
    </Fragment>
  );
};

export default Products;
