"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureSection() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const scaleImageRef = useRef<HTMLImageElement>(null);
  const textTriggerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Create a master timeline for pinning and animating
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=150%", // How long to stay pinned
          pin: true,
          scrub: 1, // Smooth scrolling connection
          invalidateOnRefresh: true,
        },
      });

      // 1. Color background transitions from jet black to intense imperial dark crimson
      tl.to(
        pinSectionRef.current,
        {
          backgroundColor: "#2B0101", // Deep rich dark imperial red
          duration: 1,
        },
        0
      );

      // 2. Image scales from normal up to a massive detailed immersive viewport
      tl.fromTo(
        scaleImageRef.current,
        {
          scale: 0.95,
          borderRadius: "0px",
          filter: "brightness(0.7) contrast(1.1)",
        },
        {
          scale: 1.15,
          filter: "brightness(0.85) contrast(1.2)",
          duration: 1.5,
        },
        0
      );

      // 3. Left title slides in dramatically with masking
      tl.fromTo(
        textLeftRef.current,
        {
          x: -150,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
        },
        0.1
      );

      // 4. Right detailed text fades upwards
      tl.fromTo(
        textRightRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
        },
        0.2
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Fluid mobile scrolling with natural fades
      gsap.fromTo(
        pinSectionRef.current,
        { backgroundColor: "#0B0B0B" },
        {
          backgroundColor: "#2B0101",
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        scaleImageRef.current,
        { scale: 1, filter: "brightness(0.5) contrast(1.1)" },
        {
          scale: 1.08,
          filter: "brightness(0.65) contrast(1.15)",
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top 90%",
            end: "bottom 10%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        textLeftRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: textLeftRef.current,
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(
        textRightRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          scrollTrigger: {
            trigger: textRightRef.current,
            start: "top 85%",
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={pinSectionRef}
      id="signature"
      className="relative w-full min-h-screen md:h-screen bg-luxury-black overflow-hidden flex items-center justify-center py-16 md:py-0"
    >
      {/* Decorative Golden Floating Characters */}
      <div className="absolute left-8 top-12 md:left-16 md:top-20 z-10 text-[9px] font-sans font-extrabold tracking-[0.5em] text-luxury-gold flex flex-col gap-2 uppercase">
        <span>KHÁNH ĐẠI HOÀNG TIỆC</span>
        <span className="text-luxury-ivory/35">CẬP QUY KẾT ĐỈNH CHI TIẾT</span>
      </div>

      <div className="absolute right-8 bottom-12 md:right-16 md:bottom-20 z-10 text-[9px] font-sans text-right text-luxury-ivory/40 tracking-[0.3em] uppercase flex flex-col gap-1">
        <span>VỊT QUAY TRUYỀN THUYẾT BẮC KINH</span>
        <span className="text-luxury-gold/60">TỈ LỆ THỊT MỠ ĐẠT TIÊU CHUẨN VÀNG</span>
      </div>

      {/* Frame details */}
      <div className="absolute top-1/2 left-0 w-24 h-[1px] bg-luxury-gold/20 z-10 pointer-events-none hidden md:block" />
      <div className="absolute top-1/2 right-0 w-24 h-[1px] bg-luxury-gold/20 z-10 pointer-events-none hidden md:block" />

      {/* Main Container */}
      <div className="w-full md:h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-center gap-10 md:justify-between z-10 pointer-events-none select-none relative pt-20 md:pt-24 pb-12 md:pb-24">
        {/* Top Section: Title & Headline */}
        <div ref={textTriggerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 h-full">
          
          <div className="flex flex-col justify-center max-w-2xl pt-8 md:pt-0">
            <span className="text-luxury-gold text-xs font-display tracking-[0.4em] uppercase mb-4 block">
              KIỆT TÁC CHỮA LÀNH ĐẤT TRỜI —
            </span>
            <h2
              ref={textLeftRef}
              className="font-display font-black text-4xl sm:text-7xl md:text-8xl xl:text-9xl text-luxury-ivory leading-[0.95] uppercase tracking-normal will-change-transform"
            >
              VỊT QUAY <br />
              <span className="text-luxury-gold">BẮC KINH</span>
            </h2>
          </div>

          {/* Right Floating Details */}
          <div
            ref={textRightRef}
            className="md:max-w-md flex flex-col items-start gap-6 bg-luxury-black/60 border border-luxury-gold/15 backdrop-blur-md p-6 md:p-10 pointer-events-auto will-change-transform"
          >
            <span className="text-luxury-red font-sans text-[10px] font-bold tracking-[0.3em] uppercase">
              THƯƠNG HIỆU HOÀNG GIA ĐẠI DIỆN
            </span>
            <p className="font-sans text-xs md:text-sm text-luxury-ivory/80 leading-relaxed tracking-wide">
              Mỗi miếng Vịt Bắc Kinh được chạm trổ chính xác, chứa đựng cấu trúc giòn sần sật pha trộn hài hòa với thớ thịt ngọt mát đậm hương mật phong, cuốn chặt trong lớp bánh pía làm tay siêu phàm mỏng nhẹ.
            </p>
            <div className="flex gap-8 border-t border-luxury-gold/10 pt-6 w-full text-left">
              <div>
                <span className="font-serif text-xl text-luxury-gold font-light block">108</span>
                <span className="font-sans text-[8px] text-luxury-ivory/50 tracking-wider uppercase">Lát Cắt Tuyệt Tế</span>
              </div>
              <div className="border-l border-luxury-gold/10 pl-8">
                <span className="font-serif text-xl text-luxury-gold font-light block">230°C</span>
                <span className="font-sans text-[8px] text-luxury-ivory/50 tracking-wider uppercase">Nhiệt Độ Gỗ Đào cổ</span>
              </div>
              <div className="border-l border-luxury-gold/10 pl-8">
                <span className="font-serif text-xl text-luxury-gold font-light block">127h</span>
                <span className="font-sans text-[8px] text-luxury-ivory/50 tracking-wider uppercase">Chuẩn Bị Công Phu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Background/Centerpiece Dynamic Image */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
        <div className="w-full h-full md:w-[70vw] md:h-[75vh] relative overflow-hidden border border-luxury-gold/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          <img
              loading="lazy"
              decoding="async"
            ref={scaleImageRef}
            src="/images/peking-duck.webp"
            alt="Vịt Quay Bắc Kinh Glistening Glaze"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1] origin-center will-change-transform"
          />
          {/* Edge shadow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-luxury-black/80 md:bg-radial-gradient" />
        </div>
      </div>

      {/* Gradient to smooth bottom transition back to black */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-luxury-black to-transparent pointer-events-none z-10" />
    </div>
  );
}
