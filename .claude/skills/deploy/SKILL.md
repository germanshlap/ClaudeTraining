---
name: deploy
description: Deploy the app to staging. Runs all tests, builds the production bundle, then pushes to the staging branch. Use when the user asks to deploy or push to staging.
disable-model-invocation: true
allowed-tools: Bash(npm run *), Bash(npm test*), Bash(git status*), Bash(git branch*), Bash(git push*), Bash(git log*)
---

# Deploy to staging

Run the steps below in order. Stop at the first failure, show the relevant output, and do not continue to later steps.

## 1. Pre-flight

- Run `git status --short` and `git branch --show-current`.
- If there are uncommitted changes, tell the user and ask whether to continue. Only the committed state gets deployed.

## 2. Run all tests

- If `package.json` has a `test` script, run `npm test`.
- If there is no `test` script (the case at the time this skill was written), say so explicitly, then run `npm run lint` as the minimum quality gate. Never report this as "tests passed".
- Any failure aborts the deploy.

## 3. Build the production bundle

- Run `npm run build`.
- Confirm it succeeded and that `dist/` was produced. A build failure aborts the deploy.

## 4. Push to staging

- Push the current HEAD to the `staging` branch on `origin`: `git push origin HEAD:staging`.
- Never use `--force`. If the push is rejected as non-fast-forward, stop and report it; let the user decide.
- Never push to `main` or any production branch from this skill.

## 5. Report

Summarize each step as passed, failed or skipped (state the lint-instead-of-tests fallback if it applied), plus the commit SHA that was pushed to staging.
