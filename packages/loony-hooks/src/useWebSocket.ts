import { useCallback, useRef } from 'react';

export function useWebSocket(url: string) {
    const socket = useRef<WebSocket | null>(null);

    const openWebSocket = useCallback(() => {
      socket.current = new WebSocket(url);
    }, [url])

    const closeWebSocket = useCallback(() => {
      socket.current?.close()
      socket.current = null
    }, [])
  
    return { socket, openWebSocket, closeWebSocket };
}

