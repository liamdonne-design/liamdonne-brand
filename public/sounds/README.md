# 🔊 Sounds — drop your audio files here

The site's sound engine is already wired. It plays whatever files exist here;
if a file is missing it silently does nothing (no errors). Sound is **off by
default** and only starts when the visitor clicks the "sound off/on" toggle
(bottom-right) — required by browser autoplay rules.

## Files it looks for
| Filename | What it is | Notes |
|---|---|---|
| `ambient.mp3` | Ambient background loop | Loops seamlessly, volume ~30%. Keep it subtle. |
| `hover.mp3` | UI hover blip | Plays when hovering any link/button, site-wide. Very short (<300ms), volume ~45%. |

Optional later: `click.mp3` (I can wire a click sound too — just ask).

## Format & tips
- **MP3** is safest for browser support (AAC/`.m4a` also fine — tell me and I'll
  switch the paths). Keep files small: ambient a few hundred KB, hover a few KB.
- A hover blip should be **tiny and dry** (no long tail) so rapid hovers don't
  overlap messily. The engine already pools 4 instances for fast retriggers.

## ⚠️ Sourcing note
The actual Nintendo GameCube UI sounds are copyrighted. Using them on a public
portfolio is a legal risk I won't source for you. Good alternatives:
- Make your own GameCube-*flavoured* blips (safest, most "you").
- Royalty-free / CC0 retro-UI packs (Freesound, itch.io).

Whatever you put in this folder, the site will play it.
