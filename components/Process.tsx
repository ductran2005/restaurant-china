import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/Reveal";
import selectionImage from "@/public/images/process/01-tuyen-chon.png";
import seasoningImage from "@/public/images/process/02-tam-uop.png";
import roastingImage from "@/public/images/process/03-quay-lo.png";
import slicingImage from "@/public/images/process/04-thai-tai-ban.png";
import servingImage from "@/public/images/process/05-thuong-thuc.png";

type ProcessStep = {
  title: string;
  copy: string;
  image: StaticImageData;
};

const steps: ProcessStep[] = [
  {
    title: "TUYỂN CHỌN KỸ LƯỠNG",
    copy: "Chọn vịt Bắc Kinh chất lượng cao, trọng lượng chuẩn.",
    image: selectionImage,
  },
  {
    title: "TẨM ƯỚP BÍ TRUYỀN",
    copy: "Ướp gia vị đặc biệt, thấm đều để dậy hương vị.",
    image: seasoningImage,
  },
  {
    title: "QUAY LÒ THAN HOA",
    copy: "Quay ở nhiệt độ chuẩn, da giòn đều, màu vàng óng đẹp mắt.",
    image: roastingImage,
  },
  {
    title: "THÁI TẠI BÀN",
    copy: "Đầu bếp thái lát mỏng, đẹp mắt, giữ trọn hương vị.",
    image: slicingImage,
  },
  {
    title: "THƯỞNG THỨC",
    copy: "Cuốn cùng bánh mỏng, sốt đặc biệt và rau thơm.",
    image: servingImage,
  },
];

export function Process() {
  return (
    <section
      id="quy-trinh"
      className="paper-pattern border-y border-[#c28b54]/40 py-9 sm:py-16"
    >
      <div className="shell">
        <Reveal>
          <div className="flex items-center justify-center gap-3 text-[#9b1d19]">
            <span className="hidden h-px w-12 bg-[#b54d34]/50 sm:block" />
            <span aria-hidden="true" className="text-sm">❧</span>
            <h2 className="display-font text-center text-xl font-extrabold sm:text-3xl">
              QUY TRÌNH CHUẨN VỊ TRUYỀN THỐNG
            </h2>
            <span aria-hidden="true" className="text-sm">❧</span>
            <span className="hidden h-px w-12 bg-[#b54d34]/50 sm:block" />
          </div>
        </Reveal>

        <Reveal className="stagger-children mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-5">
          {steps.map((step, index) => (
            <article key={step.title} className="group hover-lift relative mx-auto w-full max-w-[360px] rounded-xl px-1 pb-3 text-center">
              <div className="relative">
                <span className="absolute -left-2 -top-3 z-10 grid size-8 place-items-center rounded-full border-2 border-[#ffe4b4] bg-[#9b1d19] text-[11px] font-extrabold text-[#ffe1a0] shadow-md">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative aspect-[1.45] overflow-hidden rounded-[8px] border border-[#c78c53] bg-[#4d1009] shadow-[0_5px_14px_rgba(91,33,14,0.22)]">
                  <Image
                    src={step.image}
                    alt={`${step.title.toLocaleLowerCase("vi-VN")} vịt quay Bắc Kinh`}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 28px), (max-width: 1024px) 45vw, 220px"
                    className="image-breathe object-cover"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(54,8,3,0.22))]" />
                </div>

                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-7 top-1/2 hidden -translate-y-1/2 text-2xl font-bold text-[#b32a20] lg:block"
                  >
                    →
                  </span>
                )}
              </div>

              <h3 className="display-font mt-4 text-[13px] font-extrabold text-[#87221e]">
                {step.title}
              </h3>
              <p className="mx-auto mt-1.5 max-w-[220px] text-[11px] leading-[1.55] text-[#4d2a20]">
                {step.copy}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
