import React, { useState } from "react";
import { graphql } from "gatsby";
import { Layout } from "~/components/Layout";
import { Image } from "~/components/ui-components/Image";
import { ButtonAddToCart, QuantityControls } from "~/components/shoppingCart";

const ProductPage = ({ data }) => {
  const { title, description, media, variants, options } = data.shopifyProduct;
  const [quantity, setQuantity] = useState(1);

  const optionsObject = options.reduce((acc, option) => {
    acc[option.name] = option.values[0];
    return acc;
  }, {});

  const [selectedOptions, setSelectedOptions] = useState(optionsObject);

  const variantTitles = variants[0].title.split("/").map((item) => item.trim());

  const optionsValues = Object.values(selectedOptions);
  const variant = variants.find((variant) => {
    const arrayFromTitle = variant.title.split("/").map((item) => item.trim());
    return arrayFromTitle.every((item) => optionsValues.includes(item));
  });
  console.log("variant", variant, variants, optionsValues);

  return (
    <Layout>
      <div className="container items-center gap-10 mx-auto my-10 product md:flex">
        <div className="flex-1 product__image">
          {" "}
          <Image img={media[0].image} />{" "}
        </div>
        <div className="flex-1 product__info">
          <h1 className="mb-2 font-bold">{title}</h1>
          <div className="mb-2 font-bold product__price">
            {variants[0].price}eur
          </div>
          <div className="product__description">{description}</div>
          {options.length > 1 && (
            <div className="flex gap-5 mt-5">
              {options.map((option) => {
                const { name, values, shopifyId } = option;
                return (
                  <div key={shopifyId}>
                    <label htmlFor="options" className="block mb-1  font-bold">
                      {name}
                    </label>
                    <form action="">
                      <select
                        name="options"
                        id="options"
                        onChange={(e) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            [name]: e.target.value,
                          })
                        }
                      >
                        {values.map((value, i) => (
                          <option value={value} key={i}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>
                );
              })}
            </div>
          )}
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
