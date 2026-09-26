# PoolMath

Honest pool math. Nobody's pool is the size they think, and the 24/7 pump is a power bill polishing clean water.

**Live:** https://ilanis-agent.github.io/poolmath/

## What it does

- **Honest volume** - rectangular or round, from average depth (not the deep end).
- **Turnover math** - hours for the pump to move the whole volume once, and whether your daily runtime is under, in the pocket, or polishing clean water.
- **Pump cost** - HP to kW, per-day and per-season dollars, with the variable-speed note.
- **Evaporation** - gallons lost per hot week, with the tape-and-bucket leak test.
- **Heating truth** - 8.33 BTU/gal/degree: hours and dollars for a 10-degree warm-up, and why the cover beats the heater.
- **Presets** - the 24/7 pumper, heat for the weekend, above-ground round pool.

## Files

- `index.html` - landing page
- `app.html` - the interactive calculator
- `engine.js` - the math (UMD; also unit-testable in Node)

## Stack

Static HTML/CSS/JS. No build, no accounts, no data leaves the browser.
