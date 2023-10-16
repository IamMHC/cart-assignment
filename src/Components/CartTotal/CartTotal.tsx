import "./CartTotal.css";

import React from "react";

type CartTotalProps = {
  totalPrice: number;
};
export const CartTotal: React.FC<CartTotalProps> = ({ totalPrice }) => {
  return (
    <div className="price-wrap">
      <div className="total-price">
        <p>&#163;</p>
        <h2 data-testid="cart-total">{totalPrice.toFixed(2)} </h2>
      </div>
    </div>
  );
};
