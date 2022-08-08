import React, { useContext } from "react";
import { StoreContext } from "~/context/StoreContext";

export const AddToCart = ({ variantId, ...props }) => {
  const { addToCart } = useContext(StoreContext);
  return (
    <button onClick={() => addToCart(variantId)} {...props}>
      Add To Cart
    </button>
  );
};
