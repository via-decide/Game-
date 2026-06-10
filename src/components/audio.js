/**
 * Orchard Web Audio API Synthesizer Engine
 * 
 * Synthesizes retro sounds and procedural background loops natively:
 * 1. Tilling (Low-pass noise sweep)
 * 2. Planting (Short arpeggio chime)
 * 3. Harvesting (Rising octave sweep)
 * 4. Purchase (Metallic coin-drop chimes)
 * 5. Alarm (solar flares warning)
 * 6. Ambient Music (Low-tempo generative space drone)
 */

let audioCtx = null;
let ambientMusicNode = null;
let ambientInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const AudioEngine = {
  // Till soil (Low low-pass noise sweep)
  playTill() {
    try {
      const ctx = getAudioContext();
      const time = ctx.currentTime;

      // Create noise buffer
      const bufferSize = ctx.sampleRate * 0.15; // 150ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, time);
      filter.frequency.exponentialRampToValueAtTime(40, time + 0.15);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(time);
      noise.stop(time + 0.15);
    } catch (e) {
      console.warn('Audio failed', e);
    }
  },

  // Plant seeds (Short high-pitch dual arpeggio)
  playPlant() {
    try {
      const ctx = getAudioContext();
      const time = ctx.currentTime;

      const playTone = (freq, startTime, duration, vol) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(vol, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      playTone(440, time, 0.08, 0.15);      // A4
      playTone(554.37, time + 0.04, 0.08, 0.12); // C#5
      playTone(659.25, time + 0.08, 0.12, 0.1);  // E5
    } catch (e) {
      console.warn('Audio failed', e);
    }
  },

  // Harvest crops (Satisfying rising sine sweep + sparkles)
  playHarvest() {
    try {
      const ctx = getAudioContext();
      const time = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, time); // E4
      osc.frequency.exponentialRampToValueAtTime(1320, time + 0.25); // E6

      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.25);
    } catch (e) {
      console.warn('Audio failed', e);
    }
  },

  // Purchase item (Metallic coin chime)
  playBuy() {
    try {
      const ctx = getAudioContext();
      const time = ctx.currentTime;

      const playCoin = (freq, delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time + delay);
        
        gain.gain.setValueAtTime(0.12, time + delay);
        gain.gain.exponentialRampToValueAtTime(0.005, time + delay + 0.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time + delay);
        osc.stop(time + delay + 0.2);
      };

      playCoin(987.77, 0);   // B5
      playCoin(1318.51, 0.07); // E6
    } catch (e) {
      console.warn('Audio failed', e);
    }
  },

  // Solar flare / weather crisis (Pulsing high alarm waves)
  playAlarm() {
    try {
      const ctx = getAudioContext();
      const time = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, time);
      osc.frequency.linearRampToValueAtTime(300, time + 0.2);
      osc.frequency.linearRampToValueAtTime(600, time + 0.4);

      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.4);
    } catch (e) {
      console.warn('Audio failed', e);
    }
  },

  // Procedural Generative Space Drone (Background music)
  toggleAmbient(forceState = null) {
    try {
      const ctx = getAudioContext();
      const shouldPlay = forceState !== null ? forceState : (ambientInterval === null);

      if (!shouldPlay) {
        // Stop music
        if (ambientInterval) {
          clearInterval(ambientInterval);
          ambientInterval = null;
        }
        return false;
      }

      if (ambientInterval) return true; // Already playing

      // Ambient loop parameters
      const playPadNotes = () => {
        const time = ctx.currentTime;
        const rootNote = 110; // A2
        const harmonics = [1, 1.5, 2, 2.5, 3]; // Overtones
        
        harmonics.forEach((h, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          // Slightly detuned frequencies for organic warmth
          osc.frequency.setValueAtTime(rootNote * h + (Math.random() * 2 - 1), time);
          
          // Slow attack & decay envelop
          const duration = 6 + Math.random() * 4;
          const peakVol = 0.02 / harmonics.length;
          
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(peakVol, time + duration * 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(time);
          osc.stop(time + duration);
        });
      };

      // Play initially, then loop every 7s
      playPadNotes();
      ambientInterval = setInterval(playPadNotes, 7000);
      return true;
    } catch (e) {
      console.warn('Audio failed', e);
      return false;
    }
  }
};
