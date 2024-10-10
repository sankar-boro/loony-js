import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket("ws://localhost:8000/ws"); // Replace with your WebSocket URL

    // Set the WebSocket instance
    setSocket(ws);

    // Event listener for when the WebSocket connection is opened
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    // Event listener for receiving messages from the server
    ws.onmessage = (event) => {
      console.log("Message received from server:", event.data);
      setReceivedMessages((prevMessages: any) => [...prevMessages, event.data]);
    };

    // Event listener for WebSocket errors
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Event listener for WebSocket close
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    console.log(ws);
  }, []);

  return (
    <>
      App
      <button
        onClick={() => {
          socket && socket.send(JSON.stringify({ data: "hello" }));
        }}
      >
        Click
      </button>
    </>
  );
}

export default App;
