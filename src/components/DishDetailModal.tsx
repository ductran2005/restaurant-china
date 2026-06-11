"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, X } from "lucide-react";
import type { FeaturedDish } from "../data";

interface DishDetailModalProps {
  dish: FeaturedDish | null;
  onClose: () => void;
}

export default function DishDetailModal({ dish, onClose }: DishDetailModalProps) {
  useEffect(() => {
    if (!dish) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dish, onClose]);

  if (!dish) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-luxury-black/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-detail-title"
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-5xl overflow-hidden border border-luxury-gold/30 bg-[#0c0c0c] shadow-[0_0_100px_rgba(139,0,0,0.25)] md:grid-cols-[1.1fr_0.9fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng chi tiết món ăn"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-luxury-gold/30 bg-luxury-black/80 text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative min-h-[280px] md:min-h-[620px]">
          <img loading="lazy" decoding="async" src={dish.imageUrl} alt={dish.vietnameseName} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0c0c0c]" />
          <span className="absolute bottom-5 left-5 border border-luxury-red/50 bg-luxury-black/70 px-3 py-2 font-display text-xl tracking-widest text-luxury-red backdrop-blur-sm">
            {dish.chineseName}
          </span>
        </div>

        <div className="flex flex-col justify-center px-6 py-10 md:px-12 md:py-14">
          <span className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-luxury-gold">
            Chi tiết mỹ vị
          </span>
          <h3 id="dish-detail-title" className="font-display text-3xl uppercase leading-tight text-luxury-ivory md:text-5xl">
            {dish.vietnameseName}
          </h3>
          <span className="mt-2 font-serif text-lg italic text-luxury-gold/70">{dish.name}</span>
          <p className="mt-7 border-t border-luxury-gold/15 pt-7 font-sans text-sm font-light leading-7 text-luxury-ivory/75">
            {dish.description}
          </p>

          <div className="mt-8 space-y-4">
            {dish.details.map((detail) => (
              <div key={detail} className="flex items-center gap-3 text-luxury-ivory/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-luxury-gold/30 text-luxury-gold">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="font-sans text-xs tracking-wide">{detail}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-10 flex h-12 w-full items-center justify-center gap-3 bg-luxury-gold font-display text-[10px] font-bold uppercase tracking-[0.25em] text-luxury-black transition-colors hover:bg-gold-hover"
          >
            Trở lại thực đơn
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
