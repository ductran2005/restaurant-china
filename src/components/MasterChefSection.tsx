"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Medal, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function MasterChefSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const infoBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade & enter of the master chef image
      gsap.fromTo(
        imageFrameRef.current,
        { scale: 1.15, filter: "brightness(0.5)" },
        {
          scale: 1,
          filter: "brightness(0.85)",
          ease: "sine.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
          }
        }
      );

      // Staggered reveal of header strings
      const lines = textLeftRef.current?.querySelectorAll(".chef-head-line");
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: textLeftRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Interview block details fading up
      gsap.fromTo(
        infoBlockRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoBlockRef.current,
            start: "top 90%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chef"
      ref={sectionRef}
      className="relative min-h-screen bg-[#060606] py-32 overflow-hidden flex items-center justify-center"
    >
      {/* Editorial Decorative Overlays resembling a fashion/luxury magazine */}
      <div className="absolute left-8 top-12 z-10 text-[9px] font-sans tracking-[0.4em] text-luxury-ivory/20 hidden lg:block uppercase select-none">
        BẢN GHI Độc Quyền — LƯU HÀNH HOÀNG GIA ĐỆ PHÁT — PHÁT SÓNG 2026
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 writing-mode-vertical z-10 text-luxury-gold/10 font-display text-[9rem] select-none pointer-events-none uppercase">
        大師
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Side: Dramatic Headline Text */}
        <div ref={textLeftRef} className="lg:col-span-5 flex flex-col items-start z-10">
          <div className="flex items-center gap-2 mb-6 text-luxury-gold">
            <Medal className="w-4 h-4 text-luxury-red animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase">
              HUY CHƯƠNG LỤC ĐẠI DANH SƯ
            </span>
          </div>

          <h3 className="font-display font-black text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-luxury-ivory leading-[1.15] tracking-normal uppercase mb-8 flex flex-col">
            <span className="chef-head-line overflow-hidden block py-4 -my-4">
              <span className="block py-1">40 NĂM</span>
            </span>
            <span className="chef-head-line overflow-hidden block text-luxury-gold py-4 -my-4">
              <span className="block pl-4 md:pl-8 border-l-2 border-luxury-red py-1">GÌN GIỮ</span>
            </span>
            <span className="chef-head-line overflow-hidden block text-outline py-4 -my-4">
              <span className="block italic font-light py-1">TINH HOA</span>
            </span>
          </h3>

          <p className="font-sans text-xs md:text-sm text-luxury-ivory/70 leading-relaxed tracking-wide font-light max-w-md pb-6 border-b border-luxury-gold/10">
            Người quốc sư đứng đầu căn bếp của chúng tôi, đem cả linh hồn đời người ấp ủ nuôi dưỡng nghệ thuật quay vịt lò đất nung trứ danh. Một cuộc đời thầm lặng kết tinh vị giác tối thượng.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 flex items-center justify-center border border-luxury-gold/30 rounded-full">
              <span className="font-serif text-xs text-luxury-gold">師</span>
            </div>
            <div>
              <span className="font-display text-sm text-luxury-ivory tracking-wider block">QUỐC SƯ: TẦN THIÊN HÙNG</span>
              <span className="text-[10px] text-luxury-gold/70 tracking-widest font-sans uppercase">ĐẠI ĐẦU BẾP ĐIỀU BIỆT CHI TIẾT</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Image Composition */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Full-height Portrait */}
          <div className="md:col-span-8 relative overflow-hidden border border-luxury-gold/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] aspect-[3/4] group">
            <div
              ref={imageFrameRef}
              className="w-full h-full"
            >
              <img
              loading="lazy"
              decoding="async"
                src="/images/master-chef.webp"
                alt="Master Chef Tan Thien Hung Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover origin-center transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.7] contrast-[1.1]"
              />
            </div>
            {/* Soft Imperial gold glow over layout */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent h-1/2" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-luxury-gold/15" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold/15" />

            {/* Floating character badge inside image */}
            <div className="absolute top-6 left-6 flex flex-col z-20 bg-luxury-red/90 text-luxury-ivory px-3 py-4 text-center font-display text-xs tracking-[0.2em] shadow-lg leading-tight uppercase rounded-none border border-luxury-gold/30">
              <span>四</span>
              <span>十</span>
              <span>載</span>
            </div>
          </div>

          {/* Secondary Editorial Commentary Block */}
          <div ref={infoBlockRef} className="md:col-span-4 flex flex-col gap-6 md:pl-4">
            <div className="flex items-center gap-1.5 text-luxury-gold/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[9px] font-sans tracking-widest font-bold uppercase">
                GIA KINH ĐỘC BẢN
              </span>
            </div>
            
            <h4 className="font-display font-medium text-lg md:text-xl text-luxury-gold leading-snug">
              &ldquo;Lửa đốt gỗ đào phải luôn chuẩn độ ẩm, để hương khói thẩm thấu đều đặn.&rdquo;
            </h4>

            <p className="font-sans text-xs text-luxury-ivory/60 leading-relaxed tracking-wide font-light">
              Mỗi vịt ra lò không chỉ đạt chuẩn hoàng kim ngoại diện mà còn phải bảo tồn vẹn nguyên giọt súp ngọt nóng bên trong lớp mỡ ngậy mượt. Khách thưởng vị sẽ tức khắc nhận biết sự khác biệt phi phàm.
            </p>

            <span className="text-[10px] font-sans font-semibold tracking-widest text-luxury-red border-t border-luxury-gold/10 pt-4 uppercase block">
              — BẠN ĐÃ SẴN SÀNG CHỜ ĐỢI HOÀNG GIA CHƯA?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
