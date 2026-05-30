import { useRef } from "react";
import styles from "./slide-to-unlock.module.css";
import thumbSvg from "./thumb.svg";
import type { PointerEvent } from "react";
import unlockSound from "./unlock.webm";

export interface SlideToUnlockProps {
  text?: string;
  onUnlock: () => void;
}

/** iOS 6 lock-screen-style slide to unlock component */
export default function SlideToUnlock({ onUnlock, text = "slide to unlock" }: SlideToUnlockProps) {
  const thumbRef = useRef<HTMLImageElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bounds = useRef({ left: 0, right: 100 });

  function unlock() {
    new Audio(unlockSound).play().catch((error) => {
      console.error("Failed to play unlock audio", error);
    });
    onUnlock();
  }

  /** Returns slide progress as a decimal between 0 and 1 */
  function getProgress(): number {
    const currentTranslate = parseFloat(thumbRef.current!.style.translate || "0");
    const maxTranslate = bounds.current.right - bounds.current.left;
    return currentTranslate / maxTranslate;
  }

  function onPointerDown(event: PointerEvent<HTMLImageElement>): void {
    // Remove text shine while dragging
    textRef.current!.classList = `${styles.text} ${styles.static}`;

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
    thumbRef.current!.style.transition = "none";
    // keep drag alive outside element
    thumbRef.current!.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLImageElement>): void {
    if (event.buttons === 0) {
      return;
    }
    const boundedX = Math.max(Math.min(event.clientX, bounds.current.right), bounds.current.left);
    const transformX = boundedX - bounds.current.left;
    thumbRef.current!.style.translate = `${transformX}px`;
    textRef.current!.style.opacity = String(Math.max(0, 0.75 - getProgress()));
  }

  function onPointerUp(): void {
    const progress = getProgress();
    if (Math.ceil(progress * 100) >= 100) {
      unlock();
      return;
    }
    // Resume showing the text animation
    textRef.current!.classList = `${styles.text} ${styles.animated}`;
    textRef.current!.style.opacity = "1";
    // Return thumb to start with transition proportional to how far it has to travel
    const transitionTime = Math.round(progress * 200);
    thumbRef.current!.style.transition = `translate ${transitionTime}ms ease-in`;
    thumbRef.current!.style.translate = "0";
  }

  return (
    <div className={styles.slider}>
      <div className={styles.wh100}>
        <div ref={trackRef} className={`${styles.track} ${styles.wh100}`}>
          <span ref={textRef} className={`${styles.text} ${styles.animated}`}>
            {text}
          </span>
        </div>
        <div className={styles.bounds} draggable={false}>
          <img
            ref={thumbRef}
            className={styles.thumb}
            src={thumbSvg}
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
