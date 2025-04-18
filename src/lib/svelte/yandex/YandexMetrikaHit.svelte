<script
  lang="ts"
  module>
  declare const ym: (...x: unknown[]) => void;
</script>

<script lang="ts">
  // @ts-nocheck
  import { page, navigating } from '$app/state';

  type Props = {
    counter: number | string;
    title: string;
  };
  const { counter, title }: Props = $props();

  let interval: ReturnType<typeof setInterval>;
  const hit = () =>
    (interval = setInterval(() => {
      if (typeof ym !== 'undefined') {
        ym(counter, 'hit', page.url.href, {
          title,
          referer: navigating.from?.url.href
        });
        clearInterval(interval);
      }
    }, 75));

  $effect(() => {
    hit();
    return () => clearInterval(interval);
  });
</script>
