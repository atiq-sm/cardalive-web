# CardAlive — landing page

Single-screen (no-scroll) marketing page + waitlist for **CardAlive**, the mixed-reality
engine that brings trading cards to life. Plain HTML/CSS/JS — no build step, deploys straight
to GitHub Pages.

Live: https://atiq-sm.github.io/cardalive-web/

## Layout
Logo → tagline "Bring your cards to life" → two side-by-side video placeholders
("Where we started" / "Where we are now") → Join the Waitlist button.

## Structure
```
index.html            markup
assets/css/style.css  styles (dark neon theme, fits one viewport)
assets/js/main.js      button reveal, waitlist submit, particle backdrop
assets/img/logo.png    CardAlive wordmark
assets/img/favicon.svg
.nojekyll
```

## Add the real videos
Replace each `.vid__frame` placeholder in `index.html` with a video. Easiest = YouTube embed:
```html
<div class="vid__frame">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"
          style="position:absolute;inset:0;width:100%;height:100%;border:0"
          allowfullscreen></iframe>
</div>
```
Or a hosted file: drop `started.mp4` / `now.mp4` in `assets/video/` and use
`<video class="vid__frame" src="./assets/video/started.mp4" controls poster="..."></video>`.

## Waitlist (free, no backend)
Form posts to [Web3Forms](https://web3forms.com) — free, no account, emails you each signup.
1. https://web3forms.com → enter your email → copy the **access key**.
2. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html`.
3. Commit + push. Signups land in your inbox.

## Deploy
Already on GitHub Pages (Settings → Pages → branch `master` / root). Every push to `master`
auto-redeploys.
