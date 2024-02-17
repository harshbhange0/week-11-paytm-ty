import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PaymentGate from "./pages/PaymentGate";
import Nav from "./components/Navbar";
import AuthProvider, { authContext } from "./context/auth";
import { useContext } from "react";
function App() {
  const { auth } = useContext(authContext);
  return (
    <>
      <AuthProvider>
        <Nav />
        <main className="px-2 h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {auth ? (
              <Route path="/auth ">
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/payment/:id" element={<PaymentGate />} />
              </Route>
            ) : (
              <Route path="/auth/*" element={<div>Not found</div>} />
            )}
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
