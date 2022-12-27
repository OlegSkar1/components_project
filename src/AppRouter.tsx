import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "pages/About";
import ErrorPage from "pages/ErrorPage";
import Home from "pages/Home";
import Layout from "components/Layout";
import Form from "pages/Form";
import CharacterPage from "pages/CharacterPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<Form />} />
        <Route path="/:id" element={<CharacterPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouter;
