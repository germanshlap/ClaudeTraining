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

Vite + React 19, no routing, no external state management, nothing persisted (state resets on reload). `src/main.jsx` mounts `App`. Components live flat in `src/`, and `App` is the only owner of shared state:

- `App.jsx` holds the `transactions` state (seed data as plain objects `{ id, description, amount, type, category, date }`, where `type` is `"income"` or `"expense"` and `amount` is a number) and the module-level `categories` array. It passes data down as props and changes the list via `onAdd` and `onDelete` (`handleDelete`) callbacks.
- `Summary.jsx` derives total income, total expenses and balance from `transactions` on every render, using plain numeric addition.
- `TransactionForm.jsx` owns its own form field state and calls `onAdd(transaction)` on submit. It converts the amount input to a number with `parseFloat`, so `amount` must stay a number for the totals to work.
- `TransactionList.jsx` owns the type/category filter state and renders the filtered table. Each row has a Delete button that asks for confirmation with `window.confirm` and then calls `onDelete(id)`.
- `categories` is shared by the form's category dropdown and the list's category filter.

**Known bugs (intentional, part of the course):**
- Transaction #4 ("Freelance Work") is typed `"expense"` but categorized `"salary"`.

**Styling:** flat CSS in `src/App.css` and `src/index.css`. The classes `.income-amount` / `.expense-amount` / `.balance-amount` are shared by the summary cards and the transaction table.
