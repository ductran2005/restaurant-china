import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { OrderButton } from "@/components/OrderButton";

const assurances = [
  {
    title: "GIAO HÀNG",
    detail: "NHANH CHÓNG",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M4 13h23v22H15m12-15h8l8 9v6h-4M8 22H1m9-6H4m7 19a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm24 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
      </svg>
    ),
  },
  {
    title: "ĐÓNG GÓI",
    detail: "CHUẨN NHÀ HÀNG",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="m7 14 17-8 17 8-17 8-17-8Zm0 0v21l17 8 17-8V14M24 22v21m-9-25 17-8m-8 21 6-3" />
      </svg>
    ),
  },
  {
    title: "GIỮ NÓNG",
    detail: "TRỌN VỊ",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7 34h34M11 34c1 6 5 9 13 9s12-3 13-9M8 30h32c-1-9-6-14-16-14S9 21 8 30Zm16-14v-4m-4 0h8M17 10c-4-4 3-5-1-9m10 9c-4-4 3-5-1-9m10 9c-4-4 3-5-1-9" />
      </svg>
    ),
  },
];

export function CtaFooter() {
  return (
    <footer
      id="dat-hang"
      className="relative isolate h-[680px] overflow-hidden bg-[#240101] text-white md:h-[clamp(245px,28.2vw,440px)]"
    >
      <Image
        src="/images/2b07f2d2-ba2e-4cfc-8546-3cc4fafcbc25.png"
        alt=""
        fill
        sizes="100vw"
        className="footer-bg-drift object-cover object-[63%_center] opacity-65 md:object-center md:opacity-100"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,0,0,.92)_0%,rgba(35,0,0,.68)_38%,rgba(35,0,0,.08)_68%,transparent_100%)] md:bg-[linear-gradient(90deg,rgba(25,0,0,.5)_0%,rgba(25,0,0,.14)_34%,transparent_57%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#210000]/75 to-transparent" />

      <div className="relative z-10 h-full px-[max(20px,6.2vw)]">
        <Reveal className="flex h-full max-w-[390px] flex-col justify-start pb-40 pt-12 md:justify-center md:max-w-[34vw] md:pb-8 md:pt-4">
          <h2 className="display-font text-[clamp(1.45rem,2.05vw,2rem)] font-bold leading-[1.35] tracking-[.035em] text-[#efc66c] drop-shadow-[0_2px_5px_rgba(0,0,0,.7)]">
            ĐẶT VỊT QUAY BẮC KINH
            <br />
            CHO BỮA TIỆC HOÀN HẢO
          </h2>

          <ul className="mt-5 space-y-2 text-[11px] font-medium leading-relaxed text-[#ffe9bc]/90 md:mt-[clamp(.6rem,1.5vw,1.35rem)] md:space-y-[clamp(.2rem,.55vw,.55rem)] md:text-[clamp(7px,.72vw,11px)]">
            <li className="flex gap-2"><span className="text-[#e7b94c]">✓</span> Thích hợp cho tiệc gia đình, liên hoan, sự kiện</li>
            <li className="flex gap-2"><span className="text-[#e7b94c]">✓</span> Đặt trước nhanh chóng - Giao hàng tận nơi</li>
            <li className="flex gap-2"><span className="text-[#e7b94c]">✓</span> Cam kết chất lượng - Đúng vị truyền thống</li>
          </ul>

          <div className="mt-6 grid gap-3 min-[360px]:grid-cols-2 md:mt-[clamp(.75rem,1.6vw,1.5rem)]">
            <OrderButton
              className="display-font inline-flex min-h-11 items-center justify-center gap-5 border border-[#d14c2d] bg-[linear-gradient(135deg,#ae271d,#72100c)] px-4 text-xs font-bold text-[#ffe0a0] shadow-lg transition hover:brightness-125 md:min-h-[clamp(30px,3.5vw,48px)] md:px-[clamp(.8rem,2vw,1.8rem)] md:text-[clamp(7px,.75vw,11px)]"
            >
              ĐẶT NGAY <span className="text-lg font-normal">›</span>
            </OrderButton>
            <a
              href="tel:0988888888"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#c38a31]/80 bg-black/15 px-4 text-xs font-bold tracking-[.08em] text-[#ffe2a0] transition hover:bg-[#8b1b12]/50 md:min-h-[clamp(30px,3.5vw,48px)] md:px-[clamp(.7rem,1.6vw,1.4rem)] md:text-[clamp(7px,.75vw,11px)]"
            >
              <span className="text-[#e9b745]">☎</span> 0988 888 888
            </a>
          </div>
        </Reveal>

        <Reveal
          id="lien-he"
          className="absolute inset-x-[max(14px,4vw)] bottom-5 grid grid-cols-3 gap-1 border-t border-[#d19c3d]/25 pt-4 text-[#e8b64e] md:left-[48.5%] md:right-auto md:w-[36%] md:gap-3 md:border-0 md:pt-0"
        >
          {assurances.map((item) => (
            <div key={item.title} className="footer-assurance flex items-center justify-center gap-2 md:justify-start">
              <span className="block size-7 shrink-0 [&_svg]:h-full [&_svg]:w-full [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.5]">
                {item.icon}
              </span>
              <span className="text-[7px] font-bold leading-[1.45] tracking-[.08em] sm:text-[8px] lg:text-[9px]">
                <strong className="block">{item.title}</strong>
                <small className="whitespace-nowrap text-[inherit] font-medium text-[#f1c974]/75">{item.detail}</small>
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </footer>
  );
}
