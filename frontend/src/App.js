import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Customer from "./Customer";
import ManagerLogin from "./ManagerLogin";
import Dashboard from "./Dashboard";

function Home() {

  return (

    <div style={{
      textAlign: "center",
      marginTop: "100px",
      fontFamily: "Arial"
    }}>

      <h1>Smart Canteen System</h1>

      <div style={{
        marginTop: "50px"
      }}>

        <Link to="/customer">
          <button style={buttonStyle}>
            Customer
          </button>
        </Link>

        <Link to="/manager">
          <button style={buttonStyle}>
            Manager
          </button>
        </Link>

      </div>

    </div>
  );
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/customer" element={<Customer />} />

        <Route path="/manager" element={<ManagerLogin />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

const buttonStyle = {
  padding: "15px 40px",
  margin: "20px",
  fontSize: "20px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer"
};

export default App;