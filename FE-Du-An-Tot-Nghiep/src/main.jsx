import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

import { io } from "socket.io-client";
export const socket = io("localhost:5000");

import "react-quill/dist/quill.snow.css";
import ScrollToTop from "./components/clients/Scrolltotop";
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
      <ScrollToTop />
    </BrowserRouter>
  </RecoilRoot>
);
