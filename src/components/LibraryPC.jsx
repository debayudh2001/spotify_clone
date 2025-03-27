import { useContext } from "react";
import { SpotifyContext } from "./SpotifyContext";
import { useNavigate } from "react-router-dom";

const LibraryPC = ({ data }) => {
  const { getPlaylist } = useContext(SpotifyContext);
  const navigate = useNavigate()

  const handleClick = () => {
    if (!data?.id) {
      console.error("No playlist ID available");
      return;
    }
    console.log("Clicked playlist:", data.id);
    getPlaylist(data.id);
    navigate("/playlist")
  };
  return (
    <>
      <div
        className="flex gap-3 mb-2 items-center hover:bg-[#282828] hover:rounded-md transition-all duration-300 cursor-pointer p-2"
        onClick={handleClick}
      >
        <span>
          <img
            src={data?.images[0]?.url}
            className="w-14 h-14 object-cover rounded-lg"
            alt="img"
          />
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold">{data?.name}</span>
          <span className="text-[gray]">
            Playlist . {data?.owner.display_name}
          </span>
        </div>
      </div>
    </>
  );
};

export default LibraryPC;
