import { useContext } from "react";
import TrackCard from "./TrackCard";
import { LuClock } from "react-icons/lu";
import { SpotifyContext } from "./SpotifyContext";
import Loader from "./Loader";
import './loader.css'

const PlayListPage = () => {
  const { tracks, details } = useContext(SpotifyContext);

  return (
    <>
      <div className="w-[75%] h-[70vh] bg-[#121212] p-6 rounded-xl flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
        {tracks.length !== 0 && Object.values(details).length !== 0 ? (
          <>
            <div className="flex gap-4 mb-6 bg-[#454242] p-4">
              <img
                src={details?.imageUrl || ""}
                alt="img"
                className="object-cover rounded-md"
              />
              <div className="flex flex-col gap-3 self-end">
                <span className="text-white">Playlist</span>
                <span className="text-white font-bold text-5xl">
                  {details?.name}
                </span>
                <span className="text-white">
                  {details?.owner} .{" "}
                  {details?.songsNo > 100 ? 100 : details?.songsNo} songs
                </span>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="flex items-center justify-between px-4 py-2 text-sm text-[#b3b3b3] border-b border-[#282828] w-full">
                  <th className="flex-[0.4] text-left"># Title</th>
                  <th className="flex-[0.3] text-left">Album</th>
                  <th className="flex-[0.15] text-left">Date Added</th>
                  <th className="flex-[0.15] flex justify-end">
                    <LuClock className="text-lg" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((val, ind) => (
                  <TrackCard key={ind} data={val} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PlayListPage;
