import { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "./SpotifyContext";
import {
  MdSkipNext,
  MdSkipPrevious,
  MdPlayArrow,
  MdOutlinePause,
  MdVolumeUp,
} from "react-icons/md";

const WebPlayback = () => {
  const { track, setDeviceId } = useContext(SpotifyContext);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState({
    name: "",
    album: {
      images: [{ url: "" }],
    },
    artists: [{ name: "" }],
  });
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = async (e) => {
    try {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      await player.setVolume(newVolume);
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  };

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(localStorage.getItem("token"));
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("initialization_error", ({ message }) => {
        console.error("Failed to initialize", message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error("Failed to validate Spotify account", message);
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect().then(success => {
        if(success){
          console.log("Successfully connected to Spotify!")
          //player.activateElement();
        }
      });
    };

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (track && player) {
      player.activateElement();
    }
  }, [track, player]);

  if (!is_active) {
    return (
      <>
        <div className="bg-black mt-6 w-full flex justify-center p-6">
          <span className="text-[lightgray] font-bold">
            <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b>
          </span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-black mt-6 w-full flex justify-center">
          <div className="bg-[#121212] flex justify-between items-center py-4 px-6 w-[55%] rounded-xl">
            <div className="flex gap-4 pr-1">
              <img
                src={current_track?.album?.images[2]?.url || ""}
                className="w-14 h-14 object-cover rounded-md"
                alt="img"
              />

              <div className="flex flex-col gap-1">
                <span className="text-white text-2xl font-bold line-clamp-1">
                  {current_track?.name || "No track playing"}
                </span>
                <span className="text-[gray]">
                  {current_track?.artists?.[0]?.name || "Unknown artist"}
                </span>
              </div>
            </div>
            <div className="flex gap-5 justify-center">
              <button
                className="btn-spotify"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                <MdSkipPrevious className="text-2xl font-bold" />
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? (
                  <MdPlayArrow className="text-2xl  font-bold" />
                ) : (
                  <MdOutlinePause className="text-2xl  font-bold" />
                )}
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                <MdSkipNext className="text-2xl  font-bold" />
              </button>

              <div className="flex items-center gap-1">
                <MdVolumeUp className="text-2xl text-white" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  onChange={handleVolumeChange}
                  style={{
                    background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${
                      volume * 100
                    }%, #4D4D4D ${volume * 100}%, #4D4D4D 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default WebPlayback;
