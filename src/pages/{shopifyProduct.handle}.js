import React from "react";
import { graphql } from "gatsby";

const ProductPage = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ProductPage;

export const pageQuery = graphql`
  query ($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      title
      description
      hasOnlyDefaultVariant
      hasOutOfStockVariants
      id
      options {
        name
        position
        shopifyId
        values
      }
      variants {
        availableForSale
        compareAtPrice
        price
        shopifyId
        displayName
        selectedOptions {
          name
          value
        }
        title
        taxable
        taxCode
        media {
          ... on ShopifyMediaImage {
            id
            image {
              gatsbyImageData
              altText
            }
          }
        }
      }
      media {
        ... on ShopifyMediaImage {
          image {
            gatsbyImageData
            altText
          }
        }
      }
    }
  }
`;
