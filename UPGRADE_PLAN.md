# 🚀 Laravel 12 Upgrade & Type Safety Action Plan

## 📋 Overview
This document outlines the complete upgrade path from Laravel 10 to Laravel 12 with enhanced type safety and modern PHP features.

**Current State:**
- Laravel: 10.48.20
- PHP: 8.3.24 ✅ (Perfect for Laravel 12)
- Inertia.js: 0.6.11
- Pest: 2.35.1

**Target State:**
- Laravel: 12.x
- PHP: 8.3.24 ✅ (Already compatible)
- Inertia.js: 2.x (Major upgrade with improved performance)
- Pest: 3.x (Major upgrade with new features)
- Enhanced type safety with PHPStan level 6-8
- Rector for automated refactoring
- Modern PHP 8.2+ features

---

## 🎯 Phase 1: Pre-Upgrade Preparation

### Branch: `upgrade/laravel-12-preparation`
**Status:** 🔄 TODO

#### Tasks:
- [ ] Create backup branch: `git checkout -b upgrade/laravel-12-preparation`
- [ ] Document current working state
  - [ ] Take screenshots of all major features
  - [ ] Note custom configurations in `.env`
  - [ ] Document third-party package versions
- [ ] Create feature checklist for post-upgrade testing
- [ ] Backup database schema and data
- [ ] Document any custom middleware or service providers

#### Tests to Run:
- [ ] `composer test` - Ensure all tests pass before upgrade
- [ ] Manual testing of:
  - [ ] User authentication
  - [ ] Admin panel functionality
  - [ ] Game mechanics
  - [ ] Expression submission
  - [ ] Toplist functionality

---

## 🔄 Phase 2: Laravel 12 Core Upgrade

### Branch: `upgrade/laravel-12-core`
**Status:** 🔄 TODO

#### Tasks:
- [ ] Update `composer.json` core dependencies:
  ```json
  {
    "require": {
      "php": "^8.2",
      "laravel/framework": "^12.0",
      "laravel/sanctum": "^4.0",
      "laravel/tinker": "^2.9",
      "inertiajs/inertia-laravel": "^2.0"
    }
  }
  ```
- [ ] Update dev dependencies:
  ```json
  {
    "require-dev": {
      "laravel/breeze": "^2.0",
      "laravel/pint": "^2.0",
      "laravel/sail": "^2.0",
      "nunomaduro/collision": "^8.0",
      "pestphp/pest": "^3.0",
      "pestphp/pest-plugin-laravel": "^3.0"
    }
  }
  ```
- [ ] Run `composer update`
- [ ] Follow Laravel 12 upgrade guide
- [ ] Update any breaking changes in:
  - [ ] Controllers
  - [ ] Middleware
  - [ ] Service providers
  - [ ] Configuration files

#### Tests to Run:
- [ ] `composer test` - Check for breaking changes
- [ ] `php artisan route:list` - Verify routes work
- [ ] `php artisan config:cache` - Test configuration
- [ ] Manual testing of core functionality

---

## 🛠️ Phase 3: Type Safety Infrastructure

### Branch: `upgrade/type-safety-setup`
**Status:** 🔄 TODO

#### Tasks:
- [ ] Install type-enhancing packages:
  ```bash
  composer require --dev rector/rector
  composer require --dev phpstan/phpstan-laravel
  composer require --dev spatie/laravel-type-script-transformer
  composer require --dev laravel/prompts
  ```
- [ ] Create `rector.php` configuration:
  ```php
  <?php
  declare(strict_types=1);
  
  use Rector\Config\RectorConfig;
  use Rector\Set\ValueObject\LevelSetList;
  use Rector\Set\ValueObject\SetList;
  
  return static function (RectorConfig $rectorConfig): void {
      $rectorConfig->paths([
          __DIR__ . '/app',
          __DIR__ . '/config',
          __DIR__ . '/database',
          __DIR__ . '/routes',
      ]);
      
      $rectorConfig->sets([
          LevelSetList::UP_TO_PHP_82,
          SetList::CODE_QUALITY,
          SetList::DEAD_CODE,
          SetList::EARLY_RETURN,
          SetList::TYPE_DECLARATION,
      ]);
  };
  ```
- [ ] Update `phpstan.neon` for higher level:
  ```yaml
  parameters:
      level: 6
      paths:
          - app
          - config
          - database
          - routes
      excludePaths:
          - app/Console/Kernel.php
          - app/Exceptions/Handler.php
          - tests
      checkMissingIterableValueType: false
      checkGenericClassInNonGenericObjectType: false
  ```
