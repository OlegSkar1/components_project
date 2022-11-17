import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "components/Home";
import axios from "axios";
import MockCharacterData from "./__mocks__/MockCharacterData";

jest.mock("axios");
const MockAxios = axios as jest.Mocked<typeof axios>;

const response = {
  data: MockCharacterData,
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
    const characters = await screen.findAllByTestId("character-item");
    expect(characters.length).toBe(3);
    expect(characters[0]).toHaveTextContent("Test");
    expect(axios.get).toBeCalledTimes(1);
  });

  it("change search input", async () => {
    MockAxios.get.mockResolvedValue(response);
    render(<Home />);
    expect(screen.queryByTestId("loading")).toBeInTheDocument();

    const search = screen.getByPlaceholderText("Search");
    userEvent.type(search, "Test");
    userEvent.type(search, "{enter}");

    MockAxios.get.mockResolvedValue(response);
    expect(await screen.findAllByTestId("character-item")).toHaveLength(3);
  });

  it("should render error", async () => {
    MockAxios.get.mockRejectedValue(new Error("test error"));
    render(<Home />);
    const rejected = await screen.findByTestId("error");

    expect(rejected).toBeInTheDocument();
  });
});
