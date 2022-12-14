import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const cartHasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    fetch(
      "https://foodorderapp-5c9f8-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$ ${totalAmount}`}</span>
      </div>
      {isCheckout ? (
        <Checkout onCancel={props.onHideCart} onSubmit={submitOrderHandler} />
      ) : (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {cartHasItems && (
            <button className={classes.button} onClick={orderHandler}>
              {" "}
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}
