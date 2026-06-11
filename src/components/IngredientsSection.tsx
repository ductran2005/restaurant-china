"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { INGREDIENTS } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function IngredientsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
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

  // Pin the section and switch ingredients as the user scrolls through it.
  // Desktop only — on mobile the stacked layout is taller than the viewport,
  // so pinning would cut off the heading and detail panel.
  useEffect(() => {
    const section = containerRef.current;
    if (!section || INGREDIENTS.length === 0) return;

    const STEP = 360; // scroll px per ingredient

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + INGREDIENTS.length * STEP,
        pin: true,
        anticipatePin: 1,
        snap: {
          // Snap to the CENTER of each item's scroll segment so a click
          // (which targets the center) never gets bumped to a neighbor
          snapTo: INGREDIENTS.map((_, i) => (i + 0.5) / INGREDIENTS.length),
          duration: { min: 0.2, max: 0.5 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const index = Math.min(
            INGREDIENTS.length - 1,
            Math.floor(self.progress * INGREDIENTS.length),
          );
          setActiveId(INGREDIENTS[index].id);
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // Mobile has no pinned scroll, so auto-rotate through the ingredients
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    let intervalId: number | undefined;

    const update = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
      if (mq.matches) {
        intervalId = window.setInterval(() => {
          setActiveId((prev) => {
            const i = INGREDIENTS.findIndex((item) => item.id === prev);
            return INGREDIENTS[(i + 1) % INGREDIENTS.length].id;
          });
        }, 4000);
      }
    };

    update();
    mq.addEventListener("change", update);

    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      mq.removeEventListener("change", update);
    };
  }, []);

  // Animate the image swap: gold-edged wipe reveal + slow zoom settle
  useLayoutEffect(() => {
    const wrap = imageWrapRef.current;
    if (!wrap) return;

    const img = wrap.querySelector("img");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      wrap,
      { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 0.35 },
      { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 0.7 },
    );
    if (img) {
      tl.fromTo(
        img,
        { scale: 1.14, x: 36 },
        { scale: 1, x: 0, duration: 1, clearProps: "transform" },
        0,
      );
    }

    return () => {
      tl.kill();
    };
  }, [activeId]);

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
            {activeIngredient?.imageUrl && (
              <div
                data-herb-reveal
                className="relative mb-6 h-72 overflow-hidden border border-luxury-gold/25 bg-[#0d0d0b] md:h-80 xl:h-96"
              >
                <div ref={imageWrapRef} className="absolute inset-0">
                  <img
                    key={activeIngredient.id}
                    loading="lazy"
                    decoding="async"
                    src={activeIngredient.imageUrl}
                    alt={`Nguyên liệu ${activeIngredient.name}`}
                    className="h-full w-full object-contain"
                  />
                </div>
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

            <div
              data-herb-reveal
              className="mt-2 flex items-center justify-between border-b border-luxury-gold/15 pb-3"
            >
              <div className="flex items-center gap-2 text-luxury-gold/55">
                <Sparkles className="h-3 w-3" />
                <span className="font-sans text-[8px] uppercase tracking-[0.28em]">
                  Cuộn để giải mã từng tầng hương
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
