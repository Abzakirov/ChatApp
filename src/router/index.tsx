import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../page/home/Home";
import SignUp from "../page/sign-up/SignUp";
import SignIn from "../page/sign-in/SignIn";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import Settings from "../page/settings/Settings";
import Profile from "../page/profile/Profile";
import { useThemeStore } from "../store/useThemeStore";
import Navbar from "../components/header/Navbar";

const RouterComponent = () => {
  const { checkUser, authUser } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <main data-theme={theme}>
      {authUser && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/sign-in"
          element={!authUser ? <SignIn /> : <Navigate to="/" />}
        />
            <Route
          path="/sign-up"
          element={!authUser ? <SignUp /> : <Navigate to="/sign-up" />}
        />
               <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/profile" />}
        />
           <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/settings" />}
        />
      </Routes>
    </main>
  );
};

export default RouterComponent;
