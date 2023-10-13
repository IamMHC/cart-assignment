import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Select } from "./Select";

describe("Select", () => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("should render the select options", () => {
    const { getByTestId } = render(
      <Select options={options} onFilter={() => {}} />
    );
    const select = getByTestId("select");
    expect(select.children.length).toBe(options.length);
  });

  it("should call the onFilter function when an option is selected", () => {
    const onFilter = jest.fn();
    const { getByTestId } = render(
      <Select options={options} onFilter={onFilter} />
    );
    const select = getByTestId("select");
    fireEvent.change(select, { target: { value: "option2" } });
    expect(onFilter).toHaveBeenCalledTimes(1);
  });
});
