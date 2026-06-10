"use client";

import React, { useState } from "react";
import { X, Sparkles, Check, Flame, Star, Calendar } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    guests: "2",
    date: "",
    chamber: "imperial-suite",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.date) {
      alert("Vui lòng điền đầy đủ các thông tin bí chế.");
      return;
    }
    // Generate a royal ticket ID
    const randomId = "XY-" + Math.floor(Math.random() * 90000 + 10000);
    setTicketId(randomId);
    setIsSubmitted(true);
  };

  const chamberLabels: Record<string, string> = {
    "imperial-suite": "Long Phượng Các (Phòng Suite Hoàng Gia)",
    "peach-garden": "Thanh Phong Các (Thượng Uyển Đào cảnh)",
    "carving-center": "Bắc Kinh Truyền Kỳ (Trực tiếp Carving Master cát lát)",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center p-4">
      {/* Dark elegant backdrop */}
      <div
        className="absolute inset-0 bg-luxury-black/95 backdrop-blur-md cursor-pointer transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-lg md:max-w-2xl bg-[#0C0C0C] border border-luxury-gold/30 p-8 md:p-12 z-50 flex flex-col items-center shadow-[0_0_100px_rgba(139,0,0,0.2)] md:my-8 rounded-none">
        {/* Frame lines */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-luxury-gold/5 pointer-events-none select-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-luxury-gold/60 hover:text-luxury-gold transition-colors duration-300 w-8 h-8 flex items-center justify-center border border-luxury-gold/10"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="w-full relative z-10 flex flex-col gap-6 select-none">
            {/* Header */}
            <div className="text-center flex flex-col items-center mb-4">
              <div className="flex items-center justify-center gap-1.5 text-luxury-gold mb-3 scale-90">
                <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                <span className="font-display text-[9px] tracking-[0.4em] uppercase">ĐẠI ĐỈNH YẾN HOÀNG CUNG</span>
                <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-luxury-ivory tracking-wider uppercase">
                XƯỚNG TIỆC KHOA BAN
              </h3>
              <p className="font-sans text-[10px] md:text-xs text-luxury-gold/60 tracking-widest uppercase mt-2">
                NHẬN DIỆN THƯỢNG KHÁCH ĐẶT TRƯỚC SẢN YẾN
              </p>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-[10px] tracking-widest text-luxury-gold uppercase">
                  Tôn Danh (Họ Tên) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Triều đại quốc khách"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-luxury-black border border-luxury-gold/15 text-luxury-ivory font-sans text-xs px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors h-12 rounded-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display text-[10px] tracking-widest text-luxury-gold uppercase">
                  Mật Mã Liên Hệ (Số Điện Thoại) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="09xx xxx xxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-luxury-black border border-luxury-gold/15 text-luxury-ivory font-sans text-xs px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors h-12 rounded-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display text-[10px] tracking-widest text-luxury-gold uppercase">
                  Đại Diễn Sâm Hội (Số Người Dự Yến)
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="bg-luxury-black border border-luxury-gold/15 text-luxury-ivory font-sans text-xs px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors h-12 rounded-none cursor-pointer"
                >
                  <option value="1">Độc yến thượng khách (1 Khách)</option>
                  <option value="2">Đối yến tương giao (2 Khách)</option>
                  <option value="4">Quốc hữu tứ bang (3 - 4 Khách)</option>
                  <option value="8">Hoàng các đại đình (5 - 8 Khách)</option>
                  <option value="12">Vạn tuế hoàng triều (Trên 8 Khách)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display text-[10px] tracking-widest text-luxury-gold uppercase">
                  Thời Gian Lâm Tiệc *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-luxury-black border border-luxury-gold/15 text-luxury-ivory font-sans text-xs px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors h-12 rounded-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-display text-[10px] tracking-widest text-luxury-gold uppercase">
                Nguyện Vọng Gian Các (Lựa Chọn Không Gian)
              </label>
              <select
                value={formData.chamber}
                onChange={(e) => setFormData({ ...formData, chamber: e.target.value })}
                className="bg-luxury-black border border-luxury-gold/15 text-luxury-ivory font-sans text-xs px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors h-12 rounded-none cursor-pointer"
              >
                <option value="imperial-suite">Long Phượng Các (Phòng VIP Suite riêng tư)</option>
                <option value="peach-garden">Thanh Phong Các (Vườn cảnh thơ mộng)</option>
                <option value="carving-center">Bắc Kinh Truyền Kỳ (Nơi nghệ nhân biểu diễn thái lát)</option>
              </select>
            </div>

            {/* Note decoration warning */}
            <p className="text-[10px] font-sans text-luxury-ivory/50 leading-relaxed italic text-center mt-2 border-t border-luxury-gold/5 pt-4">
              * Ưu tiên đặc biệt: Quý khách xướng tiệc trước 24h luôn được bảo lưu những chú vịt mang tỷ lệ thịt mỡ hoàn mỹ nhất và trực tiếp Quốc Sư điều phối quá trình giòn hóa.
            </p>

            <button
              type="submit"
              className="bg-luxury-red hover:bg-[#a60000] text-luxury-ivory font-display font-bold text-xs tracking-[0.25em] h-14 w-full transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] border border-luxury-gold/30 mt-4 rounded-none"
            >
              TIẾN DÂNG HOÀNG ĐỀN
            </button>
          </form>
        ) : (
          /* High-Luxury Success Pass Layout */
          <div className="w-full relative z-10 flex flex-col items-center text-center select-none animate-fadeIn py-6">
            <div className="w-16 h-16 rounded-full border border-luxury-gold/50 flex items-center justify-center bg-luxury-red/10 mb-6 text-luxury-gold animate-bounce">
              <Check className="w-8 h-8" />
            </div>

            <span className="font-display text-xs text-luxury-gold tracking-[0.4em] uppercase mb-1">
              TIỆC CHƯƠNG ĐÃ SỐNG HOÀNG TRIỀU
            </span>
            <h4 className="font-display text-3xl text-luxury-ivory uppercase tracking-widest">
              XƯỚNG TIỆC THÀNH CÔNG
            </h4>

            {/* The Ticket Pass layout */}
            <div className="w-full max-w-md bg-[#131313] border-2 border-dashed border-luxury-gold/30 p-8 my-8 relative flex flex-col text-left">
              {/* Corner stamps */}
              <div className="absolute top-2 right-2 text-[10px] bg-luxury-red text-luxury-ivory px-2 py-1 font-display tracking-widest uppercase">
                {ticketId}
              </div>

              <div className="flex items-center gap-1.5 text-luxury-gold text-[9px] mb-6 font-display tracking-[0.25em]">
                <Flame className="w-3.5 h-3.5" /> XIANG YANG SPECIAL ROYAL PASS <Flame className="w-3.5 h-3.5" />
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-b border-luxury-gold/10 pb-6 mb-6">
                <div>
                  <span className="text-[9px] font-sans text-luxury-ivory/40 tracking-wider uppercase block">HOÀNG KHÁC CHIỀU BIỆT</span>
                  <span className="text-sm font-display text-luxury-ivory font-medium tracking-wide block">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-[9px] font-sans text-luxury-ivory/40 tracking-wider uppercase block">ĐIỆN THOẠI BẢO MẬT</span>
                  <span className="text-xs font-sans text-luxury-gold font-semibold tracking-wide block">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-[9px] font-sans text-luxury-ivory/40 tracking-wider uppercase block">LÂM TIỆC THỜI GIAN</span>
                  <span className="text-xs font-sans text-luxury-ivory tracking-wide block">{formData.date}</span>
                </div>
                <div>
                  <span className="text-[9px] font-sans text-luxury-ivory/40 tracking-wider uppercase block">TỔNG SỐ KHÁN DỰ</span>
                  <span className="text-xs font-sans text-luxury-ivory tracking-wide block">{formData.guests} Thượng khách</span>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-sans text-luxury-ivory/40 tracking-wider uppercase block mb-1">GIAN CÁC BẢO LƯU</span>
                <span className="text-xs font-display text-luxury-gold tracking-wide block">
                  {chamberLabels[formData.chamber] || formData.chamber}
                </span>
              </div>

              {/* Decorative design cuts at left and right edges */}
              <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-luxury-black border border-luxury-gold/30 pointer-events-none" />
              <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-luxury-black border border-luxury-gold/30 pointer-events-none" />
            </div>

            <p className="font-sans text-xs text-luxury-ivory/70 leading-relaxed max-w-sm mb-6 font-light">
              Tuyệt bút tiệc đã được chuyển giao trực tiếp tới tay quản sự. Ban lễ tân sẽ gọi điện bảo hộ thông qua điện thoại trong vòng 10 phút tới.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 bg-transparent border border-luxury-gold hover:bg-luxury-gold hover:text-luxury-black text-luxury-gold transition-all duration-300 font-display text-[10px] tracking-widest uppercase rounded-none"
            >
              ĐÓNG CỬA CUNG ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
