"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export function OrderDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [suggestedTime, setSuggestedTime] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const date = new Date(Date.now() + 90 * 60 * 1000);
    date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15, 0, 0);
    setSuggestedTime(
      new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
        .toISOString()
        .slice(0, 16),
    );

    const openDialog = () => {
      setSubmitted(false);
      dialog.showModal();
      document.body.style.overflow = "hidden";
    };
    const unlockPage = () => {
      document.body.style.overflow = "";
    };

    window.addEventListener("open-order-dialog", openDialog);
    dialog.addEventListener("close", unlockPage);
    return () => {
      window.removeEventListener("open-order-dialog", openDialog);
      dialog.removeEventListener("close", unlockPage);
      unlockPage();
    };
  }, []);

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const fieldClass =
    "mt-2 block min-h-12 w-full rounded-xl border border-[#c99a70]/45 bg-white/75 px-4 py-3 text-sm font-medium text-[#351611] outline-none transition placeholder:text-[#8b6a5d]/50 focus:border-[#9b251d] focus:bg-white focus:shadow-[0_0_0_3px_rgba(155,37,29,.1)]";
  const labelClass =
    "block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#762019]";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="order-dialog-title"
      className="order-dialog relative m-auto max-h-[calc(100svh-16px)] w-[min(680px,calc(100%-16px))] overflow-y-auto rounded-[16px] border border-[#d49a43]/60 bg-[#fff7e8] p-0 text-[#351611] shadow-[0_30px_90px_rgba(30,0,0,.55)] backdrop:bg-[#100000]/80 backdrop:backdrop-blur-sm sm:max-h-[calc(100svh-28px)] sm:w-[min(680px,calc(100%-28px))] sm:rounded-[20px]"
      onClick={(event) => event.target === event.currentTarget && closeDialog()}
    >
      <div className="relative overflow-hidden border-b border-[#b67638]/25 bg-[linear-gradient(135deg,#74150d,#270201)] px-5 py-5 text-[#ffe2a0] sm:px-8 sm:py-6">
        <span className="absolute -right-12 -top-20 size-48 rounded-full border border-[#e8b750]/15" />
        <span className="absolute -right-4 -top-10 size-28 rounded-full border border-[#e8b750]/15" />
        <button
          type="button"
          aria-label="Đóng hộp thoại"
          onClick={closeDialog}
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/20 text-xl text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
        <p className="relative text-[10px] font-bold tracking-[.28em] text-[#e8b750]">BẮC KINH HOUSE</p>
        <h2 id="order-dialog-title" className="display-font relative mt-2 text-2xl font-extrabold sm:text-3xl">
          ĐẶT VỊT QUAY
        </h2>
        <p className="relative mt-1 text-xs text-white/65">Thông tin món đã được tự điền sẵn, bạn chỉ cần bổ sung địa chỉ nhận.</p>
      </div>

      {submitted ? (
        <div className="px-6 py-10 text-center sm:px-8">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#941d18] text-2xl text-[#ffe2a0]">✓</span>
          <h3 className="display-font mt-4 text-2xl font-extrabold text-[#7d1917]">ĐÃ TIẾP NHẬN ĐƠN</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#654136]">
            Nhà hàng sẽ gọi lại xác nhận trong ít phút. Hotline: <strong>0988 888 888</strong>
          </p>
          <button type="button" onClick={closeDialog} className="gold-button mt-6">
            HOÀN TẤT
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-4 px-4 py-5 sm:grid-cols-2 sm:gap-y-5 sm:px-8 sm:py-7">
          <label className={`sm:col-span-2 ${labelClass}`}>
            Món đặt
            <span className="mt-2 flex min-h-14 items-center justify-between gap-4 rounded-xl border border-[#d6a760]/45 bg-[#fff0d1] px-4 py-3 normal-case tracking-normal">
              <span>
                <strong className="display-font block text-base text-[#7d1917]">Vịt quay Bắc Kinh nguyên con</strong>
                <small className="mt-0.5 block font-medium text-[#795648]">Chặt miếng · Đóng gói giữ nóng</small>
              </span>
              <span className="shrink-0 rounded-full bg-[#921d18] px-3 py-1.5 text-[10px] text-[#ffe1a0]">ĐÃ CHỌN</span>
            </span>
            <input name="dish" value="Vịt quay Bắc Kinh nguyên con" readOnly hidden />
          </label>
          <label className={labelClass}>
            Số lượng
            <select name="quantity" defaultValue="1" className={fieldClass}>
              <option value="1">1 con</option>
              <option value="2">2 con</option>
              <option value="3">3 con</option>
              <option value="4">4 con</option>
            </select>
          </label>
          <label className={labelClass}>
            Thời gian nhận
            <input className={fieldClass} name="time" type="datetime-local" value={suggestedTime} onChange={(event) => setSuggestedTime(event.target.value)} required />
          </label>
          <label className={labelClass}>
            Họ và tên
            <input className={fieldClass} name="name" autoComplete="name" placeholder="Nguyễn Văn An" required />
          </label>
          <label className={labelClass}>
            Số điện thoại
            <input className={fieldClass} name="phone" type="tel" autoComplete="tel" placeholder="0988 888 888" required />
          </label>
          <label className={`sm:col-span-2 ${labelClass}`}>
            Địa chỉ giao hàng
            <input className={fieldClass} name="address" autoComplete="street-address" placeholder="Số nhà, đường, phường/xã, quận/huyện" required />
          </label>
          <label className={`sm:col-span-2 ${labelClass}`}>
            Ghi chú
            <textarea className={`${fieldClass} resize-none`} name="note" rows={2} defaultValue="Chặt miếng, đóng gói giữ nóng và giao tận nơi." />
          </label>
          <div className="mt-1 grid gap-3 sm:col-span-2 sm:grid-cols-[auto_1fr]">
            <button type="button" onClick={closeDialog} className="min-h-12 rounded-xl border border-[#8d5e3d]/30 px-6 text-xs font-bold text-[#684238] transition hover:bg-[#ead4b5]/35">
              ĐỂ SAU
            </button>
            <button type="submit" className="gold-button min-h-12 w-full rounded-xl">
              XÁC NHẬN ĐẶT MÓN
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
