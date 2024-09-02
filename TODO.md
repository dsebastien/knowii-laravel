# TODO

HMR does not work
Polling does not work
===> BUILDS A SINGLE TIME



"options": {
"watch": true
},



export NX_DAEMON=false; npx nx build knowii



package.json 
"type": "module",



dockerfile
- '${APP_PORT:-80}:80'
- --> why 80


review fixmes


- Copy assets to public folder: https://github.com/nrwl/nx/blob/master/docs/shared/packages/vite/configure-vite.md#copying-assets

tailwind config

npm dependency versions


package.json???
"type": "module",


ENV
VITE_APP_NAME="${APP_NAME}"


index.d.ts
PagePros


tsconfig
"moduleResolution": "bundler",
"include": ["resources/js/**/*.ts", "resources/js/**/*.tsx", "resources/js/**/*.d.ts"]

- Review CI config

- Add Prime React
- React icons
- test changelog gen
- test npm run cm
- Adapt humans.txt



app.spec.tsx

import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
it('should render successfully', () => {
const { baseElement } = render(<App />);
expect(baseElement).toBeTruthy();
});

it('should have a greeting as the title', () => {
const { getByText } = render(<App />);
expect(getByText(/Welcome/gi)).toBeTruthy();
});
});




common.spec.ts


import { common } from './common';

describe('common', () => {
it('should work', () => {
expect(common()).toEqual('common');
});
});





- Preconnect for Google fonts: <link rel="preconnect" href="https://fonts.bunny.net">
- Load font: <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

- Create DB model
  - Db person profile: Always link resources to persons or orgs (n-n)
  - Create "Default" collection automatically, and display those as cards
- Find how to deploy to Laravel Forge
- Create GH pipelines for tests
- Create GH pipelines for deployment
- Customize application logo
  - `resources/js/Components/ApplicationLogo.vue`
  - `resources/js/Components/ApplicationMark.vue`
  - `resources/js/Components/AuthenticationCardLogo.vue`
  - `npm run build`

- Add socialite: https://laravel.com/docs/11.x/socialite
- Add conventional commits, commitizen, etc

- Add knowii.code-workspace for vs code
- Convert Vue component props to use TS. Example: `const props = defineProps<{ mustVerifyEmail: boolean, status: string, userTs: User }>();`
- Configure logging: Configure logging: https://laravel.com/docs/11.x/logging
- Configure Prettier for PHP: https://github.com/prettier/plugin-php
- Add Sentry: https://sentry.io/for/laravel/
- Add Sonar
- Generate OpenAPI docs: https://github.com/DarkaOnLine/L5-Swagger
- Explore Tailwind passthrough with Prime Vue: https://tailwind.primevue.org/overview
- Troubleshoot release and generate:changelog scripts
