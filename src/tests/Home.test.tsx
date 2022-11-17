import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "components/Home";
import axios from "axios";
import MockProducts from "./__mocks__/MockProducts";

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
