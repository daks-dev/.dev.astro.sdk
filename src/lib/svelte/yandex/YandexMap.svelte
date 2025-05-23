<script
  lang="ts"
  module>
  import type { YandexMapGeo, YandexMapInstance, Ymaps } from '../../index.d.ts';

  declare const ymaps: Ymaps;
</script>

<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { uuid } from '../../utils/index.js';
  import type { SvelteHTMLElements } from 'svelte/elements';

  type Props = Omit<SvelteHTMLElements['div'], 'class' | 'role' | 'tabindex'> & {
    geo: YandexMapGeo;
    apikey: string;
    strict?: true;
    tag?: 'div' | 'aside' | 'section';
    id?: string;
    class: ClassValue;
    lang?: string;
    load?: string;
  };

  const {
    geo,
    apikey,
    strict,
    tag = 'div',
    id = `ymap-${uuid()}`,
    class: className,
    lang = 'ru_RU',
    load = 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
    ...rest
  }: Props = $props();

  if (!strict)
    geo.options = Object.assign({}, geo.options, {
      // avoidFractionalZoom: false,
      // autoFitToViewport: 'always',
      suppressMapOpenBlock: true
    });

  const params = new URLSearchParams({
    apikey: apikey,
    lang,
    load
    // mode: 'debug'
  }).toString();

  function upload(): boolean {
    return !!(typeof ymaps !== 'undefined' && ymaps?.Map && ymaps?.Placemark);
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

  $effect(() => {
    const src = `https://api-maps.yandex.ru/2.1/?${params}`;
    if (document.head.querySelector(`script[src="${src}"]`)) mount();
    else {
      if (typeof ymaps !== 'undefined') delete ymaps.ready;
      const el = document.createElement('script');
      el.src = src;
      el.async = true;
      document.head.appendChild(el);
      el.addEventListener('load', mount, { once: true });
    }
    return () => clearInterval(interval);
  });
</script>

<svelte:element
  this={tag}
  {id}
  class={twMerge('relative z-0 overflow-hidden', className)}
  {...rest} />
