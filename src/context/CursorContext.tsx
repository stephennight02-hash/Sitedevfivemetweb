import React, { createContext, useContext, useState, ReactNode } from "react";

type CursorVariant = "default" | "hovered";

interface CursorContextProps {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursorVariant = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursorVariant must be used within a CursorProvider");
  }
  return context;
};
