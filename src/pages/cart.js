import React, { useContext, useState } from "react";
import { StoreContext } from "~/context/StoreContext";
import { Layout } from "~/components/Layout";

const CartPage = () => {
  const { checkout, checkCoupon, removeFromCart, removeCoupon } =
    useContext(StoreContext);

  const [coupon, setCoupon] = useState("");
  return (
    <Layout>
      <div className="container mx-auto my-10">
        <h1>Cart</h1>
        <div>
          {checkout.lineItems.map((item) => {
            return (
              <div key={item.id} className="flex justify-between py-5 border-b">
                <div className="flex items-center gap-5">
                  <div className="w-[150px]">
                    <img src={item.variant.image.src} alt="" />
                  </div>
                  <div className="">
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm">{item.variant.title}</div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer btn "
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold">{item.quantity}</div>
                  <div className="text-sm">{item.variant.price}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {checkout.discountApplications?.length > 0 ? (
            <div className="mt-10">
              <p>
                {checkout.discountApplications[0].code}-
                {checkout.discountApplications[0].value.percentage}%
              </p>
              <button
                className="p-2 mb-5 font-bold text-white bg-purple-600 rounded-sm"
                onClick={() =>
                  removeCoupon(checkout.discountApplications[0].code)
                }
              >
                Remove Coupon
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                checkCoupon(coupon);
              }}
            >
              <label htmlFor="coupon">Coupon</label>
              <input
                value={coupon}
                name="coupon"
                onChange={(e) => setCoupon(e.target.value)}
                type="text"
                className="w-full h-10 mb-5 border "
              />
              <button className="p-2 mb-5 font-bold text-white bg-purple-400 rounded-sm">
                Check Coupon
              </button>
            </form>
          )}
          <a href={checkout.webUrl} target="_blank" className="btn">
            {checkout.totalPriceV2?.amount}$ Checkout
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
