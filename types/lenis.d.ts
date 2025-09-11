declare module "@studio-freight/lenis" {
  export interface LenisOptions {
    duration?: number;
    smoothWheel?: boolean;
    smoothTouch?: boolean; // added manually
    gestureDirection?: "vertical" | "horizontal";
    lerp?: number;
    infinite?: boolean;
    syncTouch?: boolean;
    syncTouchLerp?: number;
    touchMultiplier?: number;
    wheelMultiplier?: number;
    autoResize?: boolean;
  }

  class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    destroy(): void;
    scrollTo(
      target: number | string | HTMLElement,
      options?: { offset?: number; immediate?: boolean; duration?: number; easing?: (t: number) => number }
    ): void;
  }

  export default Lenis;
}