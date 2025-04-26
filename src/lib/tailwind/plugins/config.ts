import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import convert from 'mini-svg-data-uri';
import plugin from 'tailwindcss/plugin.js';

const spinner = (x: string) =>
  convert(
    readFileSync(
      resolve(dirname(fileURLToPath(import.meta.url)), '../../assets/icons/spinners/', x),
      'utf8'
    )
  );

const r = (x: number, n = 4): number => {
  const f = Math.pow(10, n);
  return Math.round(x * f) / f;
};

const f = (x: number, d = 0.25) => [
  `${x}rem`,
  {
    lineHeight: r((x + d) / x)
  }
];

export default plugin(() => {}, {
  theme: {
    extend: {
      spacing: {
        inherit: 'inherit',
        unset: 'unset'
      },
      fontSize: {
        '3xs': f(0.5),
        '2xs': f(0.625),
        '1.5xl': f(1.375),
        '2.5xl': f(1.6875),
        '3.5xl': f(2),
        '4.5xl': f(2.5),
        '5.5xl': f(3.5)
      },
      listStyleType: {
        circle: 'circle',
        square: 'square'
      },
      backgroundImage: {
        '-loading': `url("${spinner('svg-spinners--bars-rotate-fade.svg')}")`,
        '-waiting': `url("${spinner('svg-spinners--clock.svg')}")`
      }
    }
  }
});
