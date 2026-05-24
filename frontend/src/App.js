import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Customer from "./Customer";
import SalesEntry from "./SalesEntry";
import Register from "./Register";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/customer" element={<Customer />} />

        <Route
          path="/sales"
          element={<SalesEntry />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;