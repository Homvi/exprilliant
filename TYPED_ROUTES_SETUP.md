# Typed Routes Setup with Ziggy in Laravel + React + TypeScript

This document explains how to implement type-safe routing between Laravel and React using Ziggy in a TypeScript environment.

## Overview

Ziggy provides type-safe routing that bridges Laravel's backend routes with React's frontend, ensuring consistency and catching errors at compile time rather than runtime.

## 1. Package Installation

### Laravel Side
```bash
composer require tightenco/ziggy
```

### Frontend Side
```bash
npm install ziggy-js
```

## 2. Laravel Configuration

### Ziggy Config (`config/ziggy.php`)
```php
<?php

return [
    'except' => [
        'admin.*',
        '_debugbar.*',
    ],
];
```

This configuration excludes admin routes and debug routes from the generated types.

### Blade Template (`resources/views/app.blade.php`)
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes  <!-- This generates the Ziggy routes -->
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
```

The `@routes` directive generates the Ziggy routes configuration that will be available to the frontend.

## 3. TypeScript Configuration

### TypeScript Config (`tsconfig.json`)
```json
{
    "compilerOptions": {
        "allowJs": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "jsx": "react-jsx",
        "strict": true,
        "isolatedModules": true,
        "target": "ESNext",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "noEmit": true,
        "paths": {
            "@/*": ["./resources/js/*"],
            "ziggy-js": ["./vendor/tightenco/ziggy"]
        }
    },
    "include": ["resources/js/**/*.ts", "resources/js/**/*.tsx", "resources/js/**/*.d.ts"],
    "exclude": ["node_modules"]
}
```

The `paths` configuration maps the `ziggy-js` import to the vendor directory.

### Global Types (`resources/js/types/global.d.ts`)
```typescript
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from './';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
```

This makes the `route` function available globally in the browser.

### Route Export (`resources/js/route.ts`)
```typescript
import { route as ziggyRoute } from 'ziggy-js';

export const route = ziggyRoute;
```

This provides a clean import for the route function in your components.

## 4. Route Type Generation

### Composer Scripts (`composer.json`)
```json
{
    "scripts": {
        "generate:routes": [
            "@php artisan ziggy:generate --types"
        ],
        "routes:check": [
            "@php artisan ziggy:generate --types",
            "npx tsc --noEmit"
        ],
        "routes:watch": [
            "echo '🔄 Starting route watcher...'",
            "npx concurrently \"@php artisan ziggy:generate --types\" \"npx chokidar 'routes/**/*.php' -c 'php artisan ziggy:generate --types'\""
        ],
        "dev": [
            "Composer\\Config::disableProcessTimeout",
            "npx concurrently -c \"#93c5fd,#c4b5fd,#fb7185,#fdba74,#10b981\" \"php artisan serve\" \"php artisan queue:listen --tries=1\" \"php artisan pail --timeout=0\" \"npm run dev\" \"npx chokidar 'routes/**/*.php' -c 'php artisan ziggy:generate --types'\" --names=server,queue,logs,vite,routes"
        ],
        "prepare": [
            "echo '🛣️  Generating typed routes...'",
            "@composer generate:routes",
            "echo '🔧 Fixing code formatting...'",
            "@composer format:fix",
            "echo '🔍 Running PHPStan analysis...'",
            "@composer analyse",
            "echo '🧪 Running PHP tests...'",
            "@composer test",
            "echo '📝 Running ESLint...'",
            "npm run lint",
            "echo '🔍 Running TypeScript check...'",
            "npx tsc --noEmit",
            "echo '✅ All checks completed successfully! Ready for pull request.'"
        ]
    }
}
```

### Available Commands

- `composer generate:routes` - Generate TypeScript types for all Laravel routes
- `composer routes:check` - Generate routes and run TypeScript checking
- `composer routes:watch` - Continuously watch for route changes and auto-regenerate
- `composer dev` - Full development environment with automatic route regeneration

## 5. Generated Route Types

The `php artisan ziggy:generate --types` command generates `resources/js/ziggy.d.ts`:

```typescript
/* This file is generated by Ziggy. */
declare module 'ziggy-js' {
  interface RouteList {
    "sanctum.csrf-cookie": [],
    "language.switch": [],
    "jobs.public.index": [],
    "jobs.public.show": [
        {
            "name": "job",
            "required": true,
            "binding": "id"
        }
    ],
    "dashboard": [],
    "jobs.apply": [
        {
            "name": "job",
            "required": true,
            "binding": "id"
        }
    ],
    "my-applications.index": [],
    "jobs.index": [],
    "jobs.create": [],
    "jobs.show": [
        {
            "name": "job",
            "required": true,
            "binding": "id"
        }
    ],
    "jobs.applicants": [
        {
            "name": "job",
            "required": true,
            "binding": "id"
        }
    ],
    "jobs.store": [],
    "jobs.publish": [
        {
            "name": "job",
            "required": true,
            "binding": "id"
        }
    ],
    "jobs.destroy": [
        {
            "name": "job",
            "required": true,
            "binding": "id"
        }
    ],
    "applicants.show": [
        {
            "name": "application",
            "required": true,
            "binding": "id"
        }
    ],
    "applications.updateStatus": [
        {
            "name": "application",
            "required": true,
            "binding": "id"
        }
    ],
    "profile.edit": [],
    "profile.update": [],
    "profile.destroy": [],
    "admin.companies.index": [],
    "admin.companies.validate": [
        {
            "name": "company",
            "required": true,
            "binding": "id"
        }
    ],
    "register.job-seeker": [],
    "register.company": [],
    "login": [],
    "password.request": [],
    "password.email": [],
    "password.reset": [
        {
            "name": "token",
            "required": true
        }
    ],
    "password.store": [],
    "verification.notice": [],
    "verification.verify": [
        {
            "name": "id",
            "required": true
        },
        {
            "name": "hash",
            "required": true
        }
    ],
    "verification.send": [],
    "password.confirm": [],
    "password.update": [],
    "logout": [],
    "storage.local": [
        {
            "name": "path",
            "required": true
        }
    ]
  }
}
export {};
```

This file defines the TypeScript interface for all available routes and their parameters.

## 6. Usage in React Components

### Basic Import
```typescript
import { route } from '@/route';
import { router } from '@inertiajs/react';
```

### Navigation Examples

#### Navigate to a route without parameters
```typescript
router.get(route('jobs.index'));
```

#### Navigate to a route with parameters
```typescript
router.get(route('jobs.show', { job: 1 }));
```

#### Navigate to a route with multiple parameters
```typescript
router.get(route('verification.verify', { id: 1, hash: 'abc123' }));
```

#### In JSX with Link component
```typescript
import { Link } from '@inertiajs/react';

