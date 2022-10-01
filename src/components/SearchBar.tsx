import React, { Component } from "react";

export default class SearchBar extends Component {
  state = {
    search: "",
  };

  componentDidMount(): void {
    if (localStorage.getItem("search")) {
      const storage = localStorage.getItem("search");
      this.setState({ search: storage });
    }
  }

  componentWillUnmount(): void {
    if (this.state.search) {
      const storage = localStorage.setItem("search", this.state.search);
      this.setState({ search: storage });
    } else {
      this.setState({ search: "" });
    }
  }

  storage(): void {
    this.setState({
      search: localStorage.getItem("search"),
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { search } = this.state;

    return (
      <div className="mt-10 flex justify-center">
        <label className="relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-2 before:w-5 before:bg-center before:bg-no-repeat before:bg-[url('/src/assets/search.svg')]">
          <input
            className="border-2 border-indigo-600  rounded-full pl-7 w-96 h-10 outline-none"
            type="search"
            name="search"
            value={search}
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}
