import { autorun, reaction } from "mobx";
import { type EffectCallback } from "react";
/**
 * Run code once on component mount. Shorthand for useEffect(effect, []).
 */
export declare function useMounted(effect: EffectCallback): void;
/**
 * Initialize a mobx autorun watcher on component mount, and
 * clean it up when the component unmounts.
 */
export declare function useAutorun(view: Parameters<typeof autorun>[0]): void;
/**
 * Initialize a mobx reaction watcher on component mount, and
 * clean it up when the component unmounts.
 */
export declare function useReaction<T>(expression: Parameters<typeof reaction<T>>[0], effect: Parameters<typeof reaction<T>>[1], opts?: Parameters<typeof reaction<T>>[2]): void;
/**
 * Run a callback on every animation frame. Cleans up
 * after component unmount.
 */
export declare function useAnimationFrame(callback: () => void): void;
