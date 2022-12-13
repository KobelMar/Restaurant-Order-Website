import ReactDOM from "react-dom";

import App from "./App";
import CartProvider from "./store/CartProvider";

import "./index.css";

ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,

  document.getElementById("root")
);
