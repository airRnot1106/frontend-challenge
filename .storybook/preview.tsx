import { withServerFunctionMocks } from '@akfm/vite-plugin-storybook-mock-server-functions/runtime';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import addonVitest from '@storybook/addon-vitest';
import { definePreview } from '@storybook/nextjs-vite';
import addonMsw from 'msw-storybook-addon';
import { setupWorker } from 'msw/browser';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import { handlers } from '../src/lib/api/mocks/handlers';

import '../src/app/globals.css';

export default definePreview({
  addons: [
    addonA11y(),
    addonDocs(),
    addonVitest(),
    addonMsw(async () => {
      const worker = setupWorker(...handlers);
      await worker.start({ onUnhandledRequest: 'bypass', quiet: true });
      return worker;
    }),
  ],
  decorators: [withServerFunctionMocks],
  parameters: {
    a11y: {
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(?:background|color)$/iu,
        date: /Date$/iu,
      },
    },
    viewport: {
      options: {
        lg: {
          name: 'Large',
          styles: {
            height: '100%',
            width: '1024px',
          },
        },
        md: {
          name: 'Medium',
          styles: {
            height: '100%',
            width: '768px',
          },
        },
        sm: {
          name: 'Small',
          styles: {
            height: '100%',
            width: '640px',
          },
        },
        xl: {
          name: 'Extra Large',
          styles: {
            height: '100%',
            width: '1280px',
          },
        },
        xs: {
          name: 'Extra Small',
          styles: {
            height: '100%',
            width: '375px',
          },
        },
        ...INITIAL_VIEWPORTS,
      },
    },
  },
});
