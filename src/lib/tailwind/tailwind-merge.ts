import { extendTailwindMerge } from 'tailwind-merge';

const config: any = {
  extend: {
    theme: {
      breakpoint: ['bp', 'xs', '3xl'],
      spacing: ['inherit', 'unset']
    },
    classGroups: {
      container: [
        {
          frame: ['', 'sm', 'md', 'lg', 'xl', '2xl', (x: string) => Number(x) > 0],
          wrapper: ['', 'sm', 'md', 'lg', 'xl', '2xl', (x: string) => Number(x) > 0]
        }
      ],
      aspect: [
        {
          aspect: ['A4', 'A4l']
        }
      ],
      content: [
        {
          content: ['empty']
        }
      ],
      'drop-shadow': [
        {
          'drop-shadow': ['deep', 'hard']
        }
      ],
      'font-size': [
        {
          text: ['3xs', '2xs', '1.5xl', '2.5xl', '3.5xl', '4.5xl']
        }
      ],
      'list-style-type': [
        {
          list: ['circle', 'square']
        }
      ],
      rounded: [
        {
          rounded: ['5xl', '6xl']
        }
      ],
      'bg-only': [
        {
          bg: ['only']
        }
      ],
      'bg-image': [
        {
          bg: ['-loading', '-waiting']
        }
      ],
      'pointer-effects': ['enabled', 'disabled'],
      iconify: [
        {
          iconify: ['', 'color']
        }
      ],
      'iconify-icon': [
        {
          icon: [(x: string) => /^\[([\w-]+)--([\w\d-]+)\]$/.test(x)]
        }
      ]
    }
    // conflictingClassGroups: {}
    // orderSensitiveModifiers: []
  }
};

const expand: any = Object.values(
  import.meta.glob('/twmerge.config.(js|ts)', {
    eager: true,
    import: 'default'
  })
)[0];

if (expand) {
  [
    'theme',
    'classGroups',
    'conflictingClassGroups',
    'conflictingClassGroupModifiers',
    'orderSensitiveModifiers'
  ].forEach((i) => {
    if (expand.extend[i]) {
      if (config.extend[i]) {
        if (i === 'orderSensitiveModifiers') {
          config.extend[i] = config.extend[i].concat(expand.extend[i]);
        } else {
          Object.keys(expand.extend[i]).forEach((key) => {
            if (config.extend[i][key]) {
              config.extend[i][key] = config.extend[i][key].concat(expand.extend[i][key]);
            } else {
              config.extend[i][key] = expand.extend[i][key];
            }
          });
        }
      } else {
        config.extend[i] = expand.extend[i];
      }
    }
  });
}

export const twMerge = extendTailwindMerge<any>(config);

export { twJoin } from 'tailwind-merge';

export default config;
