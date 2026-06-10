"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "../src/components/Navbar";
import HeroSection from "../src/components/HeroSection";
import StorytellingSection from "../src/components/StorytellingSection";
import SignatureSection from "../src/components/SignatureSection";
import HorizontalGallery from "../src/components/HorizontalGallery";
import MasterChefSection from "../src/components/MasterChefSection";
import IngredientsSection from "../src/components/IngredientsSection";
import FinalCTA from "../src/components/FinalCTA";
import BookingModal from "../src/components/BookingModal";
import SoundAndAmbient from "../src/components/SoundAndAmbient";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  const handleScrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, {
          offset: 0,
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main className="relative bg-luxury-black font-sans text-luxury-ivory selection:bg-luxury-red selection:text-luxury-ivory min-h-screen">
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onScrollToSection={handleScrollToSection}
      />
      <SoundAndAmbient />

      <HeroSection
        onScrollToStory={() => handleScrollToSection("story")}
        onOpenBooking={() => setIsBookingOpen(true)}
      />
      <StorytellingSection />
      <SignatureSection />
      <HorizontalGallery />
      <MasterChefSection />
      <IngredientsSection />
      <FinalCTA onOpenBooking={() => setIsBookingOpen(true)} />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
