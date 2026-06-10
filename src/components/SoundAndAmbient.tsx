"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Waves } from "lucide-react";

export default function SoundAndAmbient() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const scrollKeyRef = useRef<number>(0);

  // Play a beautiful, delicate Chinese guzheng string pluck synthesized on Web Audio API
  const playGuzhengPluck = (freq: number, delay: number = 0) => {
    if (!isPlaying || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Guzheng string acoustic modeling: fine-tuned triangle + sub sine wave with long delay wrap
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      // Add elegant tremolo/vibrato (royal guzheng character)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 6; // 6Hz nice hand tremor
      lfoGain.gain.value = 3; // frequency deviation
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      // Shaping the envelope: quick pluck & long decay shimmer
      gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + delay + 0.05); // quick pluck
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 1.8); // soft decay

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 2);
    } catch {
      // Graceful fallback
    }
  };

  const startSoundscape = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Play an entry royal sweep arpeggio
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      // Pentatonic beautiful chords
      const freqs = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C D E G A C
      playGuzhengPluck(freqs[0], 0);
      playGuzhengPluck(freqs[2], 0.15);
      playGuzhengPluck(freqs[3], 0.3);
      playGuzhengPluck(freqs[5], 0.45);
    }
  }, [isPlaying]);

  // Arpeggiate soft pentatonic music on scroll
  useEffect(() => {
    let lastScrollTime = 0;
    const handleScroll = () => {
      if (!isPlaying) return;
      const now = Date.now();
      // Rate limit sound triggers to once every 2 seconds on scroll
      if (now - lastScrollTime > 2200) {
        lastScrollTime = now;
        
        // Pick random beautiful Chinese royal pentatonic notes
        const scale = [196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99]; // G A C D E G A C D E G
        const count = Math.floor(Math.random() * 2) + 2; // play 2-3 notes arpeggio
        
        for (let i = 0; i < count; i++) {
          const randomNoteIdx = Math.floor(Math.random() * scale.length);
          playGuzhengPluck(scale[randomNoteIdx], i * 0.12);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPlaying]);

  const toggleSound = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      startSoundscape();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 md:bottom-8 md:hover:scale-105 duration-300 z-50 flex items-center gap-3 bg-luxury-black/80 border border-luxury-gold/25 backdrop-blur-md px-4 py-2.5 rounded-none shadow-2xl select-none">
      <button
        onClick={toggleSound}
        className="text-luxury-gold flex items-center justify-center p-0.5 focus:outline-none cursor-pointer"
        title={isPlaying ? "Tắt đàn Tranh" : "Mở đàn Tranh hoàng triều"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 animate-pulse text-luxury-red" />
        ) : (
          <VolumeX className="w-4 h-4 text-luxury-gold/50" />
        )}
      </button>

      <div className="flex flex-col text-left">
        <span className="text-[8px] font-display font-bold tracking-[0.2em] text-luxury-gold uppercase leading-none">
          {isPlaying ? "ĐANG ĐÀN TRANH" : "MỞ ĐÀN TRANH"}
        </span>
        <span className="text-[7px] text-luxury-ivory/50 font-sans tracking-widest uppercase mt-1 leading-none">
          {isPlaying ? "HƯƠNG THẢO ÂM TIỆC" : "NHẤN ĐỂ PHÁT NHẠC"}
        </span>
      </div>

      {isPlaying && (
        <div className="flex gap-0.5 items-end h-3 ml-2">
          <span className="w-0.5 bg-luxury-gold animate-bounce" style={{ animationDuration: "1s" }} />
          <span className="w-0.5 bg-luxury-red animate-bounce" style={{ animationDuration: "0.8s" }} />
          <span className="w-0.5 bg-luxury-gold animate-bounce" style={{ animationDuration: "1.2s" }} />
          <span className="w-0.5 bg-luxury-gold/40 animate-bounce" style={{ animationDuration: "0.7s" }} />
        </div>
      )}
    </div>
  );
}
