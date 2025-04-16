import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import { TeamProvider } from "./context/TeamContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ProjectProvider } from "./context/ProjectContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <TeamProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </TeamProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
