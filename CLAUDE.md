# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context

Starter project for a Claude Code course. Per the README, it intentionally ships with a bug, poor UI and messy code that get fixed step by step during the course — so treat the defects below as known work items, not surprises.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run lint      # run ESLint
npm run preview   # preview production build
```

There is no test runner configured, so there are no tests to run.

## Architecture

Vite + React 19, no routing, no external state management, nothing persisted (state resets on reload). `src/main.jsx` mounts `App`; all app logic lives in a single component, `src/App.jsx`:

- `transactions` state holds seed data as plain objects `{ id, description, amount, type, category, date }`, where `type` is `"income"` or `"expense"`.
- Total income, total expenses and balance are derived from `transactions` on every render.
- Form field state (`description`, `amount`, `type`, `category`) and filter state (`filterType`, `filterCategory`) all live in `App` too.
- The `categories` array is shared by the add-form dropdown and the category filter.

**Known bugs (intentional, part of the course):**
- `amount` is a string — in the seed data and in new transactions (taken straight from the input) — so the totals' `reduce` concatenates strings instead of adding numbers. Fix by converting to a number when creating a transaction and/or at calculation time (the seed data is strings too).
- Transaction #4 ("Freelance Work") is typed `"expense"` but categorized `"salary"`.

**Styling:** flat CSS in `src/App.css` and `src/index.css`. The classes `.income-amount` / `.expense-amount` / `.balance-amount` are shared by the summary cards and the transaction table.
