export class MyProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0]; // First channel's audio data
      if (channelData) {
        this.port.postMessage(channelData); // Send a copy of the buffer
      }
    }
    return true;
  }
}

registerProcessor('AudioProcessor', MyProcessor);
