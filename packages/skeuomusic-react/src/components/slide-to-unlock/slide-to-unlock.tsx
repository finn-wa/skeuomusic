import { useRef } from "react";
import styles from "./slide-to-unlock.module.css";
import thumb from "./thumb.svg";
import type { PointerEvent } from "react";

/** iOS 6 lock-screen-style slide to unlock component */
export default function SlideToUnlock({ onUnlock }: { onUnlock: () => void }) {
  const thumbRef = useRef<HTMLImageElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bounds = useRef({ left: 0, right: 100 });

  /**
   * Calculates the thumb translate property to simulate dragging.
   * Note bounds must be set before calling this function.
   */
  function getTranslate(event: PointerEvent<HTMLImageElement>): number {
    const boundedX = Math.max(Math.min(event.clientX, bounds.current.right), bounds.current.left);
    return boundedX - bounds.current.left;
  }

  function onPointerDown(event: PointerEvent<HTMLImageElement>): void {
    // |---|                    trackLeft
    // |-----------|            thumbLeft
    // |--------------|         event.clientX
    //             |--|         thumbOffset
    //     [=======(thumb)===]

    const trackRect = trackRef.current!.getBoundingClientRect();
    const thumbRect = thumbRef.current!.getBoundingClientRect();
    const thumbOffset = event.clientX - thumbRect.left;
    bounds.current = {
      left: trackRect.left + thumbOffset,
      right: trackRect.right - (thumbRect.width - thumbOffset),
    };
    const transformX = getTranslate(event);
    thumbRef.current!.style.translate = `${transformX}px`;
    thumbRef.current!.style.transition = "none";
    // keep drag alive outside element
    thumbRef.current!.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLImageElement>): void {
    if (event.buttons === 0) {
      return;
    }
    const transformX = getTranslate(event);
    thumbRef.current!.style.translate = `${transformX}px`;
  }

  function onPointerUp(): void {
    const currentTranslate = parseFloat(thumbRef.current!.style.translate || "0");
    const maxTranslate = bounds.current.right - bounds.current.left;
    if (Math.ceil(currentTranslate) >= maxTranslate) {
      onUnlock();
      return;
    }
    // Return thumb to start with transition proportional to how far it has to travel
    const transitionTime = Math.round((200 * currentTranslate) / maxTranslate);
    thumbRef.current!.style.transition = `translate ${transitionTime}ms ease-in`;
    thumbRef.current!.style.translate = "0";
  }

  return (
    <div className={styles.slider}>
      <div className={styles.wh100}>
        <div ref={trackRef} className={`${styles.track} ${styles.wh100}`} />
        <div className={styles.bounds} draggable={false}>
          <img
            ref={thumbRef}
            className={styles.thumb}
            src={thumb}
            draggable={false}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
        </div>
      </div>
    </div>
  );
}
