import { fireEvent, render } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  const props = {
    image: "https://example.com/image.jpg",
    name: "Example Product",
    price: 9.99,
    quantity: 0,
    id: 1,
    onChange: jest.fn(),
    onRemove: jest.fn(),
  };

  it("renders the image", () => {
    const { getByAltText } = render(<Card {...props} />);
    expect(getByAltText(props.name)).toBeInTheDocument();
  });

  it("renders the name", () => {
    const { getByText } = render(<Card {...props} />);
    expect(getByText(props.name)).toBeInTheDocument();
  });

  it("renders the price", () => {
    const { getByText } = render(<Card {...props} />);
    expect(getByText(`${props.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it("renders the quantity", () => {
    const { getByText } = render(<Card {...props} />);
    expect(getByText(`${props.quantity}`)).toBeInTheDocument();
  });

  it("increments the quantity when the + button is clicked", () => {
    const { getByTestId } = render(<Card {...props} />);
    const incrementButton = getByTestId("increment-button");
    fireEvent.click(incrementButton);
    expect(props.onChange).toHaveBeenCalledWith(props.id, "increment");
  });

  it("disables the decrement button when the quantity is 0", () => {
    const { getByTestId } = render(<Card {...props} />);
    const decrementButton = getByTestId("decrement-button");
    expect(decrementButton).toBeDisabled();
  });

  it("disables the decrement button when the quantity is not provided", () => {
    const { quantity, ...otherProps } = props;
    const { getByTestId } = render(<Card {...otherProps} />);
    const decrementButton = getByTestId("decrement-button");
    expect(decrementButton).toBeDisabled();
  });

  it("enables the decrement button when the quantity is greater than 0", () => {
    const { getByTestId } = render(<Card {...props} quantity={1} />);
    const decrementButton = getByTestId("decrement-button");
    expect(decrementButton).toBeEnabled();
  });

  it("decrements the quantity when the - button is clicked and the quantity is greater than 0", () => {
    const { getByTestId } = render(<Card {...props} quantity={1} />);
    const decrementButton = getByTestId("decrement-button");
    fireEvent.click(decrementButton);
    expect(props.onChange).toHaveBeenCalledWith(props.id, "decrement");
  });

  it("does not decrement the quantity when the - button is clicked and the quantity is 0", () => {
    const { getByTestId } = render(<Card {...props} />);
    const decrementButton = getByTestId("decrement-button");
    fireEvent.click(decrementButton);
    expect(props.onChange).not.toHaveBeenCalled();
  });

  it("calls the onRemove function when the remove button is clicked", () => {
    const { getByTestId } = render(<Card {...props} />);
    const removeButton = getByTestId("remove-button");
    fireEvent.click(removeButton);
    expect(props.onRemove).toHaveBeenCalledWith(props.id);
  });
});
