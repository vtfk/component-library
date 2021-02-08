import { create } from '@storybook/theming/create'

export default create({
  base: 'light',

  colorPrimary: '#BEDACA',
  colorSecondary: '#BEDACA',

  // UI
  appBg: '#EFEFEF',
  appContentBg: '#fff',
  appBorderColor: 'transparent',
  appBorderRadius: 4,

  // Text colors
  textColor: '#000',
  textInverseColor: '#000',

  // Toolbar default and active colors
  barTextColor: '#000',
  barSelectedColor: '#000',
  barBg: '#BEDACA',

  // Form colors
  inputBg: '#EFEFEF',
  inputBorder: 'transparent',
  inputTextColor: '#000',
  inputBorderRadius: 4,

  brandTitle: 'Komponentbibliotek VTFK',
  brandUrl: 'https://komponenter.vtfk.no',
  brandImage: 'https://designmanual.vtfk.no/css/images/VT-logo.svg'
})
