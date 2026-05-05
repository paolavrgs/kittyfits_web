'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface ContactModalContextType {
  isOpen: boolean;
  initialSubject: string;
  openModal: (subject?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSubject, setInitialSubject] = useState("Entrenamiento personalizado");

  const openModal = (subject?: string) => {
    setInitialSubject(subject || "Entrenamiento personalizado");
    setIsOpen(true);
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, initialSubject, openModal, closeModal: () => setIsOpen(false) }}>
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) throw new Error("useContactModal must be used within a ContactModalProvider");
  return context;
};
