import { useContext } from "react";
import { SpotifyContext } from "./SpotifyContext";

const TrackCard = ({ data }) => {
  const {setTrack, playTrack} = useContext(SpotifyContext)

  function handlePlay(){
    const trackUri = `spotify:track:${data.track.id}`;
    console.log(data.track.id)
    setTrack(data.track)
    playTrack(trackUri)
  }

  return (
    <tr
      className="flex items-center justify-between hover:bg-[#282828] px-4 py-2 rounded-md cursor-pointer w-full transition-all duration-300"
      onClick={handlePlay}
    >
      <td className="flex-[0.4] flex gap-3 items-center">
        <img
          src={data?.track?.album?.images[2]?.url}
          alt="img"
          className="object-cover rounded-lg w-12 h-12"
        />
        <div className="flex flex-col">
          <span className="text-white text-sm line-clamp-2">
            {data?.track?.name}
          </span>
          <span className="text-[gray] text-xs line-clamp-2">
            {data?.track?.artists.map((val) => val.name).join(", ")}
          </span>
        </div>
      </td>
      <td className="flex-[0.3] text-[gray] line-clamp-2">
        {data?.track?.album?.name}
      </td>
      <td className="flex-[0.15] text-[gray]">{data?.added_at.slice(0, 10)}</td>
      <td className="flex-[0.15] text-[gray] text-right">
        {Math.floor(data?.track?.duration_ms / 60000)}:
        {((data?.track?.duration_ms % 60000) / 1000)
          .toFixed(0)
          .padStart(2, "0")}
      </td>
    </tr>
  );
};

export default TrackCard;
