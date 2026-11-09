const fs = require('fs');
const path = require('path');

function createWavBuffer(sampleRate, samples) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk descriptor
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // audioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // write 16-bit PCM samples
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const val = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buffer.writeInt16LE(Math.floor(val), 44 + i * 2);
  }

  return buffer;
}

const SR = 44100;

// 1. Paper Slide / Whoosh (bandpassed noise with smooth gaussian envelope)
function genPaperSlide(duration = 0.45) {
  const N = Math.floor(SR * duration);
  const samples = new Float32Array(N);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    // noise
    const white = Math.random() * 2 - 1;
    // simple 2nd order lowpass / bandpass filter around 1200Hz
    b0 = 0.15 * white + 0.85 * b1;
    b1 = 0.15 * b0 + 0.85 * b2;
    b2 = b1;

    // smooth envelope (rises, then gentle tail)
    const env = Math.sin(t * Math.PI) * Math.exp(-t * 1.5);
    samples[i] = b2 * env * 0.75;
  }
  return samples;
}

// 2. Ink Stamp Impact (deep low thump + wood/paper crack transient)
function genStampImpact(duration = 0.4) {
  const N = Math.floor(SR * duration);
  const samples = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    // low body punch (descending pitch from 140Hz to 45Hz)
    const freq = 45 + 95 * Math.exp(-t * 28);
    const body = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 16);

    // transient click / slap
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 90);

    samples[i] = (body * 0.8 + click * 0.35) * 0.9;
  }
  return samples;
}

// 3. Tactile Snap / Chime (pleasant high-frequency geometric lock tick)
function genSnapPing(duration = 0.25) {
  const N = Math.floor(SR * duration);
  const samples = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    // chime harmonics around 880Hz and 1760Hz
    const tone1 = Math.sin(2 * Math.PI * 880 * t) * Math.exp(-t * 22);
    const tone2 = Math.sin(2 * Math.PI * 1760 * t) * Math.exp(-t * 30);
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 120);

    samples[i] = (tone1 * 0.5 + tone2 * 0.3 + click * 0.2) * 0.8;
  }
  return samples;
}

// Build complete 24.0s soundtrack buffer
function buildFullSoundtrack() {
  const totalDuration = 24.0;
  const totalSamples = Math.floor(SR * totalDuration);
  const master = new Float32Array(totalSamples);

  function mix(sound, startSec, volume = 1.0) {
    const startIdx = Math.floor(startSec * SR);
    for (let i = 0; i < sound.length; i++) {
      if (startIdx + i < master.length) {
        master[startIdx + i] += sound[i] * volume;
      }
    }
  }

  const paper = genPaperSlide();
  const stamp = genStampImpact();
  const snap  = genSnapPing();

  // Timeline events:
  // 0.2s: Opening paper unfold
  mix(paper, 0.2, 0.6);

  // 2.0s: Dimension formula stamp impact: a = v^2/r
  mix(stamp, 2.0, 0.85);

  // 4.3s: Scene 2 transition (linear track whoosh)
  mix(paper, 4.3, 0.55);

  // 6.8s: Deceleration brake stamp
  mix(stamp, 6.8, 0.7);

  // 9.3s: Scene 3 transition (graph camera slide)
  mix(paper, 9.3, 0.6);

  // 12.0s: Delta S max highlight snap
  mix(snap, 12.0, 0.75);

  // 14.0s: Catch at t=10s tick
  mix(snap, 14.0, 0.7);

  // 14.8s: Scene 4 transition (Cartesian grid opens)
  mix(paper, 14.8, 0.6);

  // 17.5s: Resultant Vector R locks in
  mix(snap, 17.5, 0.85);

  // 19.3s: Scene 5 final master poster drop (deep resonant stamp)
  mix(stamp, 19.3, 0.95);

  // 21.0s: Final theory approval badge lock
  mix(snap, 21.0, 0.7);

  return master;
}

const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const track = buildFullSoundtrack();
const wavBuf = createWavBuffer(SR, track);
const outPath = path.join(outDir, 'soundtrack.wav');
fs.writeFileSync(outPath, wavBuf);
console.log(`Generated soundtrack: ${outPath} (${(wavBuf.length / 1024).toFixed(1)} KB)`);
