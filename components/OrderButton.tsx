"use client";

import type { ReactNode } from "react";

export function OrderButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        window.dispatchEvent(new Event("open-order-dialog"));
      }}
    >
      {children}
    </button>
  );
}
