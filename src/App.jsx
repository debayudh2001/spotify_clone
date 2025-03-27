import Library from "./components/Library";
import Navbar from "./components/Navbar";
import Browse from "./components/Browse";
import PlayListPage from "./components/PlaylistPage";
import { SpotifyContext } from "./components/SpotifyContext";
import Search from "./components/Search";
import Home from "./components/Home";
import {
  BrowserRouter,
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import { useContext, useEffect, useState } from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { SpotifyProvider } from "./components/SpotifyContext";

const App = () => {
  //const isAuthenticated = !!localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const hash = window.location.hash;

  if (hash) {
    const token = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];

    window.location.hash = ""; // Clear the hash
    localStorage.setItem("token", token);
    setIsAuthenticated(true)
  }

  useEffect(() => {

  }, [isAuthenticated])

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <SpotifyProvider>
          <Layout />
        </SpotifyProvider>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/browse",
          element: <Browse />,
        },
        {
          path: "/playlist",
          element: <PlayListPage />,
        },
      ],
    },
  ]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return <RouterProvider router={router} />;
};

export default App;
