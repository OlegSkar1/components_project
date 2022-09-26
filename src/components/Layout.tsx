import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Header />
      <main className="mt-14 flex-grow">
        <Outlet />
      </main>
      <footer className="text-center text-lg bg-slate-600 ">
        <span>2022</span>
      </footer>
    </div>
  );
}

export default Layout;
