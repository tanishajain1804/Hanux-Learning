import React, { createContext, useState, useContext } from "react";

export type CursorType = "default" | "hover" | "click" | "text" | "hidden";

export interface CursorContextType {
  cursorType: CursorType;
  hoverText: string;
  setCursorType: (type: CursorType) => void;
  setHoverText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorTypeState] = useState<CursorType>("default");
  const [hoverText, setHoverTextState] = useState<string>("");

  const setCursorType = (type: CursorType) => {
    setCursorTypeState(type);
  };

  const setHoverText = (text: string) => {
    setHoverTextState(text);
  };

  return (
    <CursorContext.Provider value={{ cursorType, hoverText, setCursorType, setHoverText }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursorContext = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }
  return context;
};
