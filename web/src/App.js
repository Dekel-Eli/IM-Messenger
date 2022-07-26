// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Login from './user/Login';
import Register from './user/Register';
import Chats from './chats/Chats';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Link to="/"></Link>
        </header>
        <Routes>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Register />} path="/register"></Route>
          <Route element={<Chats />} path="/chats"></Route>
          <Route element={<Navigate to="/login" replace />} path="/"></Route>
          {/* <Route element={<404 />} path="/404"></Route> */}
          <Route element={<Navigate to="/404" replace />} path="*"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
