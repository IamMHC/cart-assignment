import React from "react";

import "./CartTotal.css";
type CartTotalProps = {
  totalPrice: number;
};
export const CartTotal: React.FC<CartTotalProps> = ({ totalPrice }) => {
  return (
    <div className="price-wrap">
      <div className="total-price">
        <p>&#163;</p>
        <h2 data-testid="cart-total">{totalPrice} </h2>
      </div>
    </div>
  );
};
