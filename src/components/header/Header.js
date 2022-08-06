import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

export const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyCollection {
        nodes {
          handle
          title
        }
      }
    }
  `);
  const collections = data.allShopifyCollection.nodes.filter(
    (item) => item.handle !== "frontpage"
  );
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1>Gatsby - Shopify</h1>
        <nav>
          <ul className="flex justify-between items-center space-x-2">
            <li>
              <a href="">Home</a>
            </li>
            {collections.map((collection) => (
              <li key={collection.handle}>
                <Link
                  to={`/collections/${collection.handle}`}
                  className="lowercase"
                >
                  {collection.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
