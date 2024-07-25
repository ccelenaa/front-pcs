
import i18n from "./services/i18n";

import React from "react";
import ReactDOM from "react-dom";
// import "swiper/css/bundle";
import "./style/white.css";
import "./style/styles.scss";
import App from "./App.jsx";
import { I18nextProvider } from "react-i18next";


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//     <React.StrictMode>
//       <I18nextProvider i18n={i18n}>
//         <App />
//       </I18nextProvider>
//     </React.StrictMode>,
//     document.getElementById("app"));
