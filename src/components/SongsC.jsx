import { useContext } from "react";
import { SpotifyContext } from "./SpotifyContext";

const SongsC = ({ data }) => {
  const {setTrack, playTrack} = useContext(SpotifyContext)

  function handlePlay() {
    const trackUri = `spotify:track:${data.id}`;
    console.log(data.id);
    setTrack(data);
    playTrack(trackUri);
  }

  return (
    <div
      className="w-[60%] flex items-center justify-between hover:bg-[#282828] hover:rounded-md p-2 hover:cursor-pointer transition-all duration-300"
      onClick={handlePlay}
    >
      <div className="flex gap-5 items-center">
        <img
          src={data?.album?.images[2]?.url || ""}
          alt="img"
          className="object-cover rounded-lg w-12 h-12"
        />
        <div className="flex flex-col">
          <span className="text-white text-sm line-clamp-2">
            {data?.name || "Loading..."}
          </span>
          <span className="text-[gray] text-xs">
            By{" "}
            {data?.artists?.map((val) => val.name).join(", ") ||
              "Unknown Artist"}
          </span>
        </div>
      </div>
      <span className="text-[gray]">
        {Math.floor(data.duration_ms / 60000)}:
        {((data.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
      </span>
    </div>
  );
};

export default SongsC;
