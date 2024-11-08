import useUserInterfaceState from "@/stores/ui-store";
import { MutableRefObject, useCallback, useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function Keyboard({
  children,
  slides,
}: {
  children: React.ReactNode;
  slides: Array<MutableRefObject<HTMLElement | null>>;
}) {
  const [
    overlay,
    sidebar,
    setOverlay,
    setSidebar,
    slideMode,
    bottomPanel,
    setBottomPanel,
  ] = useUserInterfaceState(
    useShallow((state) => [
      state.overlay,
      state.sidebar,
      state.setOverlay,
      state.setSidebar,
      state.slideMode,
      state.bottomPanel,
      state.setBottomPanel,
    ])
  );

  const handleToggleSidebar = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey === true && event.key === "s") {
        setOverlay(!overlay);
        setSidebar(!sidebar);
      }
    },
    [sidebar]
  );

  const handleToggleBottomPanel = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey === true && event.key === "a") {
        setBottomPanel(!bottomPanel);
      }
    },
    [bottomPanel]
  );

  const handleSlideNavigate = useCallback(
    (event: KeyboardEvent) => {
      if (!slideMode || !event.shiftKey) {
        return;
      }

      const slidesInViewIndexes: Array<number> = [];
      const scrollOptions: ScrollIntoViewOptions = { behavior: "smooth" };

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        slides.forEach((slide, index) => {
          if (slide.current) {
            const rect = slide.current.getBoundingClientRect();
            if (isInViewport(rect, index)) {
              slidesInViewIndexes.push(index);
            }
          }
        });
      }

      if (slidesInViewIndexes.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        if (slidesInViewIndexes.length === 1) {
          let nextSlideIndex = slidesInViewIndexes[0] + 1;
          if (nextSlideIndex >= slides.length) {
            slides[slidesInViewIndexes[0]].current?.scrollIntoView({
              ...scrollOptions,
              block: "end",
            });
          } else if (slides[nextSlideIndex]) {
            slides[nextSlideIndex].current?.scrollIntoView(scrollOptions);
          } else {
            slides[slidesInViewIndexes[0]].current?.scrollIntoView(
              scrollOptions
            );
          }
        } else {
          slides[
            slidesInViewIndexes[slidesInViewIndexes.length - 1]
          ].current?.scrollIntoView(scrollOptions);
        }
      }

      if (event.key === "ArrowUp") {
        if (slidesInViewIndexes.length === 1) {
          let nextSlideIndex = slidesInViewIndexes[0] - 1;
          if (slides[nextSlideIndex]) {
            slides[nextSlideIndex].current?.scrollIntoView(scrollOptions);
          } else {
            slides[slidesInViewIndexes[0]].current?.scrollIntoView(
              scrollOptions
            );
          }
        } else {
          slides[slidesInViewIndexes[0]].current?.scrollIntoView(scrollOptions);
        }
      }
    },
    [slideMode]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleToggleSidebar);
    document.addEventListener("keydown", handleSlideNavigate);
    document.addEventListener("keydown", handleToggleBottomPanel);
    return () => {
      document.removeEventListener("keydown", handleToggleSidebar);
      document.removeEventListener("keydown", handleSlideNavigate);
      document.removeEventListener("keydown", handleToggleBottomPanel);
    };
  }, [handleToggleSidebar, handleSlideNavigate, handleToggleBottomPanel]);

  return <>{children}</>;
}

function isInViewport(rect: DOMRect | undefined, index?: number) {
  if (!rect) {
    return false;
  }

  const viewPort = {
    top: Math.round(document.documentElement.scrollTop),
    bottom: Math.round(document.documentElement.scrollTop + window.innerHeight),
    height: Math.round(window.innerHeight),
  };

  const element = {
    top: Math.round(rect.top + document.documentElement.scrollTop),
    bottom: Math.round(rect.bottom + document.documentElement.scrollTop),
    height: Math.round(rect.bottom - rect.top),
  };

  if (element.height <= viewPort.height) {
    if (element.top === viewPort.top) {
      return true;
    } else if (element.top > viewPort.top && element.top < viewPort.bottom) {
      return true;
    } else if (
      element.bottom < viewPort.bottom &&
      element.bottom > viewPort.top
    ) {
      return true;
    }
  } else {
    if (element.top === viewPort.top || element.bottom === viewPort.bottom) {
      return true;
    } else if (element.top < viewPort.top && element.bottom > viewPort.bottom) {
      return true;
    } else if (element.top > viewPort.top && element.top < viewPort.bottom) {
      return true;
    } else if (
      element.bottom < viewPort.bottom &&
      element.bottom > viewPort.top
    ) {
      return true;
    }
  }

  return false;
}
