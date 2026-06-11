"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURED_DISHES, type FeaturedDish } from "../data";
import { Plus, ArrowRight } from "lucide-react";
import DishDetailModal from "./DishDetailModal";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedDish, setSelectedDish] = useState<FeaturedDish | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Find total scroll length
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth);
      };

      // Set up the pinning and horizontal scroll
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        }
      );

      // Subtle parallax on card background images inside horizontal scrolling
      const cards = track.querySelectorAll(".dish-card");
      cards.forEach((card) => {
        const bgImg = card.querySelector(".card-bg");
        if (bgImg) {
          gsap.fromTo(
            bgImg,
            { x: "-10%" },
            {
              x: "10%",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getById("scrollTrigger") || undefined, // syncs with track translation
                start: "left right",
                end: "right left",
                scrub: true,
              }
            }
          );
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile does not use pinning or sliding translation; it relies on smooth native overflow swipe.
      // Subtle entry fade-ins can still be used for cards.
      const cards = track.querySelectorAll(".dish-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.8, y: 15 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: "left 90%",
              end: "left 50%",
              scrub: true,
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full min-h-screen md:h-screen bg-luxury-black overflow-hidden flex flex-col justify-center py-20 md:py-0"
    >
      {/* Title Header with custom spacing */}
      <div className="relative md:absolute top-0 md:top-16 left-0 md:left-16 px-6 md:px-0 mb-10 md:mb-0 z-20 flex flex-col pointer-events-none">
        <span className="text-luxury-gold text-xs font-display tracking-[0.4em] uppercase mb-2">
          MỸ VỊ KÝ —
        </span>
        <h3 className="font-display font-medium text-2xl sm:text-4xl md:text-5xl text-luxury-ivory uppercase tracking-wide leading-tight mt-1">
          BỐN ĐẠI MỸ VỊ HOÀNG GIA
        </h3>
      </div>

      {/* Background Chinese Calligraphy watermark */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.015] z-0 font-display text-[15rem] md:text-[24rem]">
        饕餮
      </div>

      {/* Horizontal Track Container */}
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-16 px-6 md:px-24 items-center h-auto md:h-[75vh] w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none select-none z-10 scrollbar-none pb-8 md:pb-0"
      >
        {FEATURED_DISHES.map((dish, index) => (
          <div
            key={dish.id}
            className="dish-card relative w-[85vw] sm:w-[65vw] md:w-[60vw] lg:w-[48vw] xl:w-[40vw] h-[55vh] md:h-[65vh] bg-[#111111] overflow-hidden border border-luxury-gold/15 flex-shrink-0 flex flex-col justify-end p-6 md:p-12 hover:border-luxury-gold/40 transition-colors duration-700 group snap-center pointer-events-auto"
          >
            {/* Background Image with slight tilt/zoom scale effect on hover */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <img
              loading="lazy"
              decoding="async"
                src={dish.imageUrl}
                alt={dish.vietnameseName}
                referrerPolicy="no-referrer"
                className="card-bg w-[120%] h-full object-cover filter brightness-[0.5] contrast-[1.1] transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Luxury dark vignetting */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />
            </div>

            {/* Giant index number backround */}
            <div className="absolute -top-6 -right-6 font-display font-black text-[12rem] text-luxury-gold/[0.03] select-none pointer-events-none group-hover:text-luxury-gold/[0.05] transition-colors duration-700">
              {`0${index + 1}`}
            </div>

            {/* Chinese Script Stamp */}
            <div className="absolute top-8 right-8 writing-mode-vertical border border-luxury-red/40 px-1 py-3 text-luxury-red font-display text-lg tracking-widest leading-none bg-luxury-black/40 backdrop-blur-sm shadow-md">
              {dish.chineseName}
            </div>

            {/* Content Details */}
            <div className="relative z-10 flex flex-col items-start w-full">
              <span className="text-luxury-gold font-sans text-[10px] tracking-[0.25em] h-5 uppercase flex items-center gap-1.5 font-bold mb-2">
                <Plus className="w-3.5 h-3.5 text-luxury-red" />
                MỸ VỊ KÝ {index + 1}
              </span>
              
              <h4 className="font-display font-medium text-3xl md:text-4xl text-luxury-ivory tracking-wide leading-none mb-4 group-hover:text-luxury-gold transition-colors duration-500">
                {dish.vietnameseName}
              </h4>
              
              <p className="font-sans text-xs md:text-sm text-luxury-ivory/70 leading-relaxed font-light tracking-wide mb-8 max-w-md">
                {dish.description}
              </p>

              {/* Sub-recipes / Key specifications */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-luxury-ivory/10 pt-6 w-full text-left">
                {dish.details.map((detail) => (
                  <span
                    key={detail}
                    className="font-sans text-[10px] tracking-wider text-luxury-gold/80 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-luxury-red rounded-full" />
                    {detail}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedDish(dish)}
                aria-label={`Xem chi tiết ${dish.vietnameseName}`}
                className="mt-8 flex items-center gap-2 border-b border-luxury-gold/30 pb-2 text-luxury-gold/70 transition-all duration-500 ease-out hover:border-luxury-gold hover:text-luxury-gold group-hover:translate-x-3"
              >
                <span className="font-display text-[10px] tracking-[0.3em] uppercase">CHI TIẾT MỸ VỊ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Ending Track Piece */}
        <div className="flex flex-col items-start justify-center pl-8 pr-24 w-[30vw] md:w-[25vw] flex-shrink-0 select-none">
          <div className="w-[1px] h-24 bg-gradient-to-b from-luxury-gold to-transparent mb-8" />
          <h5 className="font-display font-bold text-2xl text-luxury-gold tracking-wide uppercase leading-tight">
            TINH HOA KHÔNG DỪNG LẠI
          </h5>
          <p className="font-sans text-xs text-luxury-ivory/50 mt-4 leading-relaxed font-light">
            Chúng tôi tiếp tục bồi đắp và khát vọng sáng tạo nên chuẩn mực mới của nền ẩm thực thượng lưu xứ Hoa.
          </p>
        </div>
      </div>

      {/* Frame border lines - Gallery bottom decoration */}
      <div className="absolute left-8 bottom-12 right-8 h-[1px] bg-luxury-ivory/5 pointer-events-none hidden md:block" />

      <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
