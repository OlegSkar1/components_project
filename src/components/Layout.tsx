import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

class Layout extends Component {
  render() {
    return (
      <div className="container mx-auto flex flex-col min-h-screen">
        <Header />
        <main className="mt-14 flex-grow">
          <Outlet />
        </main>
        <footer className="text-center text-lg bg-slate-600 mt-4 ">
          <span>2022</span>
        </footer>
      </div>
    );
  }
}

export default Layout;
