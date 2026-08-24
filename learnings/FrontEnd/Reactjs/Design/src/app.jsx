import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<withLoader />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;