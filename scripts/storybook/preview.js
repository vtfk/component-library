// Globally in your .storybook/preview.js.
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { addParameters } from '@storybook/client-api';

addParameters({
  viewMode: 'docs',
});

addDecorator(withInfo);
