"use client";
import { useContactModal } from "../context/ContactModalContext";
import { ReactNode } from "react";
import { trackEvent } from "../lib/gtm";

interface Props {
  children: ReactNode;
  className?: string;
  subject?: string;
  ctaLocation: string;
}

export default function OpenModalButton({
  children,
  className,
  subject,
  ctaLocation,
}: Props) {
  const { openModal } = useContactModal();
  return (
    <button
      onClick={() => {
        openModal(subject);
        trackEvent("cta_click", {
          location: ctaLocation,
        });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
