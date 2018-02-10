import ReconnectingWebSocket from "reconnectingwebsocket";

// this is not a universal app, so 'window' is only undefined in tests
export let socket: WebSocket;
if (typeof window !== "undefined") {
  socket = new ReconnectingWebSocket(`ws://${location.hostname}:3000`);
}
