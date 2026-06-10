/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StorytellingSection from "./components/StorytellingSection";
import SignatureSection from "./components/SignatureSection";
import HorizontalGallery from "./components/HorizontalGallery";
import MasterChefSection from "./components/MasterChefSection";
import IngredientsSection from "./components/IngredientsSection";
import FinalCTA from "./components/FinalCTA";
import BookingModal from "./components/BookingModal";
import SoundAndAmbient from "./components/SoundAndAmbient";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ultra-smooth premium easing
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

    // Sync GSAP ticker
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
    if (e) {
      e.preventDefault();
    }
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
      {/* HUD components */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onScrollToSection={handleScrollToSection}
      />
      <SoundAndAmbient />

      {/* Main Sections (Each as a gorgeous cinematic scene) */}
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

      {/* Modals & Screens */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
