import { Outlet, useNavigation } from "react-router-dom";
import Library from "./Library";
import Navbar from "./Navbar";
import { SpotifyContext, SpotifyProvider } from "./SpotifyContext";
import { useContext } from "react";
import Login from "./Login";
import WebPlayback from "./WebPlayback";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex gap-3">
        <Library />
        <Outlet />
      </div>
      <WebPlayback />
    </>
  );
};

export default Layout;
