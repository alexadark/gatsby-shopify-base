import React, { useContext, useState } from "react";
import { StoreContext } from "~/context/StoreContext";

export const Cart = () => {
  const { checkout, checkCoupon, removeFromCart, removeCoupon } =
    useContext(StoreContext);

  const [coupon, setCoupon] = useState("");
  return <div>Cart</div>;
};
