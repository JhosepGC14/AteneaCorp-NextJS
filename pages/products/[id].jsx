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

const CreadorProduct = styled.p`
  padding: 0.5rem 2rem;
  background-image: linear-gradient(#6637eb, #6639ed);
  color: white;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
`;

const Products = () => {
  //state del producto
  const [products, saveProducts] = useState({});

  //state del error
  const [error, setError] = useState(false);

  //state de los comentarios
  const [comments, setComments] = useState({});
  const [querydatabase, setQuerydatabase] = useState(true);

  //routing para obtener el id actual
  const router = useRouter();

  //destructuring
  const {
    query: { id },
  } = router;

  //context de firebase
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && querydatabase) {
      const getProducts = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        if (product.exists) {
          saveProducts(product.data());
          setQuerydatabase(false);
        } else {
          setError(true);
          setQuerydatabase(false);
        }
      };
      getProducts();
    }
  }, [id]);

  if (Object.keys(products).length === 0 && !error) return <LoadingPage />;

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
    liked,
  } = products;

  //Administrar y validar like a un producto
  const likeProducts = () => {
    if (!user) {
      return router.push("/login");
    }

    // obtener y sumar un nuevo like
    const newLike = like + 1;

    //verificar si el usuario actual ha votado
    if (liked.includes(user.uid)) return;

    //guardar el id del usuario que ha votado
    const haveLiked = [...liked, user.uid];

    //actualizar en la BD
    firebase.db
      .collection("products")
      .doc(id)
      .update({ like: newLike, liked: haveLiked });

    //actualizar el State
    saveProducts({
      ...products,
      like: newLike,
    });
    setQuerydatabase(true); // hay un voto consultar a la BD
  };

  //functions for create comment
  const commentChange = (e) => {
    setComments({
      ...comments,
      [e.target.name]: e.target.value,
    });
  };

  //identificamos si el comentario es del creador del producto
  const isCreated = (id) => {
    if (createdBy.id === id) {
      return true;
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!user) {
      return router.push("/login");
    }

    //info extra al comentario
    comments.userId = user.uid;
    comments.userName = user.displayName;

    //tomar copia de commentarios y agregarlos al arreglo
    const newComments = [...comment, comments];

    //actualizar la BD
    firebase.db.collection("products").doc(id).update({
      comment: newComments,
    });

    //actualizar el State
    saveProducts({
      ...products,
      comment: newComments,
    });
    setQuerydatabase(true); // hay un comment consultar a la BD
  };

  //funcion que revisa que el creador sea el mismo q esta autenticado

  const canDeleteProducts = () => {
    if (!user) return false;
    if (createdBy.id === user.uid) {
      return true;
    }
  };

  //elimina un producto de la BD
  const deleteProducts = async () => {
    if (!user) {
      return router.push("/login");
    }

    if (createdBy.id !== user.uid) {
      return router.push("/login");
    }
    try {
      await firebase.db.collection("products").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log("hubo un error en el delete", error);
    }
  };

  return (
    <Fragment>
      <Layout>
        <Section
          css={css`
            height: 100%;
          `}
        >
          {error ? (
            <PageNotFound />
          ) : (
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

                  {user && (
                    <>
                      <h2>Add your Comment:</h2>
                      <form onSubmit={addComment}>
                        <Camp>
                          <input
                            type="text"
                            name="message"
                            onChange={commentChange}
                          />
                        </Camp>
                        <ButtonSubmit type="submit">ADD COMMENT </ButtonSubmit>
                      </form>
                    </>
                  )}

                  <h2
                    css={css`
                      margin: 2rem 0;
                    `}
                  >
                    Comments:
                  </h2>
                  {comment.length === 0 ? (
                    <h3>There's no comments</h3>
                  ) : (
                    <ul>
                      {comment.map((comment, i) => (
                        <li
                          key={`${comment.userId}-${i}`}
                          css={css`
                            border: 1px solid #e1e1e1;
                            padding: 2rem;
                            border-radius: 8px;
                            background: var(--grayLight);
                            margin-bottom: 2rem;
                          `}
                        >
                          <p>{comment.message}</p>
                          <p>
                            Written by:
                            <span
                              css={css`
                                font-weight: bold;
                              `}
                            >
                              {""} {comment.userName}
                            </span>
                          </p>
                          {isCreated(comment.userId) && (
                            <CreadorProduct> It's Creator</CreadorProduct>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
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
                    {user && (
                      <Button
                        css={css`
                          margin: auto;
                        `}
                        onClick={likeProducts}
                      >
                        Give Like
                      </Button>
                    )}
                  </div>
                </aside>
              </ContainerProduct>

              {canDeleteProducts() && (
                <Button
                  css={css`
                    width: 30%;
                    margin: auto !important;
                  `}
                  bgColor={true}
                  onClick={deleteProducts}
                >
                  Delete Product
                </Button>
              )}
            </div>
          )}
        </Section>
      </Layout>
    </Fragment>
  );
};

export default Products;
