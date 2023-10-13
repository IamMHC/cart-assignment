import React from "react";
import { render } from "@testing-library/react";
import { CartTotal } from "./CartTotal";

describe("CartTotal", () => {
  it("should render the total price", () => {
    const { getByText } = render(<CartTotal totalPrice={50} />);
    expect(getByText("£")).toBeInTheDocument();
    expect(getByText("50")).toBeInTheDocument();
  });
});
