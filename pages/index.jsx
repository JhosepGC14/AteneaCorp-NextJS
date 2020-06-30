import React, { Fragment, useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import ProdutcsDetail from "../components/ProductsDetail";
import LoadingPage from "../components/LoadingPage";
import Section from "../ui/Section";
import { css } from "@emotion/core";
import { FirebaseContext } from "../firebase";

const Home = () => {
  const [products, saveProducts] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      firebase.db
        .collection("products")
        .orderBy("created", "desc")
        .onSnapshot(manageSnapshot);
    };
    getProducts();
  }, []);

  function manageSnapshot(snapshot) {
    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    saveProducts(products);
  }

  if (Object.keys(products).length === 0) return <LoadingPage />;

  return (
    <Fragment>
      <Layout>
        <Section
          css={css`
            height: 100%;
          `}
        >
          <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white border-5">
                {products.map((products) => (
                  <ProdutcsDetail key={products.id} products={products} />
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </Layout>
    </Fragment>
  );
};

export default Home;
