import React from "react";
import { graphql } from "gatsby";

const ProductPage = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ProductPage;

export const pageQuery = graphql`
  query ($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      ...ProductFragment
    }
  }
`;
