import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Resumes from "./pages/Resumes";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/applications"
          element={<Applications />}
        />

        <Route
          path="/resumes"
          element={<Resumes />}
        />
        <Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/settings"
  element={<Settings />}
/>

      </Routes>

      

    </BrowserRouter>
  );
}

export default App;