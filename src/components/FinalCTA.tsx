"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, HelpCircle, MapPin, Phone, Instagram, Send, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export default function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic scaling text inside Final Scene
      gsap.fromTo(
        headlineRef.current,
        { scale: 0.95, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Contact details block slide up
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="final-cta"
      ref={containerRef}
      className="relative min-h-screen bg-luxury-black overflow-hidden flex flex-col justify-between pt-32 pb-16"
    >
      {/* Absolute centerpiece radial light glow (highly premium) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-red/5 rounded-full filter blur-[150px] mix-blend-screen pointer-events-none mx-auto z-0 animate-pulse" />

      {/* Decorative vertical lines and icons */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-luxury-gold to-transparent pointer-events-none" />

      {/* Main End Slogan Block */}
      <div className="relative w-full max-w-5xl mx-auto px-8 md:px-16 text-center z-10 flex flex-col items-center">
        {/* Michelin star reference row */}
        <div className="flex items-center gap-1.5 mb-6 opacity-80 scale-90 md:scale-100">
          <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
          <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold animate-bounce" />
          <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
          <span className="text-[10px] font-sans font-bold tracking-[0.4em] text-luxury-gold pl-2 uppercase">
            HÀNH TRÌNH MICHELIN ĐẲNG CẤP
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-luxury-ivory leading-[0.9] tracking-normal uppercase mb-12 flex flex-col items-center select-none"
        >
          <span>KHÁM PHÁ</span>
          <span className="text-luxury-gold my-2 italic font-light lowercase">tinh hoa</span>
          <span className="text-outline">TRUNG HOA</span>
        </h1>

        <button
          onClick={onOpenBooking}
          className="relative overflow-hidden w-64 h-16 group bg-luxury-gold hover:bg-gold-hover text-luxury-black font-display font-bold text-xs tracking-[0.3em] transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-3xl shadow-luxury-red/25 rounded-none"
        >
          {/* Inner animation ring */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-luxury-red via-red-950 to-luxury-red -translate-x-full group-hover:translate-x-0 transition-transform duration-[800ms] ease-out z-0" />
          <span className="relative z-10 text-luxury-black group-hover:text-luxury-ivory transition-colors duration-500">
            ĐẶT BÀN NGAY
          </span>
        </button>

        {/* Floating character stamp background */}
        <div className="mt-8 font-display text-[9rem] text-luxury-gold/[0.015] leading-none select-none pointer-events-none w-full">
          龍皇
        </div>
      </div>

      {/* Footer / Location Coordinates */}
      <div
        ref={detailsRef}
        className="relative w-full max-w-7xl mx-auto px-8 md:px-16 z-20 border-t border-luxury-gold/10 pt-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left select-none text-xs text-luxury-ivory/60 font-sans"
      >
        <div className="flex gap-4 items-start pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-luxury-gold/10">
          <MapPin className="w-5 h-5 text-luxury-gold flex-shrink-0" />
          <div>
            <span className="font-display text-[10px] tracking-[0.2em] text-luxury-gold block uppercase mb-1">KIỆT TÁC KHÔNG GIAN</span>
            <span className="leading-relaxed font-light block">
              Dinh Thự Đào Viên, Số 8 Tràng Tiền<br />
              Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội
            </span>
          </div>
        </div>

        <div className="flex gap-4 items-start pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-luxury-gold/10 md:pl-6">
          <Phone className="w-5 h-5 text-luxury-red flex-shrink-0" />
          <div>
            <span className="font-display text-[10px] tracking-[0.2em] text-luxury-gold block uppercase mb-1">MẬT TIỆC LIÊN HỆ</span>
            <span className="leading-relaxed font-light block">
              Hotline Hoàng Gia: +84 (24) 3939 8888<br />
              Email: banquet@xiangyang.com.vn
            </span>
          </div>
        </div>

        <div className="flex flex-col md:pl-6 justify-between gap-4">
          <div>
            <span className="font-display text-[10px] tracking-[0.2em] text-luxury-gold block uppercase mb-1">GIỜ CHIÊU ĐÃI THƯỢNG HẠNG</span>
            <span className="leading-relaxed font-light block">
              Yến Trưa: 11:30 – 14:30 | Yến Tối: 18:00 – 22:30
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
              <Compass className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
              <Send className="w-4 h-4" />
            </a>
            <span className="text-[9px] text-luxury-ivory/30 tracking-widest uppercase ml-auto">
              X.Y. ROYAL DINING © 2026. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
