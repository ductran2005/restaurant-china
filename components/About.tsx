import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="ve-mon-an" className="paper-pattern relative pt-7 sm:pt-16">
      <div className="shell grid min-h-[490px] items-center gap-7 py-8 sm:gap-8 sm:py-12 lg:grid-cols-[.78fr_1.22fr]">
        <Reveal className="relative z-10 text-center lg:text-left">
          <span className="inline-block rounded-full bg-[#981b18] px-5 py-2 text-xs font-semibold text-white">Tinh hoa ẩm thực</span>
          <h2 className="display-font mt-4 text-4xl font-extrabold leading-tight text-[#7d1917] sm:text-5xl">VỊT QUAY<br />BẮC KINH</h2>
          <p className="mt-5 max-w-md text-sm leading-7">Món ăn trứ danh của Trung Hoa, nổi tiếng với lớp da giòn mỏng như thủy tinh, thịt mềm ngọt, hương vị đậm đà khó quên. Vịt Quay Bắc Kinh không chỉ là một món ăn, mà còn là nghệ thuật ẩm thực tinh tế.</p>
          <a href="#quy-trinh" className="gold-button mt-6">KHÁM PHÁ NGAY <span>›</span></a>
        </Reveal>
        <Reveal className="group relative self-stretch lg:-my-6">
          <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-2xl border-4 border-double border-[#d2a15e] shadow-2xl sm:min-h-[380px]">
            <Image
              src="/images/160f3424-df85-4a88-a4ba-3f082eac23a5.png"
              alt="Đầu bếp chế biến vịt quay Bắc Kinh"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="image-breathe object-cover object-center"
            />
            {/* Soft dark overlay for premium texture */}
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
          </div>

          {/* Hanging traditional wooden plaque */}
          <div className="absolute -left-6 top-12 z-20 hidden flex-col items-center lg:flex">
            {/* Hanging rope */}
            <div className="h-12 w-0.5 bg-[#d2a15e]" />
            {/* Hanging ring */}
            <div className="-mt-1 size-3 rounded-full border border-[#d2a15e] bg-[#250402]" />
            {/* Plaque */}
            <div className="relative -mt-1 flex w-12 flex-col items-center rounded-lg border-2 border-double border-[#d2a15e] bg-gradient-to-b from-[#8c1c19] to-[#4a0a08] py-4 shadow-xl">
              <span className="display-font flex flex-col items-center gap-1 text-center text-[10px] font-extrabold leading-none tracking-widest text-[#ffe39f]">
                <span>传</span>
                <span>统</span>
                <span>美</span>
                <span>味</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
