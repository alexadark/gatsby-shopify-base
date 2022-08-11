import React, { useContext, useState } from "react";
import { StoreContext } from "~/context/StoreContext";
import { FaShoppingCart } from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
export const Cart = () => {
  const { checkout, checkCoupon, removeFromCart, removeCoupon } =
    useContext(StoreContext);

  const [coupon, setCoupon] = useState("");
  const [open, setOpen] = useState(false);
  return (
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
              className="bg-white p-10 text-black w-full  sm:w-[450px] md:w-1/2 absolute top-0 right-0 shadow-xl z-50  overflow-y-scroll"
              initial={{ x: "100%", height: "100vh" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            >
              <Dialog.Close asChild>
                <CloseIcon className="absolute cursor-pointer right-5 top-5" />
              </Dialog.Close>
              <div>
                {checkout.lineItems.map((item) => {
                  return (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex flex-col">
                        <div className="font-bold">{item.title}</div>
                        <div className="text-sm">{item.variant.title}</div>
                      </div>
                      <div className="flex flex-col">
                        <div className="font-bold">{item.quantity}</div>
                        <div className="text-sm">{item.variant.price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Content>
    </Dialog.Root>
  );
};
