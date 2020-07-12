import React, { Fragment, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Section from "../ui/Section";
import LoadingPage from "../components/LoadingPage";
import ProdutcsDetail from "../components/ProductsDetail";
import useProducts from "../hooks/useProducts";
import { css } from "@emotion/core";

const Searching = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  //todos los products
  const { products } = useProducts("created");
  //state resultado
  const [results, setResults] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filter = products.filter((products) => {
      return (
        products.nameProduct.toLowerCase().includes(busqueda) ||
        products.company.toLowerCase().includes(busqueda) ||
        products.description.toLowerCase().includes(busqueda)
      );
    });
    setResults(filter);
  }, [q, products]);

  if (Object.keys(results).length === 0) return <LoadingPage />;

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
                {results.map((products) => (
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

export default Searching;
