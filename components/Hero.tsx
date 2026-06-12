import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { OrderButton } from "@/components/OrderButton";

const virtues = [
  ["◒", "Da giòn", "thơm ngon"],
  ["♨", "Quay chuẩn vị", "truyền thống"],
  ["✦", "Nguyên liệu tuyển chọn", "chất lượng cao"],
];

export function Hero() {
  return (
    <section id="trang-chu" className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_72%_45%,#76230f_0%,#260604_42%,#100101_100%)] pt-[68px] text-white sm:pt-[74px]">
      {/* Decorative repeating line background pattern */}
      <div className="hero-grid-drift absolute inset-0 z-10 opacity-20 [background-image:repeating-linear-gradient(90deg,transparent_0_79px,rgba(232,183,80,.12)_80px)] pointer-events-none" />

      {/* Hero Background Image - Spans the entire section from left to right, top to bottom */}
      <Reveal className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/8dc8aa5e-0a72-46dc-ab2d-0f556bed0215.png"
          alt="Vịt Quay Bắc Kinh"
          fill
          priority
          sizes="100vw"
          className="hero-kenburns object-cover object-[63%_center] sm:object-[center_12%]"
        />
        {/* Left-to-right gradient to slightly darken the text area for contrast, while keeping details visible */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,1,1,.15)_0%,rgba(16,1,1,.58)_48%,rgba(16,1,1,.96)_100%)] sm:inset-y-0 sm:left-0 sm:w-full sm:bg-gradient-to-r sm:from-[#100101]/75 sm:via-[#100101]/40 sm:to-transparent lg:w-[60%]" />

        {/* Bottom fade (to blend into the USP bar / section below) */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#100101]/95 to-transparent" />

        {/* Top fade (under the header, to keep header links readable) */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      </Reveal>

      {/* Grid container for text content */}
      <div className="shell relative z-20 grid min-h-[calc(100svh-68px)] items-end gap-4 sm:min-h-[calc(100svh-74px)] sm:items-center lg:grid-cols-[1fr_1fr]">
        <Reveal className="relative z-10 pb-7 pt-8 sm:pb-12">
          <p className="display-font text-xl font-semibold tracking-[.12em] text-[#f1c96c] sm:text-3xl">VỊT QUAY</p>
          <h1 className="display-font mt-1 text-[clamp(3.25rem,16vw,4.2rem)] font-extrabold italic leading-[.92] text-[#efbf5f] drop-shadow-[0_4px_0_#6f160d] sm:text-7xl lg:text-8xl">
            BẮC KINH
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/90 sm:mt-7 sm:text-lg">
            Tinh hoa ẩm thực Trung Hoa
            <br />
            Món ngon trứ danh – Hương vị khó quên
          </p>
          <div className="hero-virtues mt-5 grid max-w-xl grid-cols-[repeat(3,minmax(0,1fr))] gap-1 sm:mt-7 sm:gap-4">
            {virtues.map(([icon, title, line]) => (
              <div key={title} className="hover-lift min-w-0 rounded-xl px-0.5 py-2 text-center sm:px-2">
                <span className="pulse-ring mx-auto grid size-10 place-items-center rounded-full border border-[#e8b750] text-base text-[#e8b750] sm:size-12 sm:text-xl">
                  {icon}
                </span>
                <p className="mt-2 text-[9px] leading-snug text-white/75 sm:text-xs sm:leading-relaxed">
                  <strong className="block break-words text-[9px] font-semibold text-white min-[360px]:text-[10px] sm:text-xs">{title}</strong>
                  <span className="hidden min-[360px]:inline">{line}</span>
                </p>
              </div>
            ))}
          </div>
          <OrderButton className="gold-button mt-5 min-h-12 w-full sm:mt-8 sm:w-auto">
            ĐẶT NGAY <span>›</span>
          </OrderButton>
        </Reveal>

        {/* Empty column on desktop because the absolute image occupies the right side */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
