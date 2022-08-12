import React from "react";

export const QuantityControls = ({ quantity, setQuantity }) => {
  return (
    <div className="mt-5 qty">
      <div className="mb-3 qty__label">Quantity</div>
      <div className="inline-flex gap-5 px-4 py-2 border qty__control ">
        <button
          className={` qty__control-btn ${quantity === 0 && "text-gray-300"}`}
          onClick={() => (quantity > 0 ? setQuantity(quantity - 1) : null)}
        >
          -
        </button>
        <div className="qty__control-value">{quantity}</div>
        <button
          className="qty__control-btn"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
