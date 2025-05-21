import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsExplorer from "./ItemsExplorer";
import Task1 from "./Task1";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/items-explorer" element={<ItemsExplorer />} />
                <Route path="/Task1" element={<Task1 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
