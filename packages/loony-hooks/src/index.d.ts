export function useWebSocket(url: string): {
    socket: React.MutableRefObject<WebSocket | null>;
    openWebSocket: () => void;
    closeWebSocket: () => void;
}