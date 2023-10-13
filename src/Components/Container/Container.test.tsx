import React from "react";
import { render } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <Container>
        <div>Hello, world!</div>
      </Container>
    );

    expect(getByText("Hello, world!")).toBeInTheDocument();
  });
});
