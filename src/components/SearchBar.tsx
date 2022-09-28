import React, { Component } from "react";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="mt-10 flex justify-center">
        <label className="relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-2 before:w-5 before:bg-center before:bg-no-repeat before:bg-[url('/src/assets/search.svg')]">
          <input
            className="border-2 border-indigo-600  rounded-full pl-7 w-96 h-10 outline-none"
            type="search"
            name="search"
          />
        </label>
      </div>
    );
  }
}