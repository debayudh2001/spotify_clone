import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../auth";

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [myPlaylists, setmyPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    owner: "",
    songsNo: "",
    imageUrl: "",
  });
  const [songs, setSongs] = useState([]);
  const [input, setInput] = useState("");
  const [track, setTrack] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(input)
    let que = input;
    if (!que.includes(" ")) {
      getSongs(que);
      navigate("/search");
    } else {
      que = que.split(" ").join("+");
      getSongs(que);
      navigate("/search");
    }
  }
  // 2c9ypw4rhzsp7pz526x1ipwgw
  async function getPlaylists() {
    try {
      let res = await fetch(
        "https://api.spotify.com/v1/me/playlists?limit=30",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      console.log(data);
      setmyPlaylists(data.items);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getBrowseCategories() {
    try {
      let res = await fetch(
        "https://api.spotify.com/v1/browse/categories?locale=en_IN&limit=50",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      console.log(data);
      setCategories(data.categories.items);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPlaylist(id) {
    try {
      let res = await fetch(
        `https://api.spotify.com/v1/playlists/${id}?market=IN`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      console.log(data);
      setDetails({
        name: data.name,
        owner: data.owner.display_name,
        songsNo: data.tracks.total,
        imageUrl: data.images[1].url,
      });
      setTracks(data.tracks.items);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getSongs(que) {
    try {
      let res = await fetch(
        `https://api.spotify.com/v1/search?q=${que}&type=track&market=IN&limit=40&include_external=audio`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      console.log(data);
      setSongs(data.tracks.items);
      setInput("");
    } catch (err) {
      console.log(err.message);
    }
  }

  const playTrack = async (trackUri) => {
    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            uris: [trackUri],
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        myPlaylists: myPlaylists,
        getPlaylists: getPlaylists,
        categories: categories,
        getBrowseCategories: getBrowseCategories,
        tracks: tracks,
        details: details,
        getPlaylist: getPlaylist,
        input: input,
        setInput: setInput,
        songs: songs,
        handleSubmit: handleSubmit,
        track: track,
        setTrack: setTrack,
        playTrack: playTrack,
        setDeviceId
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};
