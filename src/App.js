import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { io } from "socket.io-client";
// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";
import SocketContext from "./context/SocketContext";
// socket io
const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const { access_token } = user.user;
  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                access_token ? (
                  <Home socket={socket} />
                ) : (
                  <Navigate to="login" />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={!access_token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/register"
              element={!access_token ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
