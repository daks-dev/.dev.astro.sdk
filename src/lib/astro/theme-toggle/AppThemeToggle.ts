export default class AppThemeToggle extends HTMLButtonElement {
  readonly class = 'theme-dark';

  constructor() {
    super();
    // this.appendChild(this.querySelector('template')!.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListener('click', this.toggle);
    if (this.dark) this.setAttribute('aria-pressed', 'true');
  }

  // disconnectedCallback() {}

  get dark() {
    return document.documentElement.classList.contains(this.class);
  }

  toggle = () => {
    document.documentElement.classList[this.dark ? 'remove' : 'add'](this.class);
    this.dark ? this.setAttribute('aria-pressed', 'true') : this.removeAttribute('aria-pressed');
  };
}
