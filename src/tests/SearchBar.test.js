import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar.tsx";

const updateData = jest.fn();

describe("SearchBar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it("Should call localStorage getItem on render", () => {
    render(<SearchBar />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
  it("Should call localStorage setItem on unmount", () => {
    const { getByPlaceholderText, unmount } = render(
      <SearchBar updateData={updateData} />
    );

    const input = getByPlaceholderText(/search/i);
    userEvent.type(input, "men");

    unmount();
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith("search", "men");
  });
});
