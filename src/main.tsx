import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsExplorer from "./pages/ItemsExplorer";
import Task1 from "./pages/Task1";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import LoginPage from "./pages/logIn"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/items-explorer" element={<ItemsExplorer />} />
        <Route path="/task1" element={<Task1 />} />
        <Route path="/item/:epc" element={<ItemDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
