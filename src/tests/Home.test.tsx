import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "components/Home";
import { IProduct } from "../models";
import axios from "axios";

const MockProducts: IProduct[] = [
  {
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
  },
  {
    id: 2,
    title: "Men's boots",
    price: 4000,
    description: "light mens boots for a football",
    category: "clother",
    image: "test image",
    rating: {
      rate: 2000,
      count: 4.7,
    },
  },
  {
    id: 3,
    title: "Smartphone",
    price: 30000,
    description: "Best phone ever",
    category: "mobile devices",
    image: "test image",
    rating: {
      rate: 13500,
      count: 5,
    },
  },
];

jest.mock("axios");
const MockAxios = axios as jest.Mocked<typeof axios>;

const response = {
  data: MockProducts,
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("Home", () => {
  it("Should render Home component", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByTestId("Home-page")).toBeInTheDocument()
    );
  });

  it("render products", async () => {
    MockAxios.get.mockResolvedValue(response);
    render(<Home />);
    const products = await screen.findAllByTestId("product-item");
    expect(products.length).toBe(3);
    expect(products[0]).toHaveTextContent("Hard");
    expect(axios.get).toBeCalledTimes(1);
  });

  it("change search input", async () => {
    MockAxios.get.mockResolvedValue(response);
    render(<Home />);
    expect(screen.queryByTestId("loading")).toBeInTheDocument();

    const search = screen.getByPlaceholderText("Search");
    userEvent.type(search, "Hard");

    expect(search).toHaveValue("Hard");
    expect(await screen.findAllByTestId("product-item")).toHaveLength(1);
  });

  it("should render error", async () => {
    MockAxios.get.mockRejectedValue(new Error("test error"));
    render(<Home />);
    const rejected = await screen.findByTestId("error");

    expect(rejected).toBeInTheDocument();
  });
});
