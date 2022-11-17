import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockCharacter from "./__mocks__/MockCharacter";
import MyModal from "../components/MyModal";

const handleClose = jest.fn();

beforeEach(() => {
  render(
    <MyModal
      handleClose={handleClose}
      modalOpen={true}
      character={MockCharacter}
    />
  );
});

describe("MyModal", () => {
  it("should render modal", () => {
    expect(screen.queryByTestId("MyModal")).toBeInTheDocument();
  });

  it("should close modal", async () => {
    userEvent.click(screen.getByTestId("close-button"));
    expect(handleClose).toHaveBeenCalled();
  });
});