- [ ] Add Laravel-specific PHPStan extensions

#### Tests to Run:
- [ ] `vendor/bin/phpstan analyse` - Check current type issues
- [ ] `vendor/bin/rector process --dry-run` - Preview changes
- [ ] `composer test` - Ensure no regressions

---

## 🔧 Phase 4: Automated Code Modernization

### Branch: `upgrade/automated-refactoring`
**Status:** 🔄 TODO

#### Tasks:
- [ ] Run Rector automated refactoring:
  ```bash
  vendor/bin/rector process
  ```
- [ ] Review and commit changes
- [ ] Run PHPStan analysis and fix issues:
  ```bash
  vendor/bin/phpstan analyse
  ```
- [ ] Add type declarations to models:
  - [ ] `app/Models/User.php`
  - [ ] `app/Models/Expression.php`
- [ ] Update controllers with proper types:
  - [ ] Request validation types
  - [ ] Response types
  - [ ] Dependency injection types
- [ ] Add typed properties where missing

#### Tests to Run:
- [ ] `composer test` - Ensure refactoring didn't break anything
- [ ] `vendor/bin/phpstan analyse` - Check type coverage
- [ ] Manual testing of all features

---

## 🧪 Phase 5: Inertia.js v2 & Pest v3 Upgrade

### Branch: `upgrade/inertia-pest-upgrade`
**Status:** 🔄 TODO

#### Tasks:
- [ ] **Inertia.js v2 Upgrade:**
  - [ ] Update `inertiajs/inertia-laravel` to `^2.0`
  - [ ] Update `@inertiajs/react` to `^2.0`
  - [ ] Review breaking changes in Inertia.js v2
  - [ ] Update any custom Inertia middleware
  - [ ] Test all Inertia page transitions
  - [ ] Verify form handling still works
  - [ ] Check error handling and validation

- [ ] **Pest v3 Upgrade:**
  - [ ] Update `pestphp/pest` to `^3.0`
  - [ ] Update `pestphp/pest-plugin-laravel` to `^3.0`
  - [ ] Review Pest v3 breaking changes
  - [ ] Update test syntax if needed
  - [ ] Test new Pest v3 features
  - [ ] Update any custom test helpers

#### Tests to Run:
- [ ] `composer test` - Ensure Pest v3 works
- [ ] Manual testing of all Inertia.js pages
- [ ] Test form submissions and validations
- [ ] Verify error handling works correctly

---

## 🧪 Phase 6: Test Suite Enhancement

### Branch: `upgrade/test-enhancement`
**Status:** 🔄 TODO

#### Tasks:
- [ ] Update Pest configuration for v3
- [ ] Add type-aware tests
- [ ] Create tests for:
  - [ ] Model type safety
  - [ ] Controller method signatures
  - [ ] Service class types
- [ ] Add property-based testing where appropriate
- [ ] Update existing tests to use typed assertions
- [ ] Leverage new Pest v3 features:
  - [ ] Parallel testing
  - [ ] Better assertion messages
  - [ ] Improved test organization

#### Tests to Run:
- [ ] `composer test` - All tests should pass
- [ ] `vendor/bin/phpstan analyse` - No type errors in tests
- [ ] Coverage analysis

---

## ⚡ Phase 7: Performance & Security

### Branch: `upgrade/performance-security`
**Status:** 🔄 TODO

#### Tasks:
- [ ] Update all dependencies to latest versions
- [ ] Enable route caching: `php artisan route:cache`
- [ ] Enable config caching: `php artisan config:cache`
- [ ] Enable view caching: `php artisan view:cache`
- [ ] Review and update security configurations
- [ ] Add security headers middleware
- [ ] Update CORS configuration if needed

#### Tests to Run:
- [ ] Performance benchmarks
- [ ] Security scan
- [ ] Load testing
- [ ] `composer test` - Final test run

---

## 📦 Packages to Install

### Core Laravel 12 Packages:
```bash
# Already in composer.json, just update versions
laravel/framework: ^12.0
laravel/sanctum: ^4.0
laravel/tinker: ^2.9
inertiajs/inertia-laravel: ^2.0
```

### Development Tools:
```bash
# Type safety and analysis
composer require --dev rector/rector
composer require --dev phpstan/phpstan-laravel
composer require --dev spatie/laravel-type-script-transformer

# Testing and quality
composer require --dev pestphp/pest: ^3.0
composer require --dev laravel/pint: ^2.0
composer require --dev nunomaduro/collision: ^8.0

# Optional but recommended
composer require --dev barryvdh/laravel-ide-helper
composer require --dev spatie/laravel-ray
```

