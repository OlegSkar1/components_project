import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header className="py-4 container bg-green-500 fixed top-0">
        <nav className="flex justify-center gap-x-10 items-center">
          <Link
            className="text-xl rounded drop-shadow  transition hover:bg-sky-500 bg-teal-600 px-2"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-xl rounded drop-shadow transition hover:bg-sky-500 bg-teal-600 px-2"
            to="/about"
          >
            About
          </Link>
        </nav>
      </header>
    );
  }
}
