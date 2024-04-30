import { useAnimate } from "framer-motion";
import { atom, useAtom } from "jotai";
import { useTheme } from "styled-components";

export const SidebarShowAtom = atom(true);

export default function useAnimateSidebar() {
  const [showSidebar, setShowSidebar] = useAtom(SidebarShowAtom);

  const theme = useTheme();
  const [containerRef, animate] = useAnimate();

  const handleShowSidebar = async () => {
    setShowSidebar(!showSidebar);

    !showSidebar &&
      (await animate("button", {
        right: 0,
        border: "none",
        borderRadius: "none",
      }));

    await animate(
      containerRef.current,
      { left: showSidebar ? 5 : -280 },
      { duration: 0.1 }
    );

    await animate(
      containerRef.current,
      { left: showSidebar ? -280 : 0 },
      { duration: 0.3, delay: 0.1 }
    );

    showSidebar &&
      (await animate("button", {
        right: -48,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: `0 ${theme.size.l}px ${theme.size.l}px 0`,
      }));
  };

  return {
    handleShowSidebar,
    containerRef,
  };
}
