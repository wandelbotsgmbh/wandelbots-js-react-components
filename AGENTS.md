# Agent instructions

This file tells the agent how to build, test, debug and submit changes in this
repository. Commands map to the scripts in `package.json` — prefer those over
ad‑hoc invocations. If you have questions or unclear goals, always ask back.

Not every feature needs a note in this file. Note a feature here only when an
agent would get something wrong without the note and cannot see it quickly in
the code. A small feature is explained by its code, its comments and its tests.

## The library

`@wandelbots/wandelbots-js-react-components` (7.x): the robotics UI parts of
NOVA apps (jogging, the 3D view of a robot, the safety state) and the logic
that connects them to a NOVA instance. What it contains, its entry points and
the migration from 6.x are in [README.md](README.md).

- React, MUI, Emotion, the design system (`@wandelbots/mui`) and MobX stay peer
  dependencies; three.js, React Three Fiber and drei stay optional peers. Never
  make one of them a normal dependency: the app and the library must use the
  same copy.
- No own theme and no own low-level parts (buttons, text fields, cards). Use
  the theme of the app, the parts of `@wandelbots/mui`, the tokens of
  `@wandelbots/design-tokens` and the icons of `@wandelbots/icons`.
- `@wandelbots/nova-js` stays a normal dependency with an exact version. The
  library connects with its own client: a public function takes a
  `NovaConnection` (`src/lib/novaConnection.ts`), never the `Nova` class, and
  the library's client stays out of the public API (`@internal`).
- The public API is the entry points `.`, `/core`, `/3d` and `/SafetyBar`
  (`scripts/entry-points.ts`), recorded in `etc/api-extractor/*.api.md`.

## NOVA instances

The playground and the e2e tests run against a real NOVA instance. There is no
mock mode.

