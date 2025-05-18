import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./routes";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} element={route.element}>
            {route.children.map((child, childIndex) => (
              <Route
                key={childIndex}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </Router>
  );
}

export default App;
