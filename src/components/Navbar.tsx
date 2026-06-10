"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  onScrollToSection?: (id: string, e?: React.MouseEvent) => void;
}

export default function Navbar({ onOpenBooking, onScrollToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileScroll = (id: string, e: React.MouseEvent) => {
    setIsMenuOpen(false);
    onScrollToSection?.(id, e);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-5 md:px-16 md:py-8 grid grid-cols-[auto_1fr_auto] items-center bg-gradient-to-b from-luxury-black/90 to-transparent backdrop-blur-[2px]">
        {/* Imperial Logo Crest */}
        <a
          href="#hero"
          onClick={(e) => handleMobileScroll("hero", e)}
          className="flex items-center gap-2 sm:gap-3 group"
        >
          <div className="relative w-8 h-8 bg-luxury-red flex items-center justify-center text-[10px] text-luxury-gold font-bold border border-luxury-gold/40 group-hover:border-luxury-gold transition-colors duration-500 shadow-md flex-shrink-0">
            金
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-luxury-ivory tracking-[0.2em] text-xs xs:text-sm leading-none uppercase transition-colors duration-500 group-hover:text-luxury-gold">
              TIÊN TỬU • XIANG YANG
            </span>
            <span className="text-[7px] xs:text-[8px] font-sans font-normal tracking-[0.4em] text-luxury-gold/85 mt-1">
              TRIỀU ĐÌNH MỸ VỊ
            </span>
          </div>
        </a>

        {/* Floating Menu Links — centered */}
        <div className="hidden lg:flex items-center justify-center gap-8 text-[11px] font-sans font-medium tracking-[0.3em] text-luxury-ivory/60">
          <a
            href="#story"
            onClick={(e) => onScrollToSection?.("story", e)}
            className="hover:text-luxury-gold transition-colors duration-300 relative py-1 group"
          >
            DI SẢN
            <span className="absolute bottom-0 left-0 h-[1px] bg-luxury-gold w-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>
          <a
            href="#signature"
            onClick={(e) => onScrollToSection?.("signature", e)}
            className="hover:text-luxury-gold transition-colors duration-300 relative py-1 group"
          >
            VỊT KHÁNH HOÀNG
            <span className="absolute bottom-0 left-0 h-[1px] bg-luxury-gold w-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>
          <a
            href="#gallery"
            onClick={(e) => onScrollToSection?.("gallery", e)}
            className="hover:text-luxury-gold transition-colors duration-300 relative py-1 group"
          >
            MỸ VỊ KÝ
            <span className="absolute bottom-0 left-0 h-[1px] bg-luxury-gold w-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>
          <a
            href="#chef"
            onClick={(e) => onScrollToSection?.("chef", e)}
            className="hover:text-luxury-gold transition-colors duration-300 relative py-1 group"
          >
            QUỐC SƯ ĐẰNG
            <span className="absolute bottom-0 left-0 h-[1px] bg-luxury-gold w-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>
          <a
            href="#ingredients"
            onClick={(e) => onScrollToSection?.("ingredients", e)}
            className="hover:text-luxury-gold transition-colors duration-300 relative py-1 group"
          >
            THẢO DƯỢC KÝ
            <span className="absolute bottom-0 left-0 h-[1px] bg-luxury-gold w-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </div>
        {/* On mobile: empty center column */}
        <div className="lg:hidden" />

        <div className="flex items-center justify-end gap-3 sm:gap-4">
          {/* Booking Button (responsive sizes) */}
          <button
            onClick={onOpenBooking}
            className="relative px-4 py-2 md:px-8 md:py-3 overflow-hidden group border border-luxury-gold/40 hover:border-luxury-gold transition-colors duration-500 rounded-none bg-transparent"
          >
            {/* Shimmer background animation */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-luxury-red via-red-900 to-luxury-red -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-0" />
            <span className="relative z-10 font-display font-medium text-[9px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] text-luxury-gold group-hover:text-luxury-ivory transition-colors duration-500 whitespace-nowrap">
              ĐẶT BÀN
            </span>
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-luxury-gold/20 hover:border-luxury-gold/60 text-luxury-ivory hover:text-luxury-gold transition-colors bg-luxury-black/30 backdrop-blur-sm"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-lg flex flex-col justify-center items-center gap-8 transition-all duration-500 lg:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 font-display text-8xl text-luxury-gold/[0.03] select-none pointer-events-none uppercase">
          宮廷
        </div>
        
        <div className="flex flex-col items-center gap-5 text-center font-sans font-medium tracking-[0.25em] text-luxury-ivory/80">
          <a
            href="#story"
            onClick={(e) => handleMobileScroll("story", e)}
            className="hover:text-luxury-gold transition-colors duration-300 text-base py-1.5 uppercase block"
          >
            DI SẢN
          </a>
          <a
            href="#signature"
            onClick={(e) => handleMobileScroll("signature", e)}
            className="hover:text-luxury-gold transition-colors duration-300 text-base py-1.5 uppercase block"
          >
            VỊT KHÁNH HOÀNG
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleMobileScroll("gallery", e)}
            className="hover:text-luxury-gold transition-colors duration-300 text-base py-1.5 uppercase block"
          >
            MỸ VỊ KÝ
          </a>
          <a
            href="#chef"
            onClick={(e) => handleMobileScroll("chef", e)}
            className="hover:text-luxury-gold transition-colors duration-300 text-base py-1.5 uppercase block"
          >
            QUỐC SƯ ĐẰNG
          </a>
          <a
            href="#ingredients"
            onClick={(e) => handleMobileScroll("ingredients", e)}
            className="hover:text-luxury-gold transition-colors duration-300 text-base py-1.5 uppercase block"
          >
            THẢO DƯỢC KÝ
          </a>
        </div>

        <div className="w-20 h-[1px] bg-luxury-gold/20 my-2" />

        <button
          onClick={() => {
            setIsMenuOpen(false);
            onOpenBooking();
          }}
          className="px-8 py-3 bg-luxury-gold text-luxury-black font-display font-medium text-[10px] tracking-[0.25em] hover:bg-gold-hover transition-colors rounded-none"
        >
          YẾN TIỆC CHIÊU ĐÃI
        </button>
      </div>
    </>
  );
}
