export function encodeWAV(audioBuffer: Float32Array[], sampleRate: any) {
    const numChannels = 1; // Assuming mono
    const sampleBits = 16; // 16-bit PCM
  
    const buffer = new ArrayBuffer(44 + audioBuffer.length * 2);
    const view = new DataView(buffer);
  
    function writeString(offset: any, string: any) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }
  
    function writePCM(offset: any, buffer: any) {
      for (let i = 0; i < buffer.length; i++) {
        const sample = Math.max(-1, Math.min(1, buffer[i]));
        view.setInt16(offset + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      }
    }
  
    // WAV header
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + audioBuffer.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, sampleBits, true);
    writeString(36, 'data');
    view.setUint32(40, audioBuffer.length * 2, true);
  
    // Write PCM data
    writePCM(44, audioBuffer);
  
    return buffer;
  }

export function convertFloat32ToInt16(buffer: Float32Array) {
    let l = buffer.length;
    const buf = new Int16Array(l / 3);
    while (l--) {
      if (l % 3 === 0) {
        buf[l / 3] = buffer[l] * 0xffff;
      }
    }
    return buf.buffer;
  }
  