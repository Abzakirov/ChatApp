import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../page/home/Home";
import SignUp from "../page/sign-up/SignUp";
import SignIn from "../page/sign-in/SignIn";
import MainLayout from "../layout/intex";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const RouterComponent = () => {
  const { checkUser, authUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={authUser ? <Home /> : <Navigate to="/sign-in" replace />}
          />

          <Route
            path="sign-in"
            element={!authUser ? <SignIn /> : <Navigate to="/" replace />}
          />

          <Route
            path="sign-up"
            element={!authUser ? <SignUp /> : <Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </main>
  );
};

export default RouterComponent;
