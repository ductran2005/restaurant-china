"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_PARAGRAPHS } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin or parallax the oversized headline while strolling down!
      gsap.fromTo(
        leftTextRef.current,
        { y: 80, opacity: 0 },
        {
          y: -40,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.2,
          }
        }
      );

      // Animate the stories in stagger
      const paragraphs = rightListRef.current?.querySelectorAll(".story-p-block");
      if (paragraphs) {
        paragraphs.forEach((el, index) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none reverse",
              },
              duration: 1.2,
              delay: index * 0.1,
              ease: "power3.out",
            }
          );
        });
      }

      // Parallax for the gorgeous secondary visual (steam tea pour)
      gsap.fromTo(
        imageRevealRef.current,
        { scale: 1.15, y: 50 },
        {
          scale: 1,
          y: -50,
          scrollTrigger: {
            trigger: imageRevealRef.current,
            start: "top 90%",
            end: "bottom 10%",
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative min-h-screen bg-luxury-black py-32 overflow-hidden flex items-center"
    >
      {/* Background graphic accents */}
      <div className="absolute left-1/2 top-12 w-0.5 h-32 bg-gradient-to-b from-luxury-red/40 to-transparent pointer-none" />
      <div className="absolute right-12 bottom-12 font-display text-[15rem] leading-none text-luxury-gold/[0.02] pointer-events-none select-none">
        宫廷
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        {/* Left Side: Oversized Asymmetrical Typography */}
        <div ref={leftTextRef} className="lg:col-span-5 flex flex-col pt-4">
          <span className="text-luxury-gold font-display text-xs tracking-[0.4em] uppercase mb-4 block">
            HÀNH TRÌNH KHỞI NGUYÊN —
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-luxury-ivory leading-[0.9] tracking-normal uppercase flex flex-col">
            <span>TỪ BẮC</span>
            <span className="text-luxury-gold pl-8 md:pl-12 my-2 relative">
              KINH
              <span className="absolute left-0 bottom-3 w-6 md:w-8 h-[2px] bg-luxury-gold" />
            </span>
            <span className="text-outline">ĐẾN BAN</span>
            <span className="pl-4 md:pl-6 text-luxury-red">ĂN CỦA BẠN</span>
          </h2>
          
          <div className="mt-16 relative w-full h-[320px] md:h-[400px] overflow-hidden border border-luxury-gold/10 group">
            <div className="absolute inset-0 bg-luxury-black/30 z-10 transition-colors duration-700 group-hover:bg-luxury-black/10" />
            <div ref={imageRevealRef} className="w-full h-full">
              <img
                src="/images/gongfu-tea.png"
                alt="Imperial Chinese tea ritual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] transition-transform duration-1000 scale-105"
              />
            </div>
            {/* Elegant label floating */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col">
              <span className="font-display text-[10px] tracking-widest text-luxury-gold">TRÀ ĐẠO CHIÊU ĐÃI</span>
              <span className="text-[9px] text-luxury-ivory/60 tracking-[0.2em] font-sans mt-0.5">NGHI THỨC KHỞI ĐẦU YẾN TIỆC</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Stories */}
        <div ref={rightListRef} className="lg:col-span-7 flex flex-col gap-12 lg:gap-16 lg:pl-12">
          {STORY_PARAGRAPHS.map((story, idx) => (
            <div
              key={story.title}
              className="story-p-block flex gap-6 md:gap-8 items-start border-b border-luxury-ivory/5 pb-12 hover:border-luxury-gold/20 transition-colors duration-700 group"
            >
              <div className="flex flex-col items-center">
                <span className="font-display font-medium text-xl md:text-2xl text-luxury-gold/40 group-hover:text-luxury-gold transition-colors duration-500">
                  {`0${idx + 1}`}
                </span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold/30 to-transparent mt-2" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="font-sans text-[10px] tracking-[0.3em] font-semibold text-luxury-red uppercase mb-1">
                  {story.subtitle}
                </span>
                <h3 className="font-display font-semibold text-2xl md:text-3xl text-luxury-ivory group-hover:text-luxury-gold/90 transition-colors duration-500 mb-4 tracking-wide">
                  {story.title}
                </h3>
                <p className="font-sans font-light text-sm md:text-base text-luxury-ivory/70 leading-relaxed tracking-wide">
                  {story.content}
                </p>
              </div>
            </div>
          ))}
          
          {/* Aesthetic Signature Stamp Quote */}
          <div className="story-p-block flex flex-col items-start border-l-2 border-luxury-gold pl-6 py-2 mt-4">
            <p className="font-serif italic text-lg text-luxury-gold/90 leading-relaxed font-light">
              &ldquo;Mỗi thớ thịt thơm ngon của Vịt quay Bắc Kinh truyền kỳ đều trải qua hành trình khắc nghiệt giữa lửa hồng và thời gian.&rdquo;
            </p>
            <span className="font-sans text-[10px] tracking-[0.25em] text-luxury-ivory/50 mt-3 font-semibold uppercase">
              Chưởng Lục Thập Tam Đường — Tri Đại Hoàng Đại Đầu Bếp
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
