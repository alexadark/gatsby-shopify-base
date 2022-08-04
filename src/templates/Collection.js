import React from "react";
import { graphql } from "gatsby";

const Collection = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Collection;

export const pageQuery = graphql`
  query MyQuery($handle: String!, $limit: Int!, $skip: Int) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      handle
      shopifyId
      description
    }
    allShopifyProduct(
      filter: { collections: { elemMatch: { handle: { eq: $handle } } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        title
        handle
        media {
          ... on ShopifyMediaImage {
            id
            image {
              gatsbyImageData
              altText
            }
            shopifyId
            status
          }
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        tags
        totalInventory
        productType
      }
    }
  }
`;
