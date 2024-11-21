/**
* The WAV header is written in a specific format:
* 
* | Field Name      | Byte Offset | Description                                  |
* | --------------- | ----------- | -------------------------------------------- |
* | `"RIFF"`        | `0`         | Indicates it's a RIFF file.                  |
* | File Size       | `4`         | Total file size minus 8 bytes.               |
* | `"WAVE"`        | `8`         | Identifies file as a WAV.                    |
* | `"fmt "`        | `12`        | Subchunk for format data.                    |
* | Subchunk Size   | `16`        | Length of format data (16 for PCM).          |
* | Audio Format    | `20`        | 1 for PCM (uncompressed audio).              |
* | Num Channels    | `22`        | Number of audio channels (1 = mono).         |
* | Sample Rate     | `24`        | Samples per second (e.g., 44100).            |
* | Byte Rate       | `28`        | `sampleRate * numChannels * bytesPerSample`. |
* | Block Align     | `32`        | `numChannels * bytesPerSample`.              |
* | Bits per Sample | `34`        | Number of bits per sample (e.g., 16).        |
* | `"data"`        | `36`        | Subchunk for audio data.                     |
* | Data Size       | `40`        | Total size of the audio data.                |
*/
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

// export function convertFloat32ToInt16(buffer: Float32Array) {
//     let l = buffer.length;
//     const buf = new Int16Array(l / 3);
//     while (l--) {
//       if (l % 3 === 0) {
//         buf[l / 3] = buffer[l] * 0xffff;
//       }
//     }
//     return buf.buffer;
//   }

/**
 * 
 * This code snippet is a JavaScript function that converts a Float32Array containing floating-point 
 * audio samples into a Int16Array suitable for use in systems that expect 16-bit signed integers (e.g., audio processing systems).
 * 
 * @param {Float32Array} buffer - A `Float32Array` containing normalized audio samples in the range [-1.0, 1.0].
 * @returns {ArrayBufferLike} An `ArrayBuffer` containing the converted audio data in `Int16Array` format.
 *  
 */
export function convertFloat32ToInt16(buffer: Float32Array): ArrayBufferLike {
  
  // The function divides the input buffer length by 3 and floors the result. 
  // This effectively downsamples the data by taking every third sample. 
  // This is likely done to reduce the size of the output buffer (e.g., for compression or lower resolution audio).
  const length = Math.floor(buffer.length / 3);

  // An Int16Array is created to store the converted values, with the calculated length.
  const int16Array = new Int16Array(length);

  // The loop processes every third sample of the input buffer (buffer[i * 3]).
  // Each value is multiplied by 32768 to scale it from the range [-1.0, 1.0] (float) to [-32768, 32767] (16-bit integer range).
  // Clamping is done using Math.max(-32768, Math.min(32767, ...)) to ensure the value stays within the valid range of a signed 16-bit integer.
  for (let i = 0; i < length; i++) {
    int16Array[i] = Math.max(-32768, Math.min(32767, buffer[i * 3] * 32768));
  }

  return int16Array.buffer;
}

  