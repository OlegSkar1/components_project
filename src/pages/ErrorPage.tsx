import React, { Component } from "react";

export default class ErrorPage extends Component {
  render() {
    return (
      <div
        data-testid="ErrorPage"
        className="h-screen flex justify-center items-center bg-amber-200"
      >
        <div className="text-lg">
          404 - Page not found, go to{" "}
          <a
            className="font-bold px-4 py-2 rounded bg-slate-500/50  transition hover:text-sky-700"
            href="/"
          >
            Home page
          </a>
        </div>
      </div>
    );
  }
}
