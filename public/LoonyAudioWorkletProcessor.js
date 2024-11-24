"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoonyAudioWorkletProcessor = void 0;
class LoonyAudioWorkletProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
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
exports.LoonyAudioWorkletProcessor = LoonyAudioWorkletProcessor;
registerProcessor('LoonyAudioWorkletProcessor', LoonyAudioWorkletProcessor);
