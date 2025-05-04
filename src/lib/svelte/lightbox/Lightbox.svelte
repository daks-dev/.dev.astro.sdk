<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Overlay from './inc/Overlay.svelte';
  import Header from './inc/Header.svelte';
  import Footer from './inc/Footer.svelte';
  import Body from './inc/Body.svelte';
  import type { LightboxAttributes as Props } from './index.d.ts';

  const {
    tag = 'div',
    children,
    class: className,
    custom = {},
    options: __options = {},
    title,
    description,
    fullscreen: __fullscreen = false,
    scrollable = false,
    loader,
    thumbnail,
    ...rest
  }: Props = $props();

  const options = Object.assign(
    {
      clickableClose: true,
      buttonClose: true,
      buttonFullscreen: true,
      enableKeyboard: true,
      bodyScroll: false,
      duration: 400
    },
    __options,
    {
      swipe: false,
      wheel: false
    }
  );
  if (scrollable) options.buttonFullscreen = false;

  let fullscreen = $state(scrollable ? false : __fullscreen);
  let visible = $state(false);

  let toggleScroll: () => void;

  export function open(): void {
    visible = true;
    toggleScroll();
  }

  export function close(): void {
    visible = false;
    toggleScroll();
  }

  function toogleFullscreen(): void {
    fullscreen = !fullscreen;
  }

  $effect(() => {
    loader?.();
    if (!options.bodyScroll || scrollable) {
      toggleScroll = function () {
        if (window.scrollbars.visible)
          if (visible) {
            document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
            document.body.style.overflowY = 'hidden';
          } else {
            document.body.style.overflowY = '';
            document.documentElement.style.paddingRight = '';
          }
      };
    }
  });
</script>

{#if thumbnail}
  <svelte:element
    this={tag}
    onclick={open}
    class={twMerge('hover:cursor-zoom-in', className)}
    role="button"
    tabindex="-1"
    {...rest}>
    {@render thumbnail()}
  </svelte:element>
{/if}

{#if visible}
  <Overlay
    {close}
    {custom}
    {fullscreen}
    {options}>
    <Header
      {close}
      {toogleFullscreen}
      {custom}
      {fullscreen}
      {options} />
    <Body
      {fullscreen}
      {scrollable}
      {options}>
      {@render children?.()}
    </Body>
    <Footer
      {custom}
      {fullscreen}
      {title}
      {description} />
  </Overlay>
{/if}
