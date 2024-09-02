import './bootstrap';
import './styles.css';
import "primereact/resources/themes/lara-light-pink/theme.css";

import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { PrimeReactProvider } from 'primereact/api';

import {RouteContext} from '@knowii/common';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({el, App, props}) {
    const root = ReactDOM.createRoot(el);

    root.render(
      <StrictMode>
        <RouteContext.Provider value={(window as any).route}>
          <PrimeReactProvider>
            <App {...props} />
          </PrimeReactProvider>
        </RouteContext.Provider>
      </StrictMode>
    );
  },
  progress: {
    color: '#4B5563',
  },
}).then(_createdApp => {

});
