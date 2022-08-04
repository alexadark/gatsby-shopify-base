import { graphql } from "gatsby";
export const fragments = graphql`
  fragment ProductFragment on ShopifyProduct {
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
`;
