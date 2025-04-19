<script lang="ts">
  import { onMount } from 'nanostores';
  import { persistentAtom } from '@nanostores/persistent';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import type { HTMLTimeAttributes } from 'svelte/elements';

  export interface Props extends Omit<HTMLTimeAttributes, 'class'> {
    class?: ClassValue;
  }

  const {
    class: className,
    datetime = new Date().toLocaleDateString('ru'),
    ...rest
  }: Props = $props();

  const format = (x: number) => {
    if (isNaN(x)) return '--:--';
    const d = Math.floor(x / (3600 * 24));
    const h = Math.floor((x % (3600 * 24)) / 3600);
    const m = Math.floor((x % 3600) / 60);
    const s = Math.floor(x % 60);
    return (
      (d ? `${d.toString()} - ` : '') +
      (h || d ? `${h.toString().padStart(2, '0')}:` : '') +
      `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    );
  };

  const timer = persistentAtom<number>('app::timer', 0, {
    encode: (val) => (val ? `${val}` : '0'),
    decode: (val) => (val ? parseInt(val) : 0)
  });

  onMount(timer, () => {
    const interval = setInterval(() => {
      timer.set(timer.get() + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<time
  class={twMerge(className)}
  {datetime}
  {...rest}>
  {format($timer)}
</time>
