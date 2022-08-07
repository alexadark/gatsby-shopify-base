import React, { useContext, useState } from "react";
import { StoreContext } from "~/context/StoreContext";
import { FaShoppingCart } from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
export const Cart = () => {
  const {
    checkout,
    checkCoupon,
    removeFromCart,
    removeCoupon,
    toggleCartOpen,
    isCartOpen,
  } = useContext(StoreContext);

  const [coupon, setCoupon] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <AnimatePresence>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <FaShoppingCart />
        </Dialog.Trigger>
        <Dialog.Overlay forceMount asChild>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 h-screen bg-black bg-opacity-80"
              />
            )}
          </AnimatePresence>
        </Dialog.Overlay>
        <Dialog.Content forceMount asChild>
          <AnimatePresence>
            {open && (
              <motion.div
                className="bg-white p-10 text-black  w-[400px] absolute top-0 right-0 shadow-xl z-50"
                initial={{ x: "100%", height: "100vh" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              >
                <Dialog.Title>Cart</Dialog.Title>
                <Dialog.Description>Cart content</Dialog.Description>
                <Dialog.Close asChild>
                  <CloseIcon />
                </Dialog.Close>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Root>
    </AnimatePresence>
  );
};
