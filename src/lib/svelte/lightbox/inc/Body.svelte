<script lang="ts">
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
</script>

<div
  id="lightbox-body"
  class={[
    'relative z-10 flex overflow-hidden',
    fullscreen && 'fullscreen',
    scrollable && 'scrollable overflow-y-auto',
    options.swipe && status && status.countItems > 1 ? 'cursor-ew-resize' : 'cursor-default'
  ]}>
  {@render children?.()}
</div>
