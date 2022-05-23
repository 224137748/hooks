import { supportsPassive } from './env';
import { TargetType } from './domTarget';

export function offset(el: HTMLElement | null, parentEl:TargetType  = null ) {
  let left = 0;
  let top = 0;

  while (el && el != parentEl) {
    left += el.offsetLeft;
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement;
  }

  return {
    left,
    top,
  };
}

export function offsetToBody(el: HTMLElement) {
  let rect = el.getBoundingClientRect();

  return {
    left: -(rect.left + window.pageXOffset),
    top: -(rect.top + window.pageYOffset),
  };
}

export function addEvent(
  el: HTMLElement,
  type: string,
  fn: EventListenerOrEventListenerObject,
  capture?: AddEventListenerOptions
) {
  const useCapture = supportsPassive
    ? {
        passive: false,
        capture: !!capture,
      }
    : !!capture;
  el.addEventListener(type, fn, useCapture);
}

export function removeEvent(
  el: HTMLElement,
  type: string,
  fn: EventListenerOrEventListenerObject,
  capture?: EventListenerOptions
) {
  el.removeEventListener(type, fn, {
    capture: !!capture,
  });
}

export function getElement(el: HTMLElement | string) {
  return (typeof el === 'string'
    ? document.querySelector(el)
    : el) as HTMLElement;
}
