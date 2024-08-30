import {createSSRApp, h} from 'vue';
import {renderToString} from '@vue/server-renderer';
import {createInertiaApp} from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy';
import PrimeVue from 'primevue/config';
import AuraPrimeReactTheme from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import Button from "primevue/button";
import Panel from "primevue/panel";
import Rating from "primevue/rating";

// @ts-expect-error
const appName = import.meta.env.VITE_APP_NAME || 'Knowii';

// WARNING: The Vue app setup must remain in line with the one in app.ts
createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    // @ts-expect-error
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({App, props, plugin}) {
      return createSSRApp({render: () => h(App, props)})
        .use(plugin)
        .use(ZiggyVue, {
          // @ts-expect-error
          ...page.props.ziggy,
          // @ts-expect-error
          location: new URL(page.props.ziggy.location),
        })
        .use(PrimeVue, {
          // Reference: https://primevue.org/configuration/#ripple
          ripple: true,
          // Reference: https://v3.primevue.org/unstyled
          //unstyled: true,
          theme: {
            // Reference
            // https://primevue.org/theming/styled/#presets
            // https://primevue.org/theming/styled/#definepreset
            preset: definePreset(AuraPrimeReactTheme, {
              semantic: {
                // Define primary color
                primary: {
                  50: "{pink.50}",
                  100: "{pink.100}",
                  200: "{pink.200}",
                  300: "{pink.300}",
                  400: "{pink.400}",
                  500: "{pink.500}",
                  600: "{pink.600}",
                  700: "{pink.700}",
                  800: "{pink.800}",
                  900: "{pink.900}",
                  950: "{pink.950}"
                },
              },
            }),
            options: {
              // TODO add support for Dark mode
              // Reference: https://primevue.org/theming/styled/#darkmode
              darkModeSelector: '.knowii-dark-mode',
              // Isolate Primevue styles from Tailwind
              cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
              }
            }
          }
        })
        // Register the PrimeVue components here
        .component('Button', Button)
        .component('Panel', Panel)
        .component('Rating', Rating);
    },
  })
);
