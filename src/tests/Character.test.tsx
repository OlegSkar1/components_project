import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Character from "components/Character";
import MockCharacter from "./__mocks__/MockCharacter";

describe("Character", () => {
  it("should render character", async () => {
    render(<Character character={MockCharacter} key={MockCharacter.id} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
  it("should open details after click button", async () => {
    render(<Character character={MockCharacter} key={MockCharacter.id} />);

    userEvent.click(screen.getByTestId("character-item"));
    expect(screen.queryByTestId("MyModal")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("close-button"));

    await waitFor(() => {
      expect(screen.queryByTestId("MyModal")).not.toBeInTheDocument();
    });
  });
});
