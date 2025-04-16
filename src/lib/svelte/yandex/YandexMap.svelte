<script
  lang="ts"
  module>
  import type { YandexMapGeo, YandexMapInstance, Ymaps } from './index.d.ts';

  declare const ymaps: Ymaps;
</script>

<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { onMount } from 'svelte';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { uuid } from '../../utils/index.js';
  import type { SvelteHTMLElements } from 'svelte/elements';

  type Props = Omit<SvelteHTMLElements['div'], 'class' | 'role' | 'tabindex'> & {
    geo: YandexMapGeo;
    strict?: true;
    tag?: 'div' | 'aside';
    id?: string;
    class: ClassValue;
    apikey?: string;
    lang?: string;
  };

  const {
    geo,
    strict,
    tag = 'div',
    id = `ymap-${uuid()}`,
    class: className,
    apikey,
    lang = 'ru_RU',
    ...rest
  }: Props = $props();

  if (!strict)
    geo.options = Object.assign({}, geo.options, {
      // avoidFractionalZoom: false,
      // autoFitToViewport: 'always',
      suppressMapOpenBlock: true
    });

  const params = new URLSearchParams({
    lang,
    ...(apikey ? { apikey } : {}),
    load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon'
    // mode: 'debug'
  }).toString();

  function upload(): boolean {
    return Boolean(typeof ymaps !== 'undefined' && ymaps?.Map && ymaps?.Placemark);
  }

  let map: YandexMapInstance = {};
  export const get = () => map;
  // TODO:
  // map.events.add('actiontick', () => map.action.getCurrentState());
  // console.log(state.zoom, state.globalPixelCenter);

  let interval: ReturnType<typeof setInterval>;
  function mount(): void {
    interval = setInterval(() => {
      if (upload()) {
        map = new ymaps.Map(id, geo.state, geo.options);
        geo.locations?.forEach((location) => {
          map.geoObjects.add(
            new ymaps.Placemark(location.geometry, location.properties, location.options)
          );
        });
        clearInterval(interval);
      }
    }, 75);
  }
  const handler = (ev: Event) => {
    if (ev.cancelable) ev.preventDefault();
    ev.stopPropagation();
    return false;
  };

  onMount(() => {
    if (BROWSER) {
      if (upload()) mount();
      else {
        const src = `https://api-maps.yandex.ru/2.1/?${params}`;
        if (!document.head.querySelector(`script[src="${src}"]`)) {
          const el = document.createElement('script');
          el.src = src;
          el.async = true;
          document.head.appendChild(el);
          el.addEventListener('load', mount, { once: true });
        } else mount();
      }
      return () => clearInterval(interval);
    }
  });
</script>

<svelte:element
  this={tag}
  onmousedown={handler}
  onmouseup={handler}
  ontouchstart={handler}
  ontouchend={handler}
  {id}
  class={twMerge(className)}
  role="button"
  tabindex="-1"
  {...rest} />
