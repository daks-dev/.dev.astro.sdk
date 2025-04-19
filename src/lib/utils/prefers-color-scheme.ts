export default (mode = 'dark') => {
  console.log('changing');
  for (var i = document.styleSheets[0].cssRules.length - 1; i >= 0; i--) {
    const rule = document.styleSheets[0].cssRules[i] as CSSMediaRule;
    if (rule.media?.mediaText.includes('prefers-color-scheme')) {
      console.log('includes color scheme');
      switch (mode) {
        case 'light':
          console.log('light');
          rule.media.appendMedium('original-prefers-color-scheme');
          if (rule.media.mediaText.includes('light'))
            rule.media.deleteMedium('(prefers-color-scheme: light)');
          if (rule.media.mediaText.includes('dark'))
            rule.media.deleteMedium('(prefers-color-scheme: dark)');
          break;
        case 'dark':
          console.log('dark');
          rule.media.appendMedium('(prefers-color-scheme: light)');
          rule.media.appendMedium('(prefers-color-scheme: dark)');
          if (rule.media.mediaText.includes('original'))
            rule.media.deleteMedium('original-prefers-color-scheme');
          break;
        default:
          console.log('default');
          rule.media.appendMedium('(prefers-color-scheme: dark)');
          if (rule.media.mediaText.includes('light'))
            rule.media.deleteMedium('(prefers-color-scheme: light)');
          if (rule.media.mediaText.includes('original'))
            rule.media.deleteMedium('original-prefers-color-scheme');
      }
      break;
    }
  }
};
