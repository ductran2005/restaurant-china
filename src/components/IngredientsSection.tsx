"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INGREDIENTS, Ingredient } from "../data";
import { Sparkles, Info } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function IngredientsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll parallax for each ingredient card of different speeds
      INGREDIENTS.forEach((ing, index) => {
        const el = elementsRef.current[index];
        if (!el) return;

        // Base scroll parallax effect
        gsap.fromTo(
          el,
          { y: index % 2 === 0 ? 60 : -40 },
          {
            y: index % 2 === 0 ? -120 : 80,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2 * ing.speed,
            }
          }
        );

        // Gentle floating animation
        gsap.to(el.querySelector(".floating-core"), {
          y: "random(-12, 12)",
          x: "random(-8, 8)",
          rotation: "random(-6, 6)",
          duration: "random(4, 7)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ingredients"
      ref={containerRef}
      className="relative min-h-screen bg-luxury-black py-32 overflow-hidden flex flex-col justify-between"
    >
      {/* Top Banner decoration */}
      <div className="absolute right-8 top-16 w-0.5 h-20 bg-gradient-to-b from-luxury-gold/50 to-transparent pointer-none" />

      {/* Main text Header */}
      <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 z-20 mb-16 select-none">
        <span className="text-luxury-gold text-xs font-display tracking-[0.4em] uppercase mb-2 block">
          THẢO DƯỢC KÝ —
        </span>
        <h3 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-luxury-ivory uppercase tracking-wide max-w-xl">
          NĂM HOÀNG KIM <br />
          <span className="text-luxury-gold">HƯƠNG THẢO</span> QUÝ BÁU
        </h3>
        <p className="font-sans text-xs md:text-sm text-luxury-ivory/60 max-w-md mt-6 leading-relaxed font-light">
          Di sản hương vị đỉnh cao được thẩm thẩm từ sự gieo trồng khắt khe và phối trộn tỷ lệ mật pháp tuyệt mật lưu truyền.
        </p>
      </div>

      {/* Floating Canvas area */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 h-[60vh] min-h-[500px]">
        {/* Helper center info banner if no ingredients clicked */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center max-w-xs z-10 p-6 border border-luxury-gold/5 bg-luxury-black/80 backdrop-blur-sm pointer-events-none">
          <Info className="w-5 h-5 text-luxury-gold/50 mb-3 animate-pulse" />
          <span className="font-display text-[10px] tracking-[0.25em] text-luxury-gold uppercase block">THẢO KÝ HOÀNG CƠ</span>
          <span className="text-[10px] text-luxury-ivory/40 tracking-wider mt-1 block">Chạm vào từng thảo dược để giải mã mật tông hương vị</span>
        </div>

        {INGREDIENTS.map((ing, idx) => {
          // Fallback illustration or icon simulation using css and chinese script
          return (
            <div
              key={ing.id}
              ref={(el) => {
                elementsRef.current[idx] = el;
              }}
              style={{
                left: ing.x,
                top: ing.y,
              }}
              className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 active:scale-95 group"
              onClick={() => setActiveIngredient(activeIngredient?.id === ing.id ? null : ing)}
            >
              <div className="floating-core relative flex flex-col items-center">
                {/* Chinese Character background glowing */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-display text-[6.5rem] md:text-[8rem] text-luxury-gold/[0.02] group-hover:text-luxury-gold/[0.04] transition-all duration-700 leading-none select-none">
                    {ing.character}
                  </span>
                </div>

                {/* Circular Golden Ingredient Capsule */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#161616] border border-luxury-gold/25 group-hover:border-luxury-gold rounded-full flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-500 hover:scale-110">
                  <div className="absolute inset-1 border border-luxury-gold/10 rounded-full scale-95" />
                  
                  {/* Styled inner illustration representing ingredients */}
                  <span className="font-display text-sm md:text-base text-luxury-gold font-bold z-10 group-hover:scale-115 transition-transform duration-500">
                    {ing.character}
                  </span>

                  {/* Red stamp corner overlay */}
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-luxury-red rounded-full" />
                </div>

                {/* Floating label tag */}
                <div className="mt-3 bg-luxury-black/90 px-3 py-1 border border-luxury-gold/10 backdrop-blur-sm shadow-md flex flex-col items-center">
                  <span className="text-[10px] font-display text-luxury-ivory tracking-widest font-semibold">
                    {ing.name}
                  </span>
                  <span className="text-[7px] text-luxury-gold/60 font-sans tracking-widest uppercase mt-0.5">
                    {ing.englishName}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Modal Info Card overlay when clicking on ingredient */}
        {activeIngredient && (
          <div className="absolute left-4 right-4 md:left-1/2 bottom-4 md:bottom-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-w-md z-30 bg-[#0F0F0F] border border-luxury-gold/30 hover:border-luxury-gold/60 p-6 md:p-8 shadow-2xl transition-all duration-500 text-left select-none">
            <button
              onClick={() => setActiveIngredient(null)}
              className="absolute top-4 right-4 text-luxury-gold/50 hover:text-luxury-gold text-lg transition-colors font-sans pointer-events-auto cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-4 text-luxury-gold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-luxury-red" />
              <span className="font-sans font-bold tracking-widest uppercase">MẬT KÝ THẢO DƯỢC</span>
            </div>
            
            <h4 className="font-display font-medium text-2xl text-luxury-ivory tracking-wide flex items-baseline gap-2 mb-1">
              {activeIngredient.name}
              <span className="text-sm font-sans font-normal text-luxury-gold/65 italic">
                ({activeIngredient.englishName})
              </span>
            </h4>
            <span className="font-display text-xs text-luxury-red tracking-[0.25em] uppercase mb-4 block">
              Gia truyền thảo ký: {activeIngredient.character}
            </span>

            <p className="font-sans text-xs md:text-sm text-luxury-ivory/80 leading-relaxed tracking-wide font-light border-t border-luxury-gold/15 pt-4">
              {activeIngredient.description}
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveIngredient(null)}
                className="font-display text-[9px] text-luxury-gold tracking-[0.3em] uppercase hover:text-luxury-ivory duration-300"
              >
                ĐÃ LĨNH HỘI ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spacing Decoration lines */}
      <div className="absolute bottom-8 left-8 right-8 h-[1px] bg-luxury-ivory/5 pointer-events-none hidden md:block" />
    </section>
  );
}
