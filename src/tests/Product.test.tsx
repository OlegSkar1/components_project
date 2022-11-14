import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Character from "components/Character";
import { IProduct } from "../models";

const MockProduct: IProduct = {
  id: 1,
  title: "Hard drive",
  price: 3000,
  description: "1tb",
  category: "computer storage devices",
  image: "test image",
  rating: {
    rate: 1500,
    count: 4.6,
  },
};

// describe("Product", () => {
//   it("should render product", () => {
//     render(<Product product={MockProduct} key={MockProduct.id} />);
//     expect(screen.getByText("Hard drive")).toBeInTheDocument();
//   });
//   it("should open details after click button", () => {
//     render(<Product product={MockProduct} key={MockProduct.id} />);
//     userEvent.click(screen.getByRole("button", { name: /show details/i }));
//     expect(screen.getByText(/1tb/i)).toBeInTheDocument();
//   });
// });
