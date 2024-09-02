<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @routes
        @viteReactRefresh

        {{
            // WARNING: All paths below are relative to the root /public folder
            // Reference: https://laravel.com/api/11.x/Illuminate/Support/Facades/Vite.html
            Vite::useManifestFilename('.vite/manifest.json')
            ->withEntryPoints(["apps/knowii/src/main.tsx","apps/knowii/src/Pages/{$page['component']}.tsx"])
        }}

        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
</html>
