import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedCartItems = [];
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    if (state.items.some((item) => item.id === action.item.id)) {
      updatedCartItems = state.items.map((item) => {
        if (item.id === action.item.id) {
          return { ...item, amount: item.amount + action.item.amount };
        } else {
          return item;
        }
      });
    } else {
      updatedCartItems = state.items.concat(action.item);
    }
    return { items: updatedCartItems, totalAmount: updatedTotalAmount };
  } else if (action.type === "REMOVE") {

    let updatedCartItems;
    const indexOfRemovedItem = state.items.findIndex(item => item.id === action.id);
    const removedItem = state.items[indexOfRemovedItem];

    const updatedTotalAmount = state.totalAmount - removedItem.price

    if (removedItem.amount === 1) {
      updatedCartItems = state.items.filter(item => item.id !== action.id)
    } else {
      updatedCartItems = [...state.items]
      updatedCartItems[indexOfRemovedItem].amount = removedItem.amount - 1;
    }
    return { items: updatedCartItems, totalAmount: updatedTotalAmount };


  }
  else if (action.type === "CLEAR") {
    return defaultCartState
  }



  return defaultCartState;
};

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = (id) => {
    dispatchCartAction({ type: "CLEAR" });
  };



  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
