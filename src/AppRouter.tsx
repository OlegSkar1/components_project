import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "pages/About";
import ErrorPage from "pages/ErrorPage";
import Home from "pages/Home";
import Layout from "components/Layout";
import Form from "pages/Form";
import CharacterPage from "pages/CharacterPage";
import { FirstEpisode } from "pages/FirstEpisode";
import { CurrLocation } from "pages/CurrLocation";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<Form />} />
        <Route path="character/:id" element={<CharacterPage />} />
        <Route path="episode/:id" element={<FirstEpisode />} />
        <Route path="location/:id" element={<CurrLocation />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouter;
