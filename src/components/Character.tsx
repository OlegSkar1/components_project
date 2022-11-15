import { ICharacter } from "charactersModule";
import React, { Component } from "react";
import MyModal from "./MyModal";

interface CharacterProps {
  character: ICharacter;
}

interface ProductState {
  details: boolean;
  open: boolean;
}

export default class Product extends Component<CharacterProps, ProductState> {
  constructor(props: CharacterProps) {
    super(props);
    this.state = {
      details: false,
      open: false,
    };
  }

  clickHandler = () => {
    this.setState((prev) => ({
      details: !prev.details,
    }));
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (value: boolean) => {
    this.setState({ open: value });
  };

  render() {
    const { character } = this.props;
    const { open } = this.state;

    return (
      <>
        <div
          data-testid="product-item"
          className="flex flex-col items-center text-center justify-between p-6 max-w-[280px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          onClick={this.handleOpen}
        >
          <img src={character.image} className="w-1/2 " alt={character.name} />

          <p className="font-bold pb-2">{character.name}</p>

          <span className="pb-2">{character.species}</span>
          <span className="pb-2">From: {character.origin.name}</span>
        </div>
        <MyModal
          handleClose={this.handleClose}
          modalOpen={open}
          {...this.props}
        />
      </>
    );
  }
}
