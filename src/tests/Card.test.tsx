import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../components/Card";
import MockProducts from "./__mocks__/MockProducts";

beforeEach(() => {
  render(<Card product={MockProducts[0]} />);
});

describe("Card", () => {
  it("should render card", () => {
    expect(screen.getByText("Hard drive")).toBeInTheDocument();
  });

  it("should show details after click button", () => {
    userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("1tb")).toBeInTheDocument();
  });
});
