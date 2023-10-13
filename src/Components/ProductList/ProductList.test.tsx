import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductList } from "./ProductList";

describe("ProductList", () => {
  const mockData = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      img: "product1.jpg",
      colour: "red",
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      img: "product2.jpg",
      colour: "blue",
    },
  ];

  const mockGetItemQuantity = jest.fn().mockReturnValue(10);
  const mockIncreaseCartQuantity = jest.fn();
  const mockDecreaseCartQuantity = jest.fn();
  const mockRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  test("renders all products when no filter is applied", () => {
    render(
      <ProductList
        data={mockData}
        getItemQuantity={mockGetItemQuantity}
        increaseCartQuantity={mockIncreaseCartQuantity}
        decreaseCartQuantity={mockDecreaseCartQuantity}
        remove={mockRemove}
        filter={""}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("renders only products with matching colour when filter is applied", () => {
    render(
      <ProductList
        data={mockData}
        getItemQuantity={mockGetItemQuantity}
        increaseCartQuantity={mockIncreaseCartQuantity}
        decreaseCartQuantity={mockDecreaseCartQuantity}
        remove={mockRemove}
        filter="red"
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
  });

  test("calls increaseCartQuantity when increment button is clicked", () => {
    const { getAllByTestId } = render(
      <ProductList
        data={mockData}
        getItemQuantity={mockGetItemQuantity}
        increaseCartQuantity={mockIncreaseCartQuantity}
        decreaseCartQuantity={mockDecreaseCartQuantity}
        remove={mockRemove}
        filter={""}
      />
    );
    const incrementButton = getAllByTestId("increment-button")[0];
    fireEvent.click(incrementButton);

    expect(mockIncreaseCartQuantity).toHaveBeenCalledTimes(1);
    expect(mockIncreaseCartQuantity).toHaveBeenCalledWith(1, mockData[0]);
  });

  test("calls decreaseCartQuantity when decrement button is clicked", () => {
    mockGetItemQuantity.mockReturnValue(1);

    const { getAllByTestId } = render(
      <ProductList
        data={mockData}
        getItemQuantity={mockGetItemQuantity}
        increaseCartQuantity={mockIncreaseCartQuantity}
        decreaseCartQuantity={mockDecreaseCartQuantity}
        remove={mockRemove}
        filter={""}
      />
    );
    const decrementButton = getAllByTestId("decrement-button")[0];
    fireEvent.click(decrementButton);

    expect(mockDecreaseCartQuantity).toHaveBeenCalledTimes(1);
    expect(mockDecreaseCartQuantity).toHaveBeenCalledWith(1);
  });

  test("calls remove when remove button is clicked", () => {
    const { getAllByTestId } = render(
      <ProductList
        data={mockData}
        getItemQuantity={mockGetItemQuantity}
        increaseCartQuantity={mockIncreaseCartQuantity}
        decreaseCartQuantity={mockDecreaseCartQuantity}
        remove={mockRemove}
        filter={""}
      />
    );
    const removeButton = getAllByTestId("remove-button")[0];
    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith(1);
  });
});
