import React, { useContext } from "react";
import { StoreContext } from "~/context/StoreContext";

export const ButtonAddToCart = ({ variantId, ...props }) => {
  const { addToCart } = useContext(StoreContext);
  return (
    <button onClick={() => addToCart(variantId)} {...props}>
      Add To Cart
    </button>
  );
};
