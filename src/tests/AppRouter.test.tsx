import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppRouter from "AppRouter";
import { MemoryRouter } from "react-router-dom";

describe("AppRouter", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
  });
  it("render home page", () => {
    expect(screen.getByTestId("Home-page")).toBeInTheDocument();
  });
  it("link to about page", () => {
    userEvent.click(screen.getByTestId("about-link"));
    expect(screen.getByTestId("About-page")).toBeInTheDocument();
  });
  it("link to home page", () => {
    userEvent.click(screen.getByTestId("home-link"));
    expect(screen.getByTestId("Home-page")).toBeInTheDocument();
  });
  it("link to error page", () => {
    render(
      <MemoryRouter initialEntries={["/notfoundpage"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("ErrorPage")).toBeInTheDocument();
  });
});
