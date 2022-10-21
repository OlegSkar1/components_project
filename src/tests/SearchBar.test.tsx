import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar";

const updateData = jest.fn();

describe("SearchBar", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("Should call localStorage getItem on render", () => {
    render(<SearchBar updateData={updateData} />);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
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
