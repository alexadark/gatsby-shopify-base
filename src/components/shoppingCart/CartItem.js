import React, { useContext } from "react";
import { StoreContext } from "~/context/StoreContext";

export const CartItem = ({ item, className = "", ...props }) => {
  const {
    variant: { priceV2, image, title: variantTitle },
    title,
  } = item;

  const { removeFromCart } = useContext(StoreContext);

  return (
    <div className={`flex items-center gap-5 ${className}`} {...props}>
      <div className="cart-item__image w-[150px]">
        <img src={image.src} alt={image.altText} />
      </div>
      <div className="cart-item__details">
        <h3 className="mb-2 font-bold lowercase">{title}</h3>
        <h4 className="italic text-sn text-slate-700">{variantTitle}</h4>
        <h4 className="font-bold">
          <span className="text-sm lowercase">{priceV2.currencyCode}</span>{" "}
          {priceV2.amount}
        </h4>
        <div className="flex justify-end w-full cart-item__remove">
          <button
            onClick={removeFromCart}
            className="cursor-pointer hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
