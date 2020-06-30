import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";

const LiProduct = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom 1px solid var(--grayLight);
`;

const DescriptionProduct = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  column-gap: 2rem;
  align-items: center;
`;

const CommentStyle = styled.div`
  margin-top: 2rem;
  display: flex;
  aling-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid var(--grayLight);
    border-radius: 5px;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.4rem;
    margin-right: 1rem;
    font-weight: 700;
    &last-of-type {
      margin: 0;
    }
  }
`;

const ImageProduct = styled.img`
  width: 200px;
`;

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;

const Text_Description = styled.p`
  font-size: 1.2rem;
  color: var(--textGray);
`;

const Like = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid var(--grayLight);
  border-radius: 5px;
  padding: 1rem 3rem;
  img {
    width: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ProductsDetail = ({ products }) => {
  const {
    id,
    nameProduct,
    url,
    urlImage,
    like,
    company,
    description,
    comment,
    created,
  } = products;
  return (
    <LiProduct>
      <DescriptionProduct>
        <div>
          <ImageProduct src={urlImage} alt={nameProduct} />
        </div>
        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <Title>{nameProduct}</Title>
          </Link>
          <div>
            <Text_Description>{description}</Text_Description>
          </div>
          <CommentStyle>
            <div>
              <img src="/static/img/comment.svg" alt="comment-logo" />
              <p>{comment.length} Comentarios</p>
            </div>
          </CommentStyle>
          <p
            css={css`
              font-size: 1.2rem;
              font-weight: 700;
            `}
          >
            Publicado hace:{" "}
            {formatDistanceToNow(new Date(created), {
              locale: es,
            })}
          </p>
        </div>
      </DescriptionProduct>
      <Like>
        <div>
          <img src="/static/img/like.svg" alt="like" />
          <p>{like}</p>
        </div>
      </Like>
    </LiProduct>
  );
};

export default ProductsDetail;
