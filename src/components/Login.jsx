import { useContext } from "react";
import { SpotifyContext } from "./SpotifyContext";
import { LOGIN_URL } from "../../auth";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <button
        onClick={() => {
          window.location.href = LOGIN_URL
        }}
        className="bg-[#1DB954] text-white py-4 px-8 rounded-full font-bold hover:bg-[#1ed760] hover:cursor-pointer"
      >
        Login to your Spotify Account
      </button>
    </div>
  );
};

export default Login