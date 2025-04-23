import { navigate } from 'astro:transitions/client';
import { beep } from '../../utils/audio.js';

export class AppDropdown extends HTMLDivElement {
  duration: number;
  timeout?: ReturnType<typeof setTimeout>;

  toggle: HTMLAnchorElement;
  dropper: HTMLElement;

  constructor(x = 200) {
    super();
    this.duration = x;
    this.toggle = this.querySelector('[id|=app-dropdown-toggle]')!;
    this.dropper = this.querySelector('[id|=app-dropdown-appear]')!;
    this.hide && this.squeeze();
  }

  connectedCallback() {
    window.addEventListener('resize', this.attach);
    document.addEventListener('astro:page-load', this.attach, { once: true });
    this.toggle.addEventListener('click', this.handleToggle);
    this.toggle.addEventListener('dblclick', this.handleNavigate);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.attach);
  }

  squeeze = (x = true) => {
    this.dropper.style.height = x ? '0px' : '';
    this.dropper.style.maxHeight = x ? '0px' : '';
    this.dropper.style.paddingBlock = x ? '0px' : '';
    this.dropper.style.lineHeight = x ? '0px' : '';
    this.dropper.style.borderBlock = x ? 'none' : '';
  };

  get hide() {
    return this.dropper.hasAttribute('inert');
  }

  set hide(x) {
    if (this.hide !== x) {
      clearTimeout(this.timeout);
      if (x) {
        this.dropper.setAttribute('inert', '');
        this.timeout = setTimeout(this.squeeze, this.duration);
        this.toggle.setAttribute('aria-expanded', 'false');
      } else {
        this.dropper.removeAttribute('inert');
        this.squeeze(false);
        this.toggle.setAttribute('aria-expanded', 'true');
      }
    }
  }

  attach = () => {
    if (this.dropper.computedStyleMap().get('position')?.toString() === 'absolute') {
      if (this.offsetLeft + this.clientWidth / 2 < window.innerWidth / 2) {
        this.dropper.style.left = '0px';
        this.dropper.style.right = '';
      } else {
        this.dropper.style.left = '';
        this.dropper.style.right = '0px';
      }
    } else {
      this.dropper.style.left = '';
      this.dropper.style.right = '';
    }
  };

  handleToggle = (ev: Event) => {
    if (ev.cancelable) ev.preventDefault();
    // ev.stopPropagation();
    this.hide = !this.hide;
  };

  handleNavigate = (ev: Event) => {
    if (ev.cancelable) ev.preventDefault();
    if (this.toggle.pathname)
      if (this.toggle.getAttribute('aria-current') === 'page') beep(250, 150, 75);
      else navigate(this.toggle.pathname);
  };
}
