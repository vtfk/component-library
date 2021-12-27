module.exports = {
  stories: ['../../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/preset-scss',
    '@whitespace/storybook-addon-html'
  ],
  core: {
    builder: 'webpack5'
  }
}
