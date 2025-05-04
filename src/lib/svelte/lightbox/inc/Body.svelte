<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import { blur } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { Options, Status } from '../index.d.ts';

  type Props = {
    children?: Snippet<[]>;
    fullscreen: boolean;
    scrollable: boolean;
    options: Options;
    status?: Status;
  };

  const { children, fullscreen, scrollable, options, status }: Props = $props();

  const delay = options.duration && Math.round(options.duration / 4);
</script>

<div
  in:blur={{ duration: options.duration, delay }}
  out:blur={{ duration: delay }}
  id="lightbox-body"
  class={twMerge(
    'relative z-10 flex overflow-hidden',
    fullscreen && 'fullscreen',
    scrollable && 'scrollable overflow-y-auto',
    options.swipe && status && status.countItems > 1 ? 'cursor-ew-resize' : 'cursor-default'
  )}>
  {@render children?.()}
</div>
