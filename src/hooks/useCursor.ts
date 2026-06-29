import { useCursorContext } from "../context/CursorContext";

export const useCursor = () => {
  const { cursorType, hoverText, setCursorType, setHoverText } = useCursorContext();

  const triggerHover = (text: string = "") => {
    setCursorType("hover");
    setHoverText(text);
  };

  const triggerText = (text: string) => {
    setCursorType("text");
    setHoverText(text);
  };

  const resetCursor = () => {
    setCursorType("default");
    setHoverText("");
  };

  const hideCursor = () => {
    setCursorType("hidden");
  };

  return {
    cursorType,
    hoverText,
    setCursorType,
    setHoverText,
    triggerHover,
    triggerText,
    resetCursor,
    hideCursor
  };
};
export default useCursor;
