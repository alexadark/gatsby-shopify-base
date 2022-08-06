import React, { useContext } from "react";
import { StoreContext } from "~/context/StoreContext";

export const AddToCart = ({ variantId }) => {
  const { addToCart } = useContext(StoreContext);
  return <button onClick={() => addToCart(variantId)}>Add To Cart</button>;
};
