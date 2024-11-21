import { useState, useRef, useEffect } from 'react';
import { useWebSocket } from 'loony-audio/useWebSocket';
import WebAudioApi from 'loony-audio/MediaRecorder';
import "./Audio.css"

function App() {
  const { socket, isConnected, openWebSocket, closeWebSocket } =
    useWebSocket('ws://127.0.0.1:3494/ws');
  const audioRef = useRef<WebAudioApi | null>(null);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    (async () => {
      const loonyAudio = await WebAudioApi.create();
      audioRef.current = loonyAudio;
    })();
  }, []);

  const onOpenWebSocket = () => {
    openWebSocket();
  };
  const onCloseWebSocket = () => {
    closeWebSocket();
  };

  const startRecording = () => {
    audioRef.current?.connect();
  };

  const stopRecording = () => {
    audioRef.current?.disconnect();
  };

  const startSocketRecording = () => {
    audioRef.current?.socketConnect(socket.current as WebSocket);
  };

  const logData = () => {
    let audioUrl = audioRef.current?.getAudioUrl();
    setAudioUrl(audioUrl as string);
  };

  const handleFileChange = (_: React.ChangeEvent<HTMLInputElement>) => {};
  console.log(isConnected);

  return (
    <div className='ui-container'>
      <div className='button-group'>
        <h3>WebSocket Controls</h3>
        <button className='btn' onClick={onOpenWebSocket}>
          Open WebSocket
        </button>
        <button className='btn' onClick={onCloseWebSocket}>
          Close WebSocket
        </button>
      </div>

      <div className='button-group'>
        <h3>Recording Controls</h3>
        <button className='btn' onClick={startRecording}>
          Start Recording
        </button>
        <button className='btn' onClick={stopRecording}>
          Stop Recording
        </button>
        <button className='btn' onClick={logData}>
          Log
        </button>
      </div>

      <div className='button-group'>
        <h3>Web socket Recording Controls</h3>
        <button className='btn' onClick={startSocketRecording}>
          Start Recording
        </button>
        <button className='btn' onClick={stopRecording}>
          Stop Recording
        </button>
        <button className='btn' onClick={logData}>
          Log
        </button>
      </div>

      <div className='audio-section'>
        {audioUrl && (
          <>
            <h3>Audio Playback</h3>
            <audio controls src={audioUrl}></audio>
          </>
        )}
      </div>

      <div className='file-input'>
        <h3>Upload File</h3>
        <input type='file' onChange={handleFileChange} />
      </div>
    </div>
  );
}

export default App;
