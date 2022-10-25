import About from "components/About";
import ErrorPage from "components/ErrorPage";
import Home from "components/Home";
import Layout from "components/Layout";
import Form from "components/Form";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<Form />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
