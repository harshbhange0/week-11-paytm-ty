import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PaymentGate from "./pages/PaymentGate";
import Nav from "./components/Navbar";
import { authContext } from "./context/auth";
import { useContext } from "react";
import SideNav from "./components/SideNav";
import TrHistoryWarper from "./components/TrHistoryWarper";
import DisplayUsers from "./pages/DisplayUsers";
function App() {
  const { auth } = useContext(authContext);

  return (
    <>
      <main className="h-full">
        <Nav /> <SideNav />
        <div className="pt-20 sm:ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {auth ? (
              <Route path="/auth">
                <Route path="dashboard">
                  <Route index element={<Dashboard />} />
                  <Route path="transaction" element={<TrHistoryWarper />} />
                  <Route path="users" element={<DisplayUsers />} />
                </Route>
                <Route path="dashboard/payment/:id" element={<PaymentGate />} />
              </Route>
            ) : (
              <Route path="/auth/*" element={<div>Not found</div>} />
            )}
            <Route path="*" element={<div>Not found</div>} />
          </Routes>{" "}
        </div>
      </main>
    </>
  );
}

export default App;
