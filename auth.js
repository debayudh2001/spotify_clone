export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const CLIENT_ID = "7ec0d7200d794f2daa07e1d91aa919ac";
export const REDIRECT_URI = "http://localhost:5173";
export const SCOPES = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-follow-read",
  "user-follow-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control"
];

export const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=token&show_dialog=true`;