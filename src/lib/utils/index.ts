export const uuid = (length = 5) =>
  Math.floor((1 + Math.random()) * Math.pow(16, length) * 0x1)
    .toString(16)
    .substring(1);

export const random = (x?: unknown[]): number =>
  x?.length ? Math.floor(Math.random() * x.length) : -1;

export const isHover = () => window?.matchMedia('(hover: hover)').matches;

export const isTouch = () =>
  window?.matchMedia('(pointer: coarse)').matches ||
  navigator?.maxTouchPoints > 0 ||
  (document && 'ontouchstart' in document.documentElement);

export { default as Animate } from './Animate.js';
export { default as Swipe, swipe } from './Swipe.js';
export { default as Wheel, wheel } from './Wheel.js';

export * as audio from './audio.js';
export { default as outside } from './outside.js';
export * as scroll from './scroll.js';

export { default as lazyload } from './lazyload.js';
export type { LazyLoad } from './lazyload.d.ts';
