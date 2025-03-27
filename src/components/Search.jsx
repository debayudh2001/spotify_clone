import { useContext } from "react";
import SongsC from "./SongsC";
import { SpotifyContext } from "./SpotifyContext";
import Loader from "./Loader";
import './loader.css'

const Search = () => {
  const { songs } = useContext(SpotifyContext);

  return (
    <>
      <div className="w-[75%] h-[70vh] bg-[#121212] p-6 ml-4 rounded-xl flex flex-col gap-3">
        {songs.length !== 0 ? (
          <>
            <span className="text-white font-bold text-2xl mb-4">
              Top results
            </span>
            <div className="w-full flex flex-col gap-2 pl-4 overflow-auto">
              {songs.map((val, ind) => (
                <SongsC key={ind} data={val} />
              ))}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Search;
