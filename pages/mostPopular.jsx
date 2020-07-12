import React, { Fragment } from "react";
import Layout from "../components/Layout";
import ProdutcsDetail from "../components/ProductsDetail";
import LoadingPage from "../components/LoadingPage";
import Section from "../ui/Section";
import { css } from "@emotion/core";
import useProducts from "../hooks/useProducts";

const MostPopular = () => {
  const { products } = useProducts("like");

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

export default MostPopular;
