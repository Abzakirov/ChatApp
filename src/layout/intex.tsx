import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/header/Navbar";

const MainLayout = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/sign-in", "/sign-up"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
