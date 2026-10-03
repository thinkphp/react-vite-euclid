# Euclid

An interactive greatest common divisor (GCD) calculator that demonstrates
Euclid’s algorithm one remainder at a time.

Enter two integers to calculate their GCD and see each division step. Use the
example button to try the calculation with `252` and `105`.

## Features

- Calculates the GCD of positive, negative, and zero-valued integers.
- Shows the sequence of divisions and remainders used to find the result.
- Handles invalid input and the undefined `GCD(0, 0)` case.
- Responsive layout with keyboard-accessible controls.

## Getting started

You’ll need Node.js and npm installed.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite to use the app.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Build the app for production in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

## How the algorithm works

For two integers `a` and `b`, repeatedly divide `a` by `b` and replace the
pair with `b` and the remainder. When the remainder is zero, the last
non-zero divisor is the GCD. The app uses absolute values, so negative inputs
are supported.

## Built with

- React
- Vite
