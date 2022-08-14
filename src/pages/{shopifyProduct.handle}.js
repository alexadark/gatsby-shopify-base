import React, { useState } from "react";
import { graphql } from "gatsby";
import { Layout } from "~/components/Layout";
import { Image } from "~/components/ui-components/Image";
import { ButtonAddToCart, QuantityControls } from "~/components/shoppingCart";

const ProductPage = ({ data }) => {
  const { title, description, media, variants } = data.shopifyProduct;
  const [quantity, setQuantity] = useState(1);

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
          <QuantityControls quantity={quantity} setQuantity={setQuantity} />

          <div className="mt-5 buttons">
            <ButtonAddToCart
              variantId={variants[0].shopifyId}
              quantity={quantity}
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
