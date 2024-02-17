import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PaymentGate from "./pages/PaymentGate";
import Nav from "./components/Navbar";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/dashboard" element={<Dashboard />} />
        <Route path="/auth/dashboard/payment/:id" element={<PaymentGate />} />
      </Routes>
    </>
  );
}

export default App;
