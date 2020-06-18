import { create } from '@storybook/theming/create'

export default create({
	base: 'light',

	colorPrimary: '#E3081B',
	colorSecondary: '#E3081B',

	// UI
	appBg: '#EFEFEF',
	appContentBg: '#fff',
	appBorderColor: 'transparent',
	appBorderRadius: 0,

	// Typography
	fontBase:
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	fontCode: 'monospace',

	// Text colors
	textColor: '#000',
	textInverseColor: 'rgba(255,255,255,0.9)',

	// Toolbar default and active colors
	barTextColor: '#000',
	barSelectedColor: '#000',
	barBg: '#FED603',

	// Form colors
	inputBg: 'white',
	inputBorder: 'transparent',
	inputTextColor: '#000',
	inputBorderRadius: 4,

	brandTitle: 'VTFK komponentbibliotek',
	brandUrl: 'https://example.com',
	brandImage: 'https://designmanual.vtfk.no/css/images/VT-logo.svg',
})
