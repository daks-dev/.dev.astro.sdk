<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { toObj } from '../../utils/scroll.js';

  type Props = {
    mode: 'app' | 'list' | 'map';
    length?: number;
    class?: ClassValue;
    classButton?: ClassValue;
    app?: boolean;
    list?: boolean;
    map?: boolean;
    icons?: Record<'app' | 'list' | 'map', string>;
  };

  let {
    mode = $bindable(),
    length,
    class: className,
    classButton,
    app = false,
    list = false,
    map = false,
    icons
  }: Props = $props();

  icons = Object.assign(
    {
      app: 'iconify ph--squares-four',
      list: 'iconify ph--list-dashes',
      map: 'iconify ph--map-trifold'
    },
    icons
  );

  let innerWidth = $state(0);

  const buttonClass = [
    'first:ml-auto',
    'rounded-sm p-1.5',
    'disabled:text-cyan-600 dark:disabled:text-cyan-700',
    'oversee:bg-gray-300 dark:oversee:bg-gray-700',
    'hover:cursor-pointer'
  ];

  $effect.pre(() => {
    if (mode === 'map' && innerWidth < 640) mode = 'app';
  });
  $effect(() => {
    if (mode === 'app') document?.lazyload?.update();
    if (mode === 'map')
      setTimeout(() => toObj('[id|="ymap"]', { offset: -96, duration: 2100 }), 700);
  });
</script>

<svelte:window bind:innerWidth />

<div class={twMerge('overflow-hidden', 'flex items-center gap-4', className)}>
  {#if length}
    <span class="mr-auto p-1.5">[ <small>{length}</small> ]</span>
  {/if}
  {#if app}
    <button
      onclick={() => (mode = 'app')}
      class={twMerge(buttonClass, classButton)}
      type="button"
      aria-label="список блоками"
      disabled={mode === 'app' || undefined}>
      <span class={twMerge('block size-6', icons.app)}>список блоками</span>
    </button>
  {/if}
  {#if list}
    <button
      onclick={() => (mode = 'list')}
      class={twMerge(buttonClass, classButton)}
      type="button"
      aria-label="список строками"
      disabled={mode === 'list' || undefined}>
      <span class={twMerge('block size-6', icons.list)}>список строками</span>
    </button>
  {/if}
  {#if map}
    <button
      onclick={() => (mode = 'map')}
      class={twMerge(buttonClass, classButton)}
      type="button"
      aria-label="список маркерами на карте"
      disabled={mode === 'map' || undefined}>
      <span class={twMerge('bg-only size-6', icons.map)}>список маркерами на карте</span>
    </button>
  {/if}
</div>
