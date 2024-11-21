export default class WebAudioApi {
    
    mediaStream: MediaStream;
    mediaRecorder: MediaRecorder;
    buffer: BlobPart[] = [];

    constructor(mediaStream: MediaStream, mediaRecorder: MediaRecorder) {
        this.mediaStream = mediaStream
        this.mediaRecorder = mediaRecorder;
    }

    static async create() {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channelCount: 1 }, video: false });
        const mediaRecorder = new MediaRecorder(mediaStream);
        return new WebAudioApi(mediaStream, mediaRecorder);
    }

    connect() {
        // Event listener to store the recorded audio chunks
        this.mediaRecorder.ondataavailable = (event) => {
            this.buffer?.push(event.data);
        };
        
        // Event listener to handle when the recording is stopped
        this.mediaRecorder.onstop = () => {

        };
        
        // Start recording
        this.mediaRecorder.start(250);
    }

    getAudioUrl() {
        if (this.buffer) {
            // Create a blob from the audio chunks
            const audioBlob = new Blob(this.buffer, { type: 'audio/wav' });
            // Optionally, create an audio URL and play the audio
            const audioUrl = URL.createObjectURL(audioBlob);
            return audioUrl
        }
    }

    socketConnect(socket: WebSocket) {
        // Event listener to store the recorded audio chunks
        this.mediaRecorder.ondataavailable = (event) => {
            this.buffer?.push(event.data);
            socket.send(event.data);
        };
        
        // Event listener to handle when the recording is stopped
        this.mediaRecorder.onstop = () => {
        };
        
        // Start recording
        this.mediaRecorder.start(250);
    }

    disconnect() {
        this.mediaRecorder.stop();
    }
}

