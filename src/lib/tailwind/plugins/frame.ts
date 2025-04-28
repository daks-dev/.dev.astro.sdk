import plugin from 'tailwindcss/plugin.js';

export default plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      frame: (value, { modifier }) => {
        const css: Record<string, string | Record<string, string>> = {
          width: '100%',
          'margin-inline': 'auto'
        };
        let pad = Number(theme('framePadding', 2));
        pad = isNaN(pad) ? 0 : pad;
        let indent = Number(modifier);
        indent = isNaN(indent) ? 0 : indent;
        if (pad || indent) {
          css['padding-inline'] = `calc(1rem * ${pad + indent})`;
        }
        if (value) {
          const max = Number(value);
          if (max && !isNaN(max)) {
            css['max-width'] = `calc(1rem * ${max})`;
            if (pad || indent) {
              css[`@media (min-width: calc(1rem * ${max + 2 * pad}))`] = {
                'padding-inline': `calc(1rem * ${indent})`
              };
            }
          }
        }
        return css;
      }
    },
    {
      values: Object.assign(theme('frameMaxSize', {}), {
        DEFAULT: '64',
        sm: '40',
        md: '48',
        lg: '64',
        xl: '80',
        '2xl': '96'
      }),
      modifiers: 'any'
    }
  );
});
