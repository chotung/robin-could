export const webSocketAction = (action: string, params: string): string => {
  return JSON.stringify({ action, params });
};

export const createWebSocket = (url: string): WebSocket => {
  return new WebSocket(url);
};
