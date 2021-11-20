export enum TypographyTypeStyle {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  p1 = 'p1',
  p2 = 'p2',
  p3 = 'p3',
  span = 'span',
}

export const TypographyType = {
  [TypographyTypeStyle.h1]: 'h1',
  [TypographyTypeStyle.h2]: 'h2',
  [TypographyTypeStyle.h3]: 'h3',
  [TypographyTypeStyle.h4]: 'h4',
  [TypographyTypeStyle.p1]: 'p',
  [TypographyTypeStyle.p2]: 'p',
  [TypographyTypeStyle.p3]: 'p',
  [TypographyTypeStyle.span]: 'span',
} as const;
