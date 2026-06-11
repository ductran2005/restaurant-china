"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onScrollToStory: () => void;
  onOpenBooking: () => void;
}

export default function HeroSection({ onScrollToStory, onOpenBooking }: HeroSectionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const title3Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smoke particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxLife: number;
      life: number;

      constructor() {
        this.x = width / 2 + (Math.random() - 0.5) * 300;
        this.y = height / 2 + 100 + (Math.random() - 0.5) * 100;
        this.size = Math.random() * 150 + 100;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -Math.random() * 0.6 - 0.2;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.maxLife = Math.random() * 200 + 200;
        this.life = 0;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        // Fade in first 15% life, then fade out the remaining
        if (this.life < this.maxLife * 0.15) {
          this.opacity = (this.life / (this.maxLife * 0.15)) * 0.2;
        } else {
          this.opacity = 0.2 * (1 - this.life / this.maxLife);
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        const gradient = context.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        );
        gradient.addColorStop(0, `rgba(245, 239, 228, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(11, 11, 11, 0)");
        context.fillStyle = gradient;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    let particles: Particle[] = [];
    const maxParticles = 25;

    // Initialize some particles
    for (let i = 0; i < maxParticles; i++) {
      const p = new Particle();
      p.life = Math.random() * p.maxLife; // Staggered starting points
      particles.push(p);
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.fillStyle = "rgba(11, 11, 11, 0.08)"; // Leave trace
      ctx.fillRect(0, 0, width, height);

      // Manage particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Filter dead and generate new ones
      particles = particles.filter((p) => p.life < p.maxLife);
      while (particles.length < maxParticles) {
        particles.push(new Particle());
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Entrance animations using GSAP
  useEffect(() => {
    // Initial setup states
    gsap.set([title1Ref.current, title2Ref.current, title3Ref.current], {
      y: 120,
      opacity: 0,
    });
    gsap.set(subRef.current, { y: 30, opacity: 0 });
    gsap.set(ctaRef.current, { scale: 0.9, opacity: 0 });
    gsap.set(bgImgRef.current, { scale: 1.3, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animate background image first
    tl.to(bgImgRef.current, {
      scale: 1.05,
      opacity: 0.9,
      duration: 2.2,
    });

    // Stagger character/text reveal
    tl.to(
      [title1Ref.current, title2Ref.current, title3Ref.current],
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        stagger: 0.2,
      },
      "-=1.4"
    );

    // Fade in subhead and CTA button
    tl.to(
      subRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
      },
      "-=0.8"
    );

    tl.to(
      ctaRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
      },
      "-=0.8"
    );

    // Subtle parallax mouse hover on background image
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgImgRef.current) return;
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 15;
      const yPercent = (clientY / window.innerHeight - 0.5) * 15;

      gsap.to(bgImgRef.current, {
        x: xPercent,
        y: yPercent,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-luxury-black overflow-hidden flex flex-col justify-center md:justify-end pt-20 md:pt-0 pb-12 md:pb-20"
    >
      {/* Cinematic Centerpiece Image */}
      <div
        ref={imgContainerRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0"
      >
        <img
          ref={bgImgRef}
          src="/images/peking-duck.png"
          alt="Tinh Hoa Vịt Quay Bắc Kinh"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover origin-center opacity-0 filter brightness-[0.4] contrast-[1.1] will-change-transform"
        />
        {/* Soft, dramatic radial vignette gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0B0B0B_80%)]" />
        {/* Gold side lighting highlight */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-luxury-gold/5 to-transparent pointer-none" />
      </div>

      {/* Floating Canvas Smoke Effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 mixture-screen opacity-40"
      />

      {/* Dynamic Lighting Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/60 pointer-events-none z-10"
      />

      {/* Imperial Character Icon Background (Huge stamp silhouette) */}
      <div className="absolute right-10 top-1/4 select-none pointer-events-none opacity-[0.02] transform hover:scale-105 transition-transform duration-1000 z-10 hidden xl:block">
        <span className="font-display text-[45rem] leading-none text-luxury-gold">
          鴨
        </span>
      </div>

      {/* Content Container */}
      <div className="relative w-full px-6 sm:px-8 md:px-16 xl:px-24 2xl:px-32 z-25 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 select-none pt-12 md:pt-32 pb-4 h-full">
        {/* Left Side: Massive Editorial Typography */}
        <div className="flex-none flex flex-col">
          {/* Imperial Crest Detail */}
          <div className="flex items-center gap-4 mb-4 md:mb-6 group opacity-90">
            <div className="w-8 md:w-12 h-[1px] bg-luxury-gold"></div>
            <span className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.4em] text-luxury-gold uppercase">
              DI SẢN 40 NĂM
            </span>
          </div>

          <h1 className="font-serif font-black text-[2.4rem] xs:text-[3.2rem] sm:text-[4.5rem] md:text-[7.5rem] lg:text-[9rem] xl:text-[10rem] text-luxury-ivory leading-[1.1] md:leading-[1.15] tracking-normal uppercase flex flex-col gap-0.5 md:gap-3 italic select-none md:-ml-6 lg:-ml-12">
            <span className="overflow-hidden block py-2 md:py-4 -my-2 md:-my-4">
              <span ref={title1Ref} className="block origin-left hover:text-luxury-gold transition-colors duration-500 whitespace-nowrap text-luxury-ivory py-1 opacity-0 will-change-transform">
                ẨM THỰC
              </span>
            </span>
            <span className="overflow-hidden block py-2 md:py-4 -my-2 md:-my-4">
              <span ref={title2Ref} className="block text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-luxury-ivory to-luxury-red whitespace-nowrap py-1 opacity-0 will-change-transform">
                TRUNG HOA
              </span>
            </span>
            <span className="overflow-hidden block py-2 md:py-4 -my-2 md:-my-4">
              <span ref={title3Ref} className="block hover:text-luxury-red transition-all duration-700 whitespace-nowrap text-luxury-ivory py-1 opacity-0 will-change-transform">
                ĐỈNH CAO
              </span>
            </span>
          </h1>
        </div>

        {/* Right Side: Subtitle, CTA and Scroll Indicator */}
        <div className="shrink-0 w-full md:w-[340px] xl:w-[380px] flex flex-col items-start md:items-end gap-6 md:gap-8 md:pb-6 md:text-right">
          <p
            ref={subRef}
            className="text-luxury-ivory/80 text-sm xs:text-base md:text-xl lg:text-2xl font-serif italic leading-relaxed tracking-wide border-l md:border-l-0 md:border-r border-luxury-gold/30 pl-4 md:pl-0 md:pr-4 opacity-0 will-change-transform"
          >
            Tinh hoa vịt quay Bắc Kinh được tái hiện bằng nghệ thuật hiện đại, mang đến hành trình vị giác đậm chất đế vương.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center md:justify-end gap-4 md:gap-6 w-full opacity-0 will-change-transform">
            <button
              onClick={onOpenBooking}
              className="bg-luxury-gold hover:bg-gold-hover text-luxury-black font-display font-bold text-xs tracking-[0.25em] h-12 md:h-14 px-8 md:px-10 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-2xl shadow-luxury-gold/10 whitespace-nowrap rounded-none"
            >
              KHÁM PHÁ NGAY
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={onScrollToStory}
                className="w-12 h-12 md:w-14 md:h-14 border border-luxury-ivory/10 hover:border-luxury-gold rounded-none flex items-center justify-center transition-colors duration-500 group"
              >
                <ChevronDown className="w-5 h-5 text-luxury-ivory/50 group-hover:text-luxury-gold group-hover:translate-y-1 transition-all duration-500" />
              </button>
              <div className="flex flex-col text-left md:text-right">
                <span className="text-[9px] uppercase tracking-[0.1em] text-luxury-ivory/40">ĐẦU BẾP TRƯỞNG</span>
                <span className="text-xs font-bold tracking-[0.1em] text-luxury-ivory">TẦN THIÊN HÙNG</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frame border lines - Luxury Magazine Detail */}
      <div className="absolute left-8 bottom-0 top-0 w-[1px] bg-luxury-ivory/5 pointer-events-none hidden md:block" />
      <div className="absolute right-8 bottom-0 top-0 w-[1px] bg-luxury-ivory/5 pointer-events-none hidden md:block" />
    </section>
  );
}