- **The instance:** `NOVA_INSTANCE_URL` (and `NOVA_ACCESS_TOKEN` for a cloud
  instance), or `WANDELAPI_BASE_URL` in `.env.local`. `pnpm run td` reserves a
  new test instance and writes `.env.local` and `kubeconfig.yml` (see "A NOVA
  instance" in [README.md](README.md#a-nova-instance)). It takes a few
  minutes: wait for it to finish.
- **Debugging an instance:** with `kubeconfig.yml`, `kubectl --kubeconfig
  kubeconfig.yml` shows the services and their logs. Only read with it.
- **Shared instances:** other people can use the same instance. Change or
  delete only the robots, collision setups and cells that you created, and
  delete them after your check.
- **api spec:** `<instance>/api/v2/ui/public.openapi.yaml`. The websockets and
  NATS: `<instance>/api/v2/async/asyncapi.yaml`.

## Check a change

- **Playground:** `pnpm run playground` (http://localhost:5180) shows the parts
  on the NOVA instance from above, with the library from `src/`. Its pages and
  URL parameters are in "Playground" in [README.md](README.md#playground). The
  dev server uses React StrictMode: a part that leaves a websocket open shows
  up there.
- Every public part is on at least one page of the playground. Add a new part
  to a page.
- **e2e tests:** `pnpm run test:e2e` (vitest, the NOVA connections) and
  `pnpm run test:playground` (Playwright on the built playground). How they
  work and where the results are: "e2e Tests" in
  [README.md](README.md#e2e-tests).
- Never upload or publish Playwright traces or `playground/dist`: both contain
  the access token. Keep traces, videos and the HTML report off in
  `playwright.config.ts`.

### Playwright tests

- Use the helpers of `e2e/playground/helpers.ts`: `openPage` (opens a page with
  the robot in its start pose), `expectModelDrawn`, `jogPress` and
  `screenshot`.
- Wait for conditions (`expect.poll`, `toPass`, the assertions of a locator),
  never for fixed times.
- The CI runner is 2.5 to 4 times slower than a laptop (software WebGL, a cloud
  instance). Give each wait the time that the runner needs.
- After a change of a virtual robot (a safety zone, a TCP), ask for the
  controller state, not only for the description: the robot connects again
  only then.
- Run a new test 2 times in CI before the merge.

## Workflow

Development follows a red/green TDD cycle: first write a test that fails (red),
then write the minimal code to make it pass (green), then refactor while keeping
it green. Always confirm the test actually fails for the right reason before
implementing, so you know the test is meaningful.

A test written for the red step is committed only if it can fail for a reason
other than a deliberate change: behavior, a rule that is easy to get wrong, or a
bug whose cause can return. A test that only repeats a literal value from the
code — a padding, a color — is deleted after green; verify such a change in the
playground instead.

### Feature

- Add a failing test for the new functionality (red), then implement until it
  passes (green). This gives a clear definition of "done" and keeps the code
  tested.
- If the feature is not trivial, check it in the playground.

### Bugfix

- Add a test that reproduces the bug (red), then implement the fix until it
  passes (green). This confirms the fix and guards against regression.
- If the bug is not trivial, check the fix in the playground.

### Review

- only do a review when asked for it.
- when you are asked to do a review, focus on these points:
    - does the feature/fix do what it is supposed to do? does it meet the requirements? could there be problems or edge cases that are not covered?
    - are there logical errors? never trust the code to be correct just because it compiles and passes tests. Always check the logic.
    - is the code readable and maintainable? are there any obvious code smells or anti-patterns? If you find yourself thinking "I don't understand this" or "this is too complicated", it is likely that the code is not clear enough. Ask for clarification or suggest a refactor.
    - is the code tested? are there enough tests? are tests needed? are they meaningful? If a function or a branch is not covered by tests, ask for a test to be added.
    - are there big files? Keep files small and focused: a file takes care of one thing. Suggest splitting a file that is too big or does too many things.
    - is the amount of changes in relation to the task/feature/fix?
    - does the public API change? Is the change intended, are the reports in `etc/api-extractor/` updated, and does a breaking change have a `BREAKING CHANGE:` footer?
    - do the library rules still hold (see "The library": peer dependencies, no own theme, the library's own NOVA client)?
- give an opinion on the code and the changes and how you would proceed.
- when you found problems in the code, try to verify them (with a test, or in the playground)
    - if you can reproduce the problem, try to find the root cause and suggest a fix
    - if you cannot reproduce the problem, try to find out why and suggest a fix

## Submit changes for review

Before submitting, make sure the code is formatted, linted, typechecks and
tests pass. Fix all errors and warnings before considering the work complete.

- `pnpm run format` — format with Biome
- `pnpm run lint` — lint with Biome (fails on warnings)
- `pnpm run tsc` — typecheck of `src`, `e2e` and `playground` (no emit)
- `pnpm run test:unit:run` — unit tests (vitest)
- `pnpm run build && pnpm run api:check` — when the public API changed. After
  an intended change, `pnpm run api:update`, and commit
  `etc/api-extractor/*.api.md` with the change.
- `pnpm run test:consumer` — when `package.json`, the entry points or the
  build changed
- `pnpm run test:e2e` and `pnpm run test:playground` — when the change touches
  the NOVA connections or a part of the playground (they need an instance)

## Commits

- Commit messages and pull request titles follow Conventional Commits
  (`feat:`, `fix:`, `chore:`, …). semantic-release makes the version from them:
  `feat` a minor version, `fix` a patch, `chore` no release. A dependency
  update that apps need now (for example nova-js) gets the type `fix(deps)`.
- A breaking change needs a `BREAKING CHANGE:` footer in the commit message,
  also in the message of a squash merge. A `!` after the type alone does not
  make a major version (angular preset of semantic-release).

## Labeling posted comments as AI

Anything you post on GitHub (PR comments, review replies, issue comments) goes
out under the user's account. Start every such comment with a line naming the
agent and model that wrote it, e.g.
`*AI-generated reply (GitHub Copilot, Claude Opus 5.5)*`, using the model you
are actually running as.
