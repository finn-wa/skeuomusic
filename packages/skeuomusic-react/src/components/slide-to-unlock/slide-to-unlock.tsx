import { useRef } from "react";
import styles from "./slide-to-unlock.module.css";
import thumbSvg from "./thumb.svg";
import type { PointerEvent } from "react";
import unlockSound from "./unlock.webm";

export type SlideToUnlockProps = {
  text?: string;
  onUnlock: () => void;
};

/** IOS 6 lock-screen-style slide to unlock component */
export default function SlideToUnlock({
  onUnlock,
  text = "slide to unlock",
}: SlideToUnlockProps) {
  // The arrow image that the user drags along the track
  const thumbRef = useRef<HTMLImageElement>(null);
  // The slider track that contains the arrow
  const trackRef = useRef<HTMLDivElement>(null);
  // The text on the track
  const textRef = useRef<HTMLButtonElement>(null);
  // The limits of the thumb's X position on the page so that it stays within the track
  const boundsRef = useRef<{ left: number; right: number }>(null);
  // The horizontal difference in pixels between the left of the thumb and the place where the pointer pressed
  const pointerOffset = useRef(0);

  /** Plays an unlock sound and calls the onUnlock callback prop. */
  function unlock() {
    new Audio(unlockSound).play().catch((error) => {
      console.error("Failed to play unlock audio", error);
    });
    onUnlock();
  }

  /** Triggers an unlock, sliding the thumb to the end of the track. */
  function animatedUnlock() {
    setTextAnimation("static");
    setTextOpacity(0, true);
    const progress = getProgress();
    // Move thumb to end with transition proportional to how far it has to travel
    // Unlock once the transition completes
    thumbRef.current!.addEventListener("transitionend", unlock, { once: true });
    const transitionTime = Math.round((1 - progress) * 150);
    setThumbPosition(getBounds().right, `${transitionTime}ms ease-in`);
  }

  /** Returns slide progress as a decimal between 0 and 1 */
  function getProgress(): number {
    const currentTranslate = parseFloat(thumbRef.current!.style.translate || "0");
    const bounds = getBounds();
    const maxTranslate = bounds.right - bounds.left;
    return currentTranslate / maxTranslate;
  }

  /** Computes bounds if they are uninitialized, then returns the current value. */
  function getBounds(): { left: number; right: number } {
    if (boundsRef.current === null) {
      computeBounds();
    }
    return boundsRef.current!;
  }

  /**
   * Computes the bounds for the thumb's X position in the page. Updates boundsRef with
   * the result.
   */
  function computeBounds() {
    const trackRect = trackRef.current!.getBoundingClientRect();
    const thumbRect = thumbRef.current!.getBoundingClientRect();
    boundsRef.current = {
      left: trackRect.left,
      right: trackRect.right - thumbRect.width,
    };
  }

  /**
   * Updates the thumb's position along the slider.
   *
   * @param position The x position on the page in pixels
   * @param transition A transition specifier for translate (e.g. "400ms"), or null to
   *   disable transitions
   */
  function setThumbPosition(position: number, transition: string | null) {
    const bounds = getBounds();
    const boundedX = Math.max(Math.min(position, bounds.right), bounds.left);
    const transformX = boundedX - bounds.left;
    const thumb = thumbRef.current!;
    thumb.style.translate = `${transformX}px`;
    thumb.style.transition = transition === null ? "none" : `translate ${transition}`;
  }

  function setTextAnimation(style: "animated" | "static"): void {
    textRef.current!.className = `${styles.text} ${styles[style]}`;
  }

  function setTextOpacity(opacity: number, useTransition: boolean) {
    textRef.current!.style.transition = useTransition ? "opacity 50ms" : "none";
    textRef.current!.style.opacity = String(opacity);
  }

  function onPointerDown(event: PointerEvent<HTMLImageElement>): void {
    // Remove text shine while dragging
    setTextAnimation("static");
    // Re-compute bounds in case the window size has changed
    computeBounds();
    pointerOffset.current =
      event.clientX - thumbRef.current!.getBoundingClientRect().left;
    // keep drag alive outside element
    thumbRef.current!.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLImageElement>): void {
    if (event.buttons === 0) {
      return;
    }
    setThumbPosition(event.clientX - pointerOffset.current, null);
    setTextOpacity(Math.max(0, 0.75 - getProgress()), false);
  }

  function onPointerUp(): void {
    const progress = getProgress();
    if (Math.ceil(progress * 100) >= 100) {
      unlock();
      return;
    }
    // Resume showing the text animation
    setTextAnimation("animated");
    setTextOpacity(1, true);
    // Return thumb to start with transition proportional to how far it has to travel
    const transitionTime = Math.round(progress * 200);
    setThumbPosition(0, `${transitionTime}ms ease-in`);
  }

  return (
    <div id="unlock-slider" data-testid="unlock-slider" className={styles.slider}>
      <div className={styles.wh100}>
        <div ref={trackRef} className={`${styles.track} ${styles.wh100}`}>
          <button
            ref={textRef}
            className={`${styles.text} ${styles.animated}`}
            onClick={animatedUnlock}
          >
            {text}
          </button>
        </div>
        <div className={styles.bounds} draggable={false}>
          <img
            data-testid="unlock-thumb"
            ref={thumbRef}
            className={styles.thumb}
            src={thumbSvg}
            draggable={false}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
