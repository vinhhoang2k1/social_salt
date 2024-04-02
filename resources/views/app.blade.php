<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title inertia>{{ config('app.name', 'Laravel') }}</title>    
    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/scss/app.scss','resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])


    <!-- Styles -->
    @inertiaHead

  </head>

  <body>
    @inertia
  </body>
</html>
