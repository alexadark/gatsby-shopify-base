import React, { createContext, useState, useEffect } from "react";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_STORE_URL,
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
});

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  checkCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
};

export const StoreContext = createContext(defaultValues);

export const StoreProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const toggleCartOpen = () => setCartOpen(!isCartOpen);
  const [checkout, setCheckout] = useState(defaultValues.checkout);
  const [isLoading, setLoading] = useState(false);

  const isBrowser = typeof window !== "undefined";

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create();
      isBrowser && localStorage.setItem("checkout_id", newCheckout.id);
      return newCheckout;
    } catch (e) {
      console.error(e);
    }
  };

  const initializeCheckout = async () => {
    try {
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null;

      let newCheckout = null;
      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId);
        if (newCheckout.completedAt) {
          newCheckout = await getNewId();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initializeCheckout();
  }, []);

  const addToCart = async (variantId) => {
    try {
      setLoading(true);
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ];

      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      );
      setLoading(false);
      setCheckout(newCheckout);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const removeFromCart = async (lineItemId) => {
    try {
      setLoading(true);
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ]);
      setLoading(false);
      setCheckout(newCheckout);
    } catch (error) {
      console.error(error);
    }
  };

  const checkCoupon = async (coupon) => {
    setLoading(true);
    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon);
    setCheckout(newCheckout);
    setLoading(false);
  };

  const removeCoupon = async (coupon) => {
    setLoading(true);
    const newCheckout = await client.checkout.removeDiscount(
      checkout.id,
      coupon
    );
    setCheckout(newCheckout);
    setLoading(false);
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addToCart,
        removeFromCart,
        checkout,
        toggleCartOpen,
        isCartOpen,
        checkCoupon,
        removeCoupon,
        isLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
