import { useEffect, useRef, useState, useCallback } from 'react';
import { observe } from './observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
}

export interface IntersectionOptions extends IntersectionObserverInit {
  /** The IntersectionObserver interface's read-only `root` property identifies the Element or Document whose bounds are treated as the bounding box of the viewport for the element which is the observer's target. If the `root` is null, then the bounds of the actual document viewport are used.*/
  root?: Element | null;
  /** Margin around the root. Can have values similar to the CSS margin property, e.g. `10px 20px 30px 40px` (top, right, bottom, left). */
  rootMargin?: string;
  /** Number between `0` and `1` indicating the percentage that should be visible before triggering. Can also be an `array` of numbers, to create multiple trigger points. */
  threshold?: number | number[];
  /** Only trigger the inView callback once */
  triggerOnce?: boolean;
  /** Skip assigning the observer to the `ref` */
  skip?: boolean;
  /** Set the initial value of the `inView` boolean. This can be used if you expect the element to be in the viewport to start with, and you want to trigger something when it leaves. */
  initialInView?: boolean;
  /** Fallback to this inView state if the IntersectionObserver is unsupported, and a polyfill wasn't loaded */
  fallbackInView?: boolean;
  /** IntersectionObserver v2 - Track the actual visibility of the element */
  trackVisibility?: boolean;
  /** IntersectionObserver v2 - Set a minimum delay between notifications */
  delay?: number;
}
/**
 * 这个hook返回值支持数组和对象两种形式使用
 */
 export type InViewHookResponse = [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
] & {
  ref: (node?: Element | null) => void;
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

function useInViewport(options: IntersectionOptions ={}):InViewHookResponse {
  const { threshold,
    delay,
    trackVisibility,
    rootMargin,
    root,
    triggerOnce,
    skip,
    initialInView,
    fallbackInView, } = options;
  const unobserve = useRef<Function>()
  const [state, setState] = useState<State>({
    inView: !!initialInView
  });

  const setRef = useCallback(
    (node: Element | null) => {
      if (unobserve.current !== undefined) {
        unobserve.current();
        unobserve.current = undefined;
      }

      // Skip creating the observer
      if (skip) return;

      if (node) {
        unobserve.current = observe(
          node,
          (inView, entry) => {
            setState({ inView, entry });

            if (entry.isIntersecting && triggerOnce && unobserve.current) {
              // If it should only trigger once, unobserve the element after it's inView
              unobserve.current();
              unobserve.current = undefined;
            }
          },
          {
            root,
            rootMargin,
            threshold,
            // @ts-ignore
            trackVisibility,
            // @ts-ignore
            delay,
          },
          fallbackInView,
        );
      }
    },
    // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // If the threshold is an array, convert it to a string so it won't change between renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Array.isArray(threshold) ? threshold.toString() : threshold,
      root,
      rootMargin,
      triggerOnce,
      skip,
      trackVisibility,
      fallbackInView,
      delay,
    ],
  );


  useEffect(() => {
    if (!unobserve.current && state.entry && !triggerOnce && !skip) {
      // If we don't have a ref, then reset the state (unless the hook is set to only `triggerOnce` or `skip`)
      // This ensures we correctly reflect the current state - If you aren't observing anything, then nothing is inView
      setState({
        inView: !!initialInView,
      });
    }
  });

  const result = [setRef, state.inView, state.entry] as InViewHookResponse;

  result.ref = result[0];
  result.inView = result[1];
  result.entry = result[2];

  return result;

}

export default useInViewport;