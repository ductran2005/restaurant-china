"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Leaf, Sparkles } from "lucide-react";
import { INGREDIENTS } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function IngredientsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(INGREDIENTS[0]?.id ?? "");
  const activeIngredient =
    INGREDIENTS.find((ingredient) => ingredient.id === activeId) ?? INGREDIENTS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-herb-reveal]",
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
          immediateRender: false,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    }, containerRef);

    const revealFallback = window.setTimeout(() => {
      gsap.set("[data-herb-reveal]", {
        autoAlpha: 1,
        y: 0,
        clearProps: "opacity,visibility,transform",
      });
    }, 1800);

    return () => {
      window.clearTimeout(revealFallback);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!activeIngredient) return;

    const activeCard = containerRef.current?.querySelector(
      `[data-ingredient-id="${activeIngredient.id}"]`,
    );

    if (activeCard) {
      gsap.fromTo(
        activeCard,
        { scale: 0.985 },
        { scale: 1, duration: 0.35, ease: "power2.out", clearProps: "transform" },
      );
    }
  }, [activeIngredient]);

  return (
    <section
      id="ingredients"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#090908] px-5 py-20 md:px-10 lg:px-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-luxury-gold/[0.035] blur-[120px]" />
        <div className="absolute -right-36 -top-24 h-[28rem] w-[28rem] rounded-full bg-luxury-red/[0.06] blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/25 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mb-10 flex items-center gap-4 lg:mb-8" data-herb-reveal>
          <span className="font-display text-[10px] uppercase tracking-[0.45em] text-luxury-gold">
            Thảo dược ký
          </span>
          <span className="h-px w-16 bg-luxury-gold/40" />
          <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-luxury-ivory/35">
            Chương VI · Ngũ vị
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div data-herb-reveal className="relative">
              <span className="pointer-events-none absolute -left-3 -top-16 font-display text-[9rem] leading-none text-luxury-gold/[0.035] md:text-[12rem]">
                香
              </span>
              <h3 className="relative max-w-xl font-display text-5xl font-medium uppercase leading-[0.9] tracking-[-0.035em] text-luxury-ivory md:text-7xl lg:text-[4.6rem] xl:text-[5rem]">
                Năm hương
                <span className="mt-2 block italic text-luxury-gold">kể một chuyện</span>
              </h3>
            </div>

            <p
              data-herb-reveal
              className="mt-5 max-w-md border-l border-luxury-gold/35 pl-5 font-sans text-xs font-light leading-6 text-luxury-ivory/55 xl:text-sm"
            >
              Không chỉ tạo nên hương vị, mỗi thảo mộc còn giữ một vai trò trong
              nghi thức thưởng thức vịt quay Bắc Kinh.
            </p>

            {activeIngredient && (
              <div
                key={activeIngredient.id}
                className="mt-6 animate-fadeIn border-t border-luxury-gold/20 pt-5"
                aria-live="polite"
              >
                {activeIngredient.imageUrl && (
                  <div className="group/image relative mb-4 h-40 max-w-lg overflow-hidden border border-luxury-gold/25 bg-[#0d0d0b] xl:h-44">
                    <img
                      src={activeIngredient.imageUrl}
                      alt={`Nguyên liệu ${activeIngredient.name}`}
                      className="h-full w-full object-contain transition-transform duration-1000 group-hover/image:scale-[1.02]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090908]/80 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-3 border border-luxury-gold/15" />
                    <span className="absolute bottom-4 left-4 font-sans text-[8px] uppercase tracking-[0.3em] text-luxury-gold/80">
                      Nguyên liệu tuyển chọn
                    </span>
                    <span className="absolute bottom-3 right-4 font-display text-3xl text-luxury-gold/80">
                      {activeIngredient.character}
                    </span>
                  </div>
                )}

                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <span className="mb-2 block font-sans text-[9px] uppercase tracking-[0.35em] text-luxury-gold/65">
                      Đang khám phá
                    </span>
                    <h4 className="font-display text-2xl text-luxury-ivory md:text-3xl">
                      {activeIngredient.name}
                    </h4>
                    <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.25em] text-luxury-gold">
                      {activeIngredient.englishName}
                    </span>
                  </div>
                  <span className="font-display text-4xl text-luxury-gold/80">
                    {activeIngredient.character}
                  </span>
                </div>
                <p className="max-w-lg font-sans text-xs font-light leading-5 text-luxury-ivory/60 xl:leading-6">
                  {activeIngredient.description}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-[2.1rem] top-0 w-px bg-gradient-to-b from-luxury-gold/40 via-luxury-gold/10 to-transparent md:left-[3.1rem]" />

            <div className="space-y-2">
              {INGREDIENTS.map((ingredient, index) => {
                const isActive = ingredient.id === activeIngredient?.id;

                return (
                  <button
                    key={ingredient.id}
                    type="button"
                    data-herb-reveal
                    data-ingredient-id={ingredient.id}
                    onClick={() => setActiveId(ingredient.id)}
                    className={`group relative grid w-full grid-cols-[4.25rem_1fr_auto] items-center gap-4 overflow-hidden border px-3 py-4 text-left opacity-100 transition-all duration-500 md:grid-cols-[5rem_1fr_auto] md:gap-5 md:px-4 lg:py-4 xl:py-5 ${
                      isActive
                        ? "border-luxury-gold/60 bg-gradient-to-r from-luxury-gold/[0.13] via-luxury-gold/[0.06] to-transparent shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
                        : "border-luxury-ivory/[0.1] bg-luxury-ivory/[0.025] hover:border-luxury-gold/35 hover:bg-luxury-gold/[0.05]"
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Khám phá ${ingredient.name}`}
                  >
                    <span
                      className={`absolute inset-y-0 left-0 w-0.5 bg-luxury-gold transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-[#0d0d0b] font-display text-xs transition-all duration-500 md:h-14 md:w-14 md:text-sm ${
                        isActive
                          ? "scale-105 border-luxury-gold text-luxury-gold shadow-[0_0_35px_rgba(212,175,55,0.12)]"
                          : "border-luxury-gold/20 text-luxury-gold/65 group-hover:border-luxury-gold/55 group-hover:text-luxury-gold"
                      }`}
                    >
                      {ingredient.character}
                      {isActive && (
                        <span className="absolute -right-1 bottom-0 h-2 w-2 rounded-full bg-luxury-red" />
                      )}
                    </div>

                    <div>
                      <span className="mb-2 flex items-center gap-2 font-sans text-[8px] uppercase tracking-[0.28em] text-luxury-gold/45">
                        <Leaf className="h-3 w-3" />
                        Hương vị {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`block font-display text-xl transition-colors duration-300 md:text-3xl ${
                          isActive
                            ? "text-luxury-ivory"
                            : "text-luxury-ivory/65 group-hover:text-luxury-ivory"
                        }`}
                      >
                        {ingredient.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="hidden font-sans text-[8px] uppercase tracking-[0.22em] text-luxury-ivory/30 sm:block">
                        {ingredient.englishName}
                      </span>
                      <ArrowUpRight
                        className={`h-4 w-4 transition-all duration-300 ${
                          isActive
                            ? "rotate-45 text-luxury-gold"
                            : "text-luxury-ivory/20 group-hover:text-luxury-gold"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              data-herb-reveal
              className="mt-4 flex items-center justify-between border-b border-luxury-gold/15 pb-3"
            >
              <div className="flex items-center gap-2 text-luxury-gold/55">
                <Sparkles className="h-3 w-3" />
                <span className="font-sans text-[8px] uppercase tracking-[0.28em]">
                  Chạm để giải mã từng tầng hương
                </span>
              </div>
              <span className="font-display text-xs text-luxury-ivory/25">五香</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
