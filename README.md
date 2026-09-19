# Brewluru

Bangalore (Bengaluru) cafe guide — specialty coffee & independents — built with **Expo** + **Expo Router**. Works on **web** and **mobile**.

## Quick start

```bash
cd /workspace/brewluru
npm install
npx expo start
```

Then:

- Press `w` for web, or run `npx expo start --web`
- Scan the QR code with Expo Go (iOS/Android), or press `a` / `i` for emulators

Other scripts:

```bash
npm run web      # expo start --web
npm run android
npm run ios
```

## What’s included

- **Explore** — searchable list of all **48** cafes with filters for neighborhood, curated tags, wifi=yes, charging=yes, price band, and a work-friendly toggle
- **Areas** — browse / group by neighborhood
- **Work** — preset where wifi **or** charging is `yes`
- **Cafe detail** — full fields from the dataset (amenities, menu, beans, sourcing, confidence notes, sources, Maps & website links)

Data lives at `assets/data/cafes.json` and is imported in-app via `data/cafes.ts`.

## Data caveats

- Wifi / charging / prices / hours **change often**. Values of `unknown` are intentional — nothing was invented.
- This is a **curated** set (not a full city directory). Coverage is thinner outside core specialty corridors.
- `lat` / `lng` are currently unset; use each cafe’s `mapsUrl` for navigation.
- Research snapshot: **19 Sep 2026 (Asia/Calcutta)**. Re-verify before relying on amenities.

Source research notes: `/workspace/bangalore-cafes/README.md` and `summary.md`.

## Stack

- Expo SDK ~57, Expo Router, React Native / React Native Web
- TypeScript
- Lean dependencies (no extra UI kits)

## Typecheck

```bash
npx tsc --noEmit
```