### Frontend (Inertia.js v2 + React):
```bash
# Update Inertia.js React package
npm install @inertiajs/react@^2.0

# Development dependencies
npm install --save-dev @types/node@^20
npm install --save-dev typescript@^5.0
npm install --save-dev @types/react@^18.0
npm install --save-dev @types/react-dom@^18.0
```

---

## 🔧 Scripts to Add

### Composer Scripts (add to composer.json):
```json
{
    "scripts": {
        "generate:routes": "php artisan route:list --json",
        "format:fix": "vendor/bin/pint",
        "analyse": "vendor/bin/phpstan analyse",
        "test": "php artisan test",
        "refactor": "vendor/bin/rector process",
        "refactor:dry-run": "vendor/bin/rector process --dry-run",
        "type-check": "vendor/bin/phpstan analyse",
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
        ],
        "upgrade:check": [
            "echo '🔍 Checking for upgrade issues...'",
            "@composer analyse",
            "@composer test",
            "echo '✅ Upgrade check completed!'"
        ]
    }
}
```

### NPM Scripts (add to package.json):
```json
{
    "scripts": {
        "build": "tsc && vite build",
        "dev": "vite",
        "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
        "type-check": "tsc --noEmit",
        "test:watch": "npm run test -- --watch",
        "prepare": "npm run lint && npm run type-check"
    }
}
```

---

## 📝 Notes About Current Prepare Script

**Current State (Laravel 10):**
- The prepare script we added earlier works with Laravel 10
- PHPStan level 2 to avoid too many false positives
- Basic type checking without advanced features

**After Laravel 12 Upgrade:**
- Can increase PHPStan level to 6-8
- Better type inference from Laravel 12
- More comprehensive type checking
- Rector can automate many type improvements

**Script Evolution:**
1. **Current (Laravel 10)**: Basic checks, level 2 PHPStan
2. **Post-upgrade (Laravel 12)**: Advanced checks, level 6+ PHPStan
3. **Future**: Add property-based testing, mutation testing

---

## 🚀 Major Upgrade Benefits

### **Inertia.js v2 Benefits:**
- ✅ **Improved Performance**: Better bundle splitting and caching
- ✅ **Enhanced TypeScript Support**: Better type inference
- ✅ **Improved Error Handling**: Better error boundaries
- ✅ **Modern React Features**: Better integration with React 18+
- ✅ **Reduced Bundle Size**: More efficient code splitting

### **Pest v3 Benefits:**
- ✅ **Parallel Testing**: Faster test execution
- ✅ **Better Assertions**: More descriptive error messages
- ✅ **Improved Organization**: Better test structure
- ✅ **Enhanced Coverage**: Better coverage reporting
- ✅ **Modern PHP Features**: Better PHP 8.2+ support

### **Laravel 12 Benefits:**
- ✅ **Better Type Support**: Native PHP 8.2+ features
- ✅ **Improved Performance**: Faster routing, caching
- ✅ **Enhanced Security**: Latest security features
- ✅ **Better Developer Experience**: Improved error messages
- ✅ **Future-Proof**: Long-term support until 2026

---

## 🚨 Rollback Plan

If anything goes wrong:
1. `git checkout main` - Return to stable branch
2. `composer install` - Restore original dependencies
3. `php artisan config:clear` - Clear cached configs
4. `php artisan route:clear` - Clear cached routes
5. `php artisan view:clear` - Clear cached views

---

## 📊 Success Metrics

- [ ] All tests pass
- [ ] PHPStan level 6+ with < 10 errors
- [ ] No breaking changes in functionality
- [ ] Performance maintained or improved
- [ ] Security scan passes
- [ ] All features work as expected

---

## 🎯 Next Steps After Upgrade

1. **Immediate:**
   - [ ] Deploy to staging environment
   - [ ] Run full test suite
   - [ ] Performance monitoring

2. **Short-term:**
   - [ ] Add more comprehensive type annotations
   - [ ] Implement property-based testing
   - [ ] Add mutation testing

3. **Long-term:**
   - [ ] Consider PHP 8.4 features when available
   - [ ] Explore advanced static analysis tools
   - [ ] Implement continuous type checking in CI/CD

---

**Last Updated:** $(date)
**Target Completion:** TBD
**Status:** 🔄 Planning Phase
