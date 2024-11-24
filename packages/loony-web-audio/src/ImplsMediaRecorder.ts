import { LoonyWebAudioApi } from './types'

export class ImplsMediaRecorder implements LoonyWebAudioApi {
    
    private mediaStream: MediaStream;
    private mediaRecorder: MediaRecorder;
    private audioContext: AudioContext;
    private buffer: BlobPart[] = [];
    private fileReader: FileReader

    constructor(mediaStream: MediaStream, mediaRecorder: MediaRecorder, audioContext: AudioContext, fileReader: FileReader) {
        this.mediaStream = mediaStream
        this.mediaRecorder = mediaRecorder;
        this.audioContext = audioContext;
        this.fileReader = fileReader
    }

    static async create() {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channelCount: 1 }, video: false });
        const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });
        const audioContext = new AudioContext()
        const fileReader = new FileReader();        
        return new ImplsMediaRecorder(mediaStream, mediaRecorder, audioContext, fileReader);
    }

    connect() {
        this.mediaRecorder.ondataavailable = (event) => {
            this.buffer?.push(event.data);
        };
        this.mediaRecorder.start(250);
    }

    getAudioUrl() {
        const audioBlob = new Blob(this.buffer, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        return audioUrl
    }

    socketConnect(socket: WebSocket) {
        this.mediaRecorder.ondataavailable = async (event: BlobEvent) => {
            this.buffer?.push(event.data);
            socket.send(event.data);
        };
        
        // Start recording
        this.mediaRecorder.start(1000);
    }

    disconnect() {
        this.mediaRecorder.stop();
    }
}