'use client'
import { useContactModal } from "../context/ContactModalContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  subject?: string;
}

export default function OpenModalButton({ children, className, subject }: Props) {
  const { openModal } = useContactModal();
  return (
    <button onClick={() => openModal(subject)} className={className}>
      {children}
    </button>
  );
}
