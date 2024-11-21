import { convertFloat32ToInt16, encodeWAV } from './encoder/wav'

export default class WebAudioApi {
    
    micStream: MediaStream;
    audioContext: AudioContext;
    mediaStreamAudioSourceNode: undefined | MediaStreamAudioSourceNode;
    audioWorkletNode: undefined | AudioWorkletNode;
    buffer: Float32Array[] = []

    constructor(micStream: MediaStream, audioContext: AudioContext) {
        this.micStream = micStream
        this.audioContext = audioContext;
        this.mediaStreamAudioSourceNode = this.audioContext.createMediaStreamSource(this.micStream);
        this.audioWorkletNode = new AudioWorkletNode(
            this.audioContext,
            'AudioProcessor');
    }

    static async create() {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channelCount: 1 }, video: false });

        const audioContext = new AudioContext();

        await audioContext
            .audioWorklet
            .addModule("dist/AudioProcessor.js");

        return new WebAudioApi(micStream, audioContext);
    }

    connect() {
        if (this.audioWorkletNode) {
            this.audioWorkletNode.port.onmessage = (event: MessageEvent<any>) => {
                this.buffer.push(...event.data)
            };
            this.mediaStreamAudioSourceNode?.connect(this.audioWorkletNode).connect(this.audioContext.destination)
            this.audioWorkletNode.port.postMessage({ command: 'start' });
        }
    }

    socketConnect(socket: WebSocket) {
        if (this.audioWorkletNode) {
            this.audioWorkletNode.port.onmessage = (event: MessageEvent<any>) => {
                const x = convertFloat32ToInt16(event.data)
                socket.send(x);
            };
            this.mediaStreamAudioSourceNode?.connect(this.audioWorkletNode).connect(this.audioContext.destination)
            this.audioWorkletNode.port.postMessage({ command: 'start' });
        }
    }

    disconnect() {
        if (this.audioWorkletNode) {
            this.mediaStreamAudioSourceNode?.disconnect()
            this.audioContext.close()
            this.audioWorkletNode.port.postMessage({ command: 'stop' });
        }
    }

    getAudioUrl() {
        const audioBlob = new Blob([encodeWAV(this.buffer as Float32Array[], 44100)], {
            type: 'audio/wav',
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        return audioUrl
    }
}

