# Floppy Bird: Super Powers

A Flappy-style bird game with super powers, in **one HTML file**. 14-level campaign where every level is a different place with a new mechanic, a 3-star system, unlockable skins, an Endless mode, and a seeded Daily Flight that is the same sky for everyone that day.

**Play it:** https://generativecreations.github.io/floppy-bird/

## Controls

| Key | Action |
| --- | --- |
| SPACE / click / ↑ | flop |
| **J** | Flamingo dash — 2.6× speed, flies level, double points. ↑ / ↓ steer while dashing |
| **K** | Ghost — phase through pipes for 2 seconds. The ground still counts |
| R | retry · ESC back |

Touch: tap to flop, two-finger tap = dash, three-finger tap = ghost.

## Levels

| # | Sky | Mechanic |
| - | --- | --- |
| 1 | Nesting Grounds | learn to flop, grab coins |
| 2 | Flamingo Lagoon | J unlocks the dash |
| 3 | Haunted Hollow | K unlocks the ghost · thick pipes |
| 4 | Restless Reeds | drifting gaps |
| 5 | Windy Peaks | gusts, with a warning |
| 6 | Coin Canyon | coin rush |
| 7 | Narrow Straits | tight gaps |
| 8 | Night Flight | darkness |
| 9 | Hailstorm | falling hail |
| 10 | Upside Downs | gravity-flip zones |
| 11 | Turbo Tunnels | faster with every pipe |
| 12 | Phantom Rows | shimmering pipes are fake |
| 13 | Chaos Sky | five mechanics at once |
| 14 | The Long Migration | 60 pipes, everything |

Stars: ★ clear · ★★ 80% of coins · ★★★ no powers used (or all coins on levels without powers). 42 stars unlock 6 skins.

## Privacy

No accounts, no analytics, no network requests. Progress is saved in your own browser's localStorage and never leaves it.

## Run it yourself

Open `index.html` in a browser. That's it.

For a hardened self-hosted server (whitelists the page and a health check, sets security headers, zero dependencies):

```bash
node server.js   # http://localhost:3000
```

`railway.json` is included if you prefer Railway.

## License

MIT
