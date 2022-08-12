import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { Layout } from "~/components/Layout";
import { Image } from "~/components/ui-components/Image";
import { ButtonAddToCart } from "~/components/shoppingCart";

const ProductPage = ({ data }) => {
  const { title, shopifyId, description, media, variants } =
    data.shopifyProduct;
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
          <div className="mt-5 qty">
            <div className="mb-3 qty__label">Quantity</div>
            <div className="inline-flex gap-5 px-4 py-2 border qty__control ">
              <button
                className="qty__control-btn"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <div className="qty__control-value">{quantity}</div>
              <button
                className="qty__control-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
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
