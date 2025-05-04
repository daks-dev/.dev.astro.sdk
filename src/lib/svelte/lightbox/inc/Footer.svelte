<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import type { Custom, Status } from '../index.d.ts';

  type Props = {
    custom: Custom;
    title?: string;
    description?: string;
    fullscreen: boolean;
    status?: Status;
  };

  const { custom, title, description, fullscreen, status, ...rest }: Props = $props();

  const list = status && status.countItems > 1;
</script>

<div
  id="lightbox-footer"
  class={['relative z-30', fullscreen && 'fullscreen', custom.footer]}>
  <div
    class={twMerge(
      'min-h-12 px-4 py-1.5',
      'grid grid-cols-2 items-center',
      'text-sm/none text-white/50 hover:text-white',
      'cursor-default',
      custom.inner?.cuption
    )}>
    {#if title}
      <span class={twMerge('font-semibold', !list && 'col-span-2', custom.inner?.title)}>
        {@html title}
      </span>
    {/if}
    {#if list}
      <span
        class={twMerge('font-mono whitespace-nowrap', title && 'text-right', custom.inner?.status)}>
        {status.activeItem + 1} <sup>[{status.countItems}]</sup>
      </span>
    {/if}
    {#if description}
      <span class={twMerge('text-xs/none', 'col-span-2', custom.inner?.description)}>
        {@html description}
      </span>
    {/if}
  </div>
</div>
