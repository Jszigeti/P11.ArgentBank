import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "../pages/SignUp";

function AppRouter() {
  // Retrieve the token from the store
  const { token } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            // Block access to the SignIn page if the user is logged in
            <ProtectedRoute token={!token} redirectPath="/profile">
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            // Block access to the SignIn page if the user is logged in
            <ProtectedRoute token={!token} redirectPath="/profile">
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            // Protecting access to the Profile page
            <ProtectedRoute token={token} redirectPath="/sign-in">
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* Redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
