## Bug Report Log

### Bug-001: "Give me more (5)" repeats the same five questions
- **Status**: Open
- **Severity**: High (affects replayability)
- **Area**: Frontend game flow, expressions fetching

- **Steps to Reproduce**:
  - Start a game and answer all 5 questions to reach the score view.
  - Click the button: "Give me more (5)".
  - Observe the next round loads the same 5 expressions.

- **Expected**: A fresh set of 5 random validated expressions for the same mode should be fetched and shown.
- **Actual**: The previous 5 expressions are reused.

- **Notes / Suspected Cause**:
  - The button handler currently calls `resetGame`, which resets in-memory state but does not re-fetch expressions.
  - `useExpressions(gameMode, numberOfExpressions)` executes on mount and when its dependencies change. Clicking the button does not change those dependencies, so no new fetch occurs.

  Code references:

```1:89:resources/js/Components/Score.tsx
// ... existing code ...
<button onClick={resetGame} className="bg-[#60AC90] ...">
  {score_page.give_me_more} ({numberOfExpressions})
</button>
// ... existing code ...
```

```1:23:resources/js/hooks/useExpressions.ts
// ... existing code ...
useEffect(() => {
  const fetchExpressions = async () => {
    const response = await axios.get<Expression[]>(`/random-expressions?mode=${gameMode}&numberOfExpressions=${numberOfExpressions}`);
    setExpressions(response.data);
  };
  fetchExpressions();
}, [gameMode, numberOfExpressions, setExpressions]);
// ... existing code ...
```

- **Proposed Fix Options** (any one):
  - Add a `refreshCounter` in `gameStore` and include it in the `useExpressions` dependency array. Increment it when clicking "Give me more (5)" so the effect re-fetches.
  - Create a `giveMeMore()` action that triggers a new fetch via `fetchExpressions(gameMode, numberOfExpressions)` and updates `setExpressions`, then resets game progress.
  - Force remount of the `Game` page by toggling a key in state, which will re-run the `useExpressions` effect.

- **Acceptance Criteria**:
  - Clicking "Give me more (5)" re-fetches a new set of expressions without page reload.
  - The newly loaded set differs from the immediately prior set in most cases (true randomness may occasionally repeat, which is acceptable).

- **Debug Plan**:
  - Add temporary logging around the button click to confirm the handler executed and which action runs.
  - Log `expressions` length and a hash of IDs before and after click.
  - Verify if `/random-expressions` is called again (Network tab or backend logs).
  - Confirm backend endpoint returns different records for multiple calls.
  - If backend is fine, verify `useExpressions` dependencies and whether state resets trigger a fetch.

- **Test Plan**:
  - Unit: mock `axios.get` in `useExpressions` and verify call count increments when the trigger state changes after clicking "Give me more (5)".
  - E2E: Playwright script to finish 5 Qs, capture the text/IDs of questions, click "Give me more (5)", then assert the new set is not identical to the previous set.

---

### Bug-002: Admin access not granted for `martarc88@gmail.com`
- **Status**: Open
- **Severity**: Medium (blocks admin functionality for a listed user)
- **Area**: Auth configuration and admin check

- **Reported Config**:
  - `.env`: `ADMIN_EMAIL=adam.honvedo@gmail.com,martarc88@gmail.com`

- **Expected**: Both emails should be recognized as admins and allowed to access routes under `/admin/*`.
- **Actual**: `martarc88@gmail.com` does not have admin access.

- **Notes / Suspected Cause**:
  - Admin list source:
    - `config/auth.php` provides `auth.admin_emails` from `ADMIN_EMAILS`, falling back to `ADMIN_EMAIL` (comma-separated allowed):

```113:127:config/auth.php
// ... existing code ...
'admin_email' => env('ADMIN_EMAIL', 'admin@example.com'),
'admin_emails' => array_filter(array_map('trim', explode(',', env('ADMIN_EMAILS', env('ADMIN_EMAIL', 'admin@example.com'))))),
// ... existing code ...
```

  - The check in `User` is a strict, case-sensitive comparison against `auth.admin_emails`:

```49:54:app/Models/User.php
public function isAdmin()
{
    $emails = config('auth.admin_emails', []);
    return in_array($this->email, $emails, true);
}
```

  - Potential issues:
    - Case sensitivity or stray whitespace in the stored user email can cause mismatch.
    - Config cache not refreshed after changing `.env`.
    - The environment may intend to use `ADMIN_EMAILS` for multiple addresses; although fallback supports comma-separated `ADMIN_EMAIL`, using `ADMIN_EMAILS` is clearer.

- **Diagnostics to Run**:
  - In production shell or tinker, verify: `config('auth.admin_emails')` includes both emails.
  - Confirm the user's `users.email` is exactly `martarc88@gmail.com` in lowercase.
  - Clear caches after `.env` changes: `php artisan config:clear && php artisan cache:clear`.

- **Proposed Fix**:
  - Make the admin email comparison case-insensitive and include the singular `auth.admin_email` as a fallback:

```php
// app/Models/User.php
public function isAdmin()
{
    $list = array_map('strtolower', config('auth.admin_emails', []));
    $single = strtolower((string) config('auth.admin_email'));
    if ($single) {
        $list[] = $single;
    }
    $list = array_unique(array_filter($list));
    return in_array(strtolower((string) $this->email), $list, true);
}
```

  - Standardize on `ADMIN_EMAILS` in `.env` for multiple addresses (comma-separated).

- **Acceptance Criteria**:
  - Both `adam.honvedo@gmail.com` and `martarc88@gmail.com` can access admin routes after cache clear.
  - Unit test verifies case-insensitive match and multiple admins work via `ADMIN_EMAILS`.

- **Debug Plan**:
  - Check `php artisan tinker`: `config('auth.admin_emails')` and verify it contains both emails post-deploy.
  - Query DB for the exact stored email of the user; ensure lowercase and no whitespace.
  - Run `php artisan config:clear && php artisan cache:clear` on the affected environment.
  - Inspect server env to ensure `ADMIN_EMAILS` (or `ADMIN_EMAIL`) is set and visible to PHP-FPM.

- **Test Plan**:
  - Unit: Add tests to `UserAdminTest` to cover multiple admin emails and case-insensitive match.
  - Feature: Add a test ensuring middleware allows both configured emails and blocks others when using `ADMIN_EMAILS`.

---

### Owners
- Bug-001: Frontend
- Bug-002: Backend/Auth

### Next Actions
- Implement chosen approach for Bug-001 and add E2E test to ensure refetch occurs on "Give me more (5)".
- Update `User::isAdmin()` as proposed, clear caches, and add tests for multiple/case-insensitive admin emails.


