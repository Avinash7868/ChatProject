import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
