import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Router from "./router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Router />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;