import type { Config } from 'tailwindcss';
import { theme } from './resources/js/theme';

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
      colors: theme.colors,
        extend: {
            fontFamily: {
              app: [
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Fira Sans',
                'Droid Sans',
                'Noto Sans',
                'sans-serif',
              ],
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
          screens: {
            sm: { min: '600px' },
            md: { min: '960px' },
            lg: { min: '1280px' },
            xg: { min: '1600px' },
            xl: { min: '1920px' },
            '2xl': { min: '2440px' },
            print: { raw: 'print' },
            portrait: { raw: '(orientation: portrait)' },
          },
        },
    },

    plugins: [forms, typography],
} satisfies Config;
