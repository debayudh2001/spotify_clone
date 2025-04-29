import { useEffect, useState } from "react";
import AlbumC from "./AlbumC";
import SliderAl from "./SliderAl";
import SliderAr from "./SliderAr";
import Loader from "./Loader";

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  async function getNewReleases() {
    try {
      let res = await fetch(
        "https://api.spotify.com/v1/browse/new-releases?limit=50&offset=5",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      //console.log(data.albums.items)
      setAlbums(data.albums.items);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getFollowedArtists() {
    try {
      let res = await fetch(
        "https://api.spotify.com/v1/me/following?type=artist",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      //console.log(data)
      setArtists(data.artists.items);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getNewReleases();
    getFollowedArtists();
  }, []);

  return (
    <>
      <div className="w-[75%] h-[70vh] bg-[#121212] p-6 ml-4 rounded-xl flex flex-col gap-4 overflow-y-auto">
        {/* {albums.length !== 0 && artists.length !== 0 ? (
          <>
            <span className="text-white text-3xl font-bold mb-1">
              New Releases
            </span>
            <SliderAl items={albums} />
            <span className="text-white text-3xl font-bold mb-1">
              Followed Artists
            </span>
            <SliderAr items={artists} />
          </>
        ) : (
          <Loader />
        )} */}
        <>
          {albums.length !== 0 ? (
            <>
              <span className="text-white text-3xl font-bold mb-1">
                New Releases
              </span>
              <SliderAl items={albums} />
            </>
          ) : (
            <Loader />
          )}
          {artists.length !== 0 && (
            <>
              <span className="text-white text-3xl font-bold mb-1">
                Followed Artists
              </span>
              <SliderAr items={artists} />
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Home;
