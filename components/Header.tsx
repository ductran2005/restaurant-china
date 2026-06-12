"use client";

import { useState } from "react";
import { OrderButton } from "@/components/OrderButton";

const links = [
  ["TRANG CHỦ", "#trang-chu"],
  ["VỀ MÓN ĂN", "#ve-mon-an"],
  ["QUY TRÌNH", "#quy-trinh"],
  ["THỰC ĐƠN", "#thuc-don"],
  ["ĐẶT HÀNG", "#dat-hang"],
  ["LIÊN HỆ", "#lien-he"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header-enter absolute inset-x-0 top-0 z-50 border-y border-white/10 bg-[#120b08]/95 text-[#f4e9d5] shadow-[0_8px_30px_rgba(0,0,0,.25)] backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-[calc(100%_-_28px)] items-center justify-between gap-4 sm:h-[74px] sm:w-[min(100%_-_64px,1244px)]">
        <a
          href="#trang-chu"
          className="header-logo min-w-0 shrink text-[#f7ead4] transition hover:text-white"
        >
          <strong className="display-font block text-base leading-none tracking-[.14em] text-[#e8b750] sm:text-lg sm:tracking-[.16em]">北京烤鸭</strong>
          <small className="mt-1 block truncate text-[8px] font-semibold tracking-[.1em] text-[#f7ead4] sm:text-[9px] sm:tracking-[.12em]">Vịt Quay Bắc Kinh</small>
        </a>

        <OrderButton
          className="header-cta hidden min-h-9 items-center justify-center rounded-full bg-[#ff4b24] px-6 text-[10px] font-extrabold tracking-[.18em] text-[#150806] transition hover:-translate-y-0.5 hover:bg-[#ff6848] hover:shadow-[0_8px_24px_rgba(255,75,36,.32)] lg:inline-flex"
        >
          ĐẶT NGAY
        </OrderButton>

        <button
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="absolute right-3.5 top-3.5 z-20 grid size-10 shrink-0 place-items-center rounded-full border border-white/25 bg-black/20 text-[#f4e9d5] lg:hidden"
        >
          <span className="sr-only">{open ? "Đóng menu" : "Mở menu"}</span>
          <span className="grid gap-1.5">
            <span className={`block h-px w-4 bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-4 bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
        <nav className="header-nav pointer-events-auto flex items-center gap-5 xl:gap-7">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap py-7 text-[9px] font-bold tracking-[.18em] text-[#aaa39e] transition hover:text-[#f4e9d5]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {open && (
        <nav className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-white/10 bg-[#120b08]/98 px-4 pb-6 pt-2 lg:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 py-4 text-[10px] font-bold tracking-[.3em] text-[#b7afa8]"
            >
              {label}
            </a>
          ))}
          <OrderButton
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex min-h-10 items-center rounded-full bg-[#ff4b24] px-7 text-[10px] font-extrabold tracking-[.18em] text-[#150806]"
          >
          ĐẶT NGAY
          </OrderButton>
        </nav>
      )}
    </header>
  );
}
