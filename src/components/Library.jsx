import { useContext, useEffect } from "react";
import LibraryPC from "./LibraryPC";
import { SpotifyContext } from "./SpotifyContext";

const Library = () => {
  const {myPlaylists, getPlaylists} = useContext(SpotifyContext)

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <>
      <div className="w-[20%] bg-[#121212] p-6 ml-4 rounded-xl self-start">
        <div className="flex gap-2 items-center mb-10 overflow-y-auto">
          <span>
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="lightgray"
            >
              <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
            </svg>
          </span>
          <span className="text-[lightgray] text-xl font-bold">
            Your Library
          </span>
        </div>
        {myPlaylists.map((val, ind) => (
          <LibraryPC key={ind} data={val} />
        ))}
      </div>
    </>
  );
};

export default Library;
