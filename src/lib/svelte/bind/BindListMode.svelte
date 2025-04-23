<script lang="ts">
  import ListMode from '../list-mode/ListMode.svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    class?: ClassValue;
    classButton?: ClassValue;
    length?: number;
    icons?: Record<'app' | 'list' | 'map', string>;
    app?: Snippet<[]>;
    list?: Snippet<[]>;
    map?: Snippet<[]>;
  };

  const { app, list, map, ...rest }: Props = $props();

  let mode = $state<'app' | 'list' | 'map'>('app');
</script>

<ListMode
  bind:mode
  app={!!app}
  list={!!list}
  map={!!map}
  {...rest} />

{#if mode === 'app'}
  {@render app?.()}
{:else if mode === 'list'}
  {@render list?.()}
{:else}
  {@render map?.()}
{/if}
