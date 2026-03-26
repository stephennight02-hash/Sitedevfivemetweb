import { useState, useCallback, useEffect } from "react";

// Global mute state
let globalIsMuted = false;
const listeners = new Set<(muted: boolean) => void>();

const setGlobalMuted = (muted: boolean) => {
  globalIsMuted = muted;
  listeners.forEach(listener => listener(muted));
};

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

const playBeep = (frequency: number, duration: number, type: OscillatorType = "sine", volumeValue: number = 0.1) => {
  if (!audioContext || globalIsMuted) return;
  
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(volumeValue, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

export const useUISound = () => {
  const [isMuted, setIsMuted] = useState(globalIsMuted);

  useEffect(() => {
    const handleMuteChange = (muted: boolean) => setIsMuted(muted);
    listeners.add(handleMuteChange);
    return () => {
      listeners.delete(handleMuteChange);
    };
  }, []);

  const playHoverSound = useCallback(() => {
    playBeep(800, 0.05, "sine", 0.02); 
  }, []);

  const playClickSound = useCallback(() => {
    playBeep(400, 0.1, "square", 0.05);
  }, []);

  const toggleMute = useCallback(() => {
    setGlobalMuted(!globalIsMuted);
  }, []);

  return { playHoverSound, playClickSound, isMuted, toggleMute };
};
