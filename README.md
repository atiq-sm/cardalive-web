# CardAlive — landing page

Single-screen (no-scroll) marketing page + waitlist for **CardAlive**, the mixed-reality
engine that brings trading cards to life. Plain HTML/CSS/JS — no build step, deploys straight
to GitHub Pages.

Live: https://atiq-sm.github.io/cardalive-web/

## Layout
Logo → tagline "Bring your cards to life" → two side-by-side videos
("Where we started" / "Where we are now") → Join the Waitlist button.

## Structure
```
index.html            markup
assets/css/style.css  styles (dark neon theme, fits one viewport)
assets/js/main.js      button reveal, waitlist submit, particle backdrop
assets/img/logo.png    CardAlive wordmark
assets/img/favicon.svg
assets/video/         the two demo clips + their poster frames
.nojekyll
```

## Videos
Self-hosted in `assets/video/`, played with the native `<video controls>` UI:

| File | What | Size |
|---|---|---|
| `where-we-started.mp4` | phone recording of QR detection in the Unity editor, 16s | 3.6 MB |
| `where-we-are-now.mp4` | Quest 3 passthrough, creatures summoned onto a real table, 65s | 16.6 MB |

Each has a matching `.jpg` poster frame so the page paints instantly. `preload="metadata"`
means the video body is only fetched when a visitor presses play — page load stays light
despite the file sizes.

**Encoding gotcha:** the Quest records **HEVC/h265**, which does not play in Chrome, Firefox,
or Android. Always transcode to H.264 before committing:
```
ffmpeg -i raw.mp4 -vf scale=-2:720 -c:v libx264 -profile:v high -pix_fmt yuv420p \
       -preset slow -crf 24 -c:a aac -b:a 128k -movflags +faststart out.mp4
```
`-pix_fmt yuv420p` and `-movflags +faststart` are both required: the first for browser
compatibility, the second so playback can start before the whole file arrives.

## Waitlist (free, no backend)
Form posts to [Web3Forms](https://web3forms.com) — free, no account, emails you each signup.
1. https://web3forms.com → enter your email → copy the **access key**.
2. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html`.
3. Commit + push. Signups land in your inbox.

## Deploy
Already on GitHub Pages (Settings → Pages → branch `master` / root). Every push to `master`
auto-redeploys.
