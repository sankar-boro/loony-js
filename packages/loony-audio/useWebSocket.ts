import { useState, useCallback, useRef } from 'react';

export function useWebSocket(url: string) {
    const socket = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    const openWebSocket = useCallback(() => {
      socket.current = new WebSocket(url);
        
      // Connection opened
      socket.current.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connected');
      };
        
      // Connection closed
      socket.current.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket disconnected');
      };
        
      // Handle incoming messages
      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      };
    }, [url])

    const closeWebSocket = useCallback(() => {
      socket.current?.close()
    }, [])
  
    return { socket, openWebSocket, closeWebSocket, isConnected, messages };
  }

// Convert audio buffer to LINEAR16 PCM format (16-bit signed little-endian)
export async function convertToLINEAR16(audioBuffer:AudioBuffer) {
    const sampleRate = 16000;
    const offlineContext = new OfflineAudioContext(1, audioBuffer.length, sampleRate);
    const source: any = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();
  
    const renderedBuffer = await offlineContext.startRendering();
    const pcmData = new Int16Array(renderedBuffer.length);
  
    for (let i = 0; i < renderedBuffer.length; i++) {
      pcmData[i] = Math.max(-32768, Math.min(32767, renderedBuffer.getChannelData(0)[i] * 32768));
    }
  
    return pcmData.buffer; // Send this buffer via WebSocket
  }