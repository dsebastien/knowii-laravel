# TODO
- add prettier format
- format using prettier
- review fixmes
- npm dependency versions
- index.d.ts
- PagePros
- tsconfig: "include": ["resources/js/**/*.ts", "resources/js/**/*.tsx", "resources/js/**/*.d.ts"]
- Review CI config
- update theme to match the PrimeReact theme: primereact/resources/themes/lara-light-pink/theme.css



- TODO, persistent layout: https://inertiajs.com/pages
- Convert Vue component props to use TS. Example: `const props = defineProps<{ mustVerifyEmail: boolean, status: string, userTs: User }>();`
- Routing: https://github.com/tighten/ziggy?tab=readme-ov-file#react
- Create DB model
  - Db person profile: Always link resources to persons or orgs (n-n)
  - Create "Default" collection automatically, and display those as cards
- Disable this feature: Features::accountDeletion()
- Enable email verification: https://jetstream.laravel.com/features/registration.html#email-verification
- Find how to deploy to Laravel Forge
- Create GH pipelines for tests
- Create GH pipelines for deployment
- Customize application logo
  - `resources/js/Components/ApplicationLogo.vue`
  - `resources/js/Components/ApplicationMark.vue`
  - `resources/js/Components/AuthenticationCardLogo.vue`
  - `npm run build`
- Add socialite: https://laravel.com/docs/11.x/socialite
- Configure logging: Configure logging: https://laravel.com/docs/11.x/logging
- Configure Prettier for PHP: https://github.com/prettier/plugin-php
- Add Sentry: https://sentry.io/for/laravel/
- Add Sonar
- Generate OpenAPI docs: https://github.com/DarkaOnLine/L5-Swagger
- Explore Tailwind passthrough with Prime Vue: https://tailwind.primevue.org/overview
- Troubleshoot release and generate:changelog scripts
- Check out https://github.com/7nohe/laravel-zodgen
- Create a script to reset the DB, run migrations, and seed the DB
- Add Storybook. Related: https://github.com/area17/blast
- When trying to delete a community, protect by asking the user to enter the full name and the action: https://jetstream.laravel.com/features/password-confirmation.html
- Enable moving resources from one community to another 
- Enable team invitations: https://jetstream.laravel.com/features/teams.html#invitations
- Require terms of service/privacy policy approval: https://jetstream.laravel.com/features/registration.html#requiring-terms-of-service-privacy-policy-approval
- Create filament admin panel

Add tests:
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
