import React from "react";
import { graphql } from "gatsby";
import { Layout } from "~/components/Layout";
import { Image } from "~/components/ui-components/Image";
import { ButtonAddToCart } from "~/components/Cart";

const ProductPage = ({ data }) => {
  const { title, shopifyId, description, media, variants } =
    data.shopifyProduct;

  return (
    <Layout>
      <div className="container items-center gap-10 mx-auto product md:flex">
        <div className="flex-1 product__image">
          {" "}
          <Image img={media[0].image} />{" "}
        </div>
        <div className="flex-1 product__info">
          <h1 className="mb-2 font-bold">{title}</h1>
          <div className="mb-2 font-bold product__price">
            {variants[0].price}$
          </div>
          <div className="product__description">{description}</div>
          <div className="mt-5 buttons">
            <ButtonAddToCart
              variantId={variants[0].shopifyId}
              className="btn"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;

export const pageQuery = graphql`
  query ($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      ...ProductFragment
    }
  }
`;
