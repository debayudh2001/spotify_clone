export const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT ;
export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID ;
export const REDIRECT_URI = import.meta.env.PROD 
  ? import.meta.env.VITE_PROD_REDIRECT_URI 
  : import.meta.env.VITE_REDIRECT_URI;

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