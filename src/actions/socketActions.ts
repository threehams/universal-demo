export interface SocketStatus {
  type: "SOCKET_STATUS";
  payload: {
    status: "disconnected" | "reconnected";
  };
}

export const disconnected = (): SocketStatus => ({
  payload: {
    status: "disconnected"
  },
  type: "SOCKET_STATUS"
});

export const reconnected = (): SocketStatus => ({
  payload: {
    status: "reconnected"
  },
  type: "SOCKET_STATUS"
});
