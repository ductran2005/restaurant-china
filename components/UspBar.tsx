import { Reveal } from "@/components/Reveal";

const items = [
  ["♛", "HƯƠNG VỊ", "CHUẨN TRUYỀN THỐNG", "Công thức chuẩn Bắc Kinh hơn 700 năm lịch sử."],
  ["❀", "NGUYÊN LIỆU", "TUYỂN CHỌN", "Vịt tuyển chọn, trọng lượng chuẩn, da mỏng, thịt ngọt."],
  ["♨", "QUY TRÌNH", "CÔNG PHU", "Tẩm ướp bí truyền – Quay lò than hoa – Da giòn rụm."],
  ["●", "PHỤC VỤ", "CHUYÊN NGHIỆP", "Đầu bếp chuyên nghiệp thái tại bàn, chuẩn vị."],
];

export function UspBar() {
  return (
    <section className="paper-pattern relative z-20 mx-auto my-5 w-[min(1100px,calc(100%-24px))] rounded-2xl border-4 border-double border-[#d2a15e] px-2 py-3 shadow-2xl sm:my-8 sm:px-4 sm:py-6">
      <Reveal className="stagger-children grid grid-cols-2 gap-0 lg:grid-cols-4">
        {items.map(([icon, top, bottom, copy], index) => (
          <article key={top} className={`hover-lift px-2 py-4 text-center sm:px-5 ${index % 2 ? "border-l border-[#b8854f]/25" : ""} ${index > 1 ? "border-t border-[#b8854f]/25 lg:border-t-0" : ""} ${index ? "lg:border-l" : ""}`}>
            <span className="float-soft mx-auto grid size-10 place-items-center rounded-full bg-[#9d1d1c] text-base text-[#ffe2a0] sm:size-12 sm:text-xl">{icon}</span>
            <h2 className="display-font mt-2 text-[11px] font-extrabold leading-tight text-[#821c19] sm:mt-3 sm:text-sm">{top}<br />{bottom}</h2>
            <p className="mt-2 text-[10px] leading-relaxed sm:mt-3 sm:text-xs">{copy}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