<Link href={route('jobs.public.show', job.id)}>
    <Button>View Job</Button>
</Link>
```

#### Form submissions
```typescript
import { router } from '@inertiajs/react';

// POST request
router.post(route('jobs.store'), formData);

// PATCH request
router.patch(route('profile.update'), formData);

// DELETE request
router.delete(route('jobs.destroy', jobId));
```

### Real-world Examples from the Project

```typescript
// Dashboard navigation
<Link href={route('jobs.public.index')}>
    <Button>Browse Jobs</Button>
</Link>

// Job application
<Link href={route('jobs.public.show', job.id)}>
    <Button variant="outline" size="sm">
        View Job
    </Button>
</Link>

// Company dashboard
<Link href={route('jobs.create')}>
    <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Post a New Job Offer
    </Button>
</Link>

// Admin actions
router.post(route('admin.companies.validate', companyId), {
    onSuccess: () => {
        // Handle success
    }
});
```

## 7. Type Safety Features

### ✅ Autocomplete
All available routes show in your IDE with full autocomplete support.

### ✅ TypeScript Errors
Non-existent routes cause compilation errors:
```typescript
// This will cause a TypeScript error
router.get(route('non.existent.route'));
```

### ✅ Parameter Enforcement
Required parameters are enforced:
```typescript
// This will cause a TypeScript error - missing required 'job' parameter
router.get(route('jobs.show'));

// This is correct
router.get(route('jobs.show', { job: 1 }));
```

### ✅ Type Safety
Parameter values are type-checked:
```typescript
// TypeScript will ensure the parameter types match
router.get(route('verification.verify', { 
    id: 1,        // number
    hash: 'abc123' // string
}));
```

## 8. Development Workflow

### Initial Setup
1. Install packages (see section 1)
2. Configure Ziggy (see section 2)
3. Set up TypeScript (see section 3)
4. Generate initial route types:
   ```bash
   composer generate:routes
   ```

### Daily Development
```bash
# Start full development environment with route watching
composer dev
```

This command starts:
- Laravel server
- Queue listener
- Log viewer
- Vite dev server
- Route watcher (auto-regenerates types when routes change)

### Before Commits
```bash
# Run all checks including route type checking
composer prepare
```

This runs:
- Route type generation
- Code formatting
- PHPStan analysis
- PHP tests
- ESLint
- TypeScript checking

## 9. Best Practices

### Route Management
- Run `composer generate:routes` after adding/modifying routes
- Use `composer routes:watch` during development for auto-regeneration
- Include route type checking in your CI/CD pipeline
- Use `composer routes:check` before commits

### Code Organization
- Import `route` from `@/route` for consistency
- Use descriptive route names that match your Laravel routes
- Group related routes with dot notation (e.g., `jobs.public.index`)

### Error Handling
- Always handle route generation errors in CI/CD
- Validate route parameters before using them
- Use TypeScript strict mode for maximum type safety

## 10. Troubleshooting

### Common Issues

#### Routes not updating
```bash
# Clear route cache and regenerate
php artisan route:clear
composer generate:routes
```

#### TypeScript errors after route changes
```bash
# Regenerate types and check
composer routes:check
```

#### Ziggy not found in browser
- Ensure `@routes` directive is in your Blade template
- Check that Ziggy is properly installed
- Verify the route generation worked

#### Import errors
- Check your `tsconfig.json` paths configuration
- Ensure `ziggy-js` is mapped correctly
- Verify the `resources/js/route.ts` file exists

## 11. Advanced Configuration

### Custom Route Groups
You can exclude specific route groups from type generation in `config/ziggy.php`:

```php
<?php

return [
    'except' => [
        'admin.*',
        '_debugbar.*',
        'api.*',  // Exclude API routes
    ],
    'groups' => [
        'admin' => ['admin.*'],
        'api' => ['api.*'],
    ],
];
```

### Environment-specific Configuration
```php
// config/ziggy.php
<?php

return [
    'except' => [
        'admin.*',
        '_debugbar.*',
    ],
    'url' => env('APP_URL'),
    'port' => env('APP_PORT'),
];
```

## 12. Benefits Summary

1. **Type Safety**: No more typos in route names or missing parameters
2. **IDE Support**: Full autocomplete and IntelliSense
3. **Refactoring Safety**: Route changes are caught at compile time
4. **Developer Experience**: Immediate feedback on route usage
5. **Maintenance**: Automatic type generation keeps types in sync
6. **Consistency**: Ensures frontend and backend routes match
7. **Error Prevention**: Catches routing errors before they reach production

This setup provides a robust, type-safe routing system that bridges Laravel's backend routes with React's frontend, ensuring consistency and catching errors at compile time rather than runtime.
