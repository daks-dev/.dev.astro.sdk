import './types.d.ts';

import type { HTMLAttributes } from 'astro/types';
export type NavLink = Omit<HTMLAttributes<'a'>, 'class'> & {
  class?: ClassValue;
  label?: string;
  icon?: string;
  pointer?: boolean;
  prefetch?: boolean;
};
export type NavItem = NavLink & {
  base?: string;
  disallow?: boolean;
  items?: NavItem[];
};

export type Ym = (...x: unknown[]) => void;
export type Ymaps = {
  ready?: (...x: unknown[]) => unknown;
  Map: new (...x: unknown[]) => YandexMapInstance;
  Placemark: new (...x: unknown[]) => unknown;
} & Record<string, (...x: unknown[]) => unknown>;
export type YandexMapInstance = Record<string, (...x: unknown[]) => unknown> &
  Record<string, Record<string, (...x: unknown[]) => Record<string, (...x: unknown[]) => unknown>>>;
export type YandexMapGeo = {
  state: Record<string, unknown>;
  options: Record<string, unknown>;
  locations: Record<string, unknown>[];
};

export type { AppConfig } from './app/index.d.ts';

// tailwind
export { default as twExtendConfig, twMerge, twJoin } from './tailwind/tailwind-merge.js';

// utils
export { isHover, isTouch, random, uuid } from './utils/index.js';

export { default as Animate } from './utils/Animate.js';
export { default as Swipe, swipe } from './utils/Swipe.js';
export { default as Wheel, wheel } from './utils/Wheel.js';

export * as audio from './utils/audio.js';
export { default as outside } from './utils/outside.js';
export * as scroll from './utils/scroll.js';

export { default as lazyload } from './utils/lazyload.js';
export type { LazyLoad } from './utils/lazyload.d.ts';
