# CardAlive — landing page

Static marketing site + waitlist for **CardAlive**, the mixed-reality engine that brings
trading cards to life. Plain HTML/CSS/JS — no build step, deploys straight to GitHub Pages.

## Structure
```
index.html            markup
assets/css/style.css  styles (dark neon TCG theme)
assets/js/main.js     interactions (reveal, tilt, particles, waitlist submit)
assets/img/           card art + favicon
.nojekyll             tell GitHub Pages to serve files as-is
```

## Run locally
Any static server:
```bash
python -m http.server 8000
# open http://localhost:8000
```

## Waitlist setup (free, no backend)
The form posts to [Web3Forms](https://web3forms.com) — free, no account, emails you each signup.

1. Go to https://web3forms.com, enter your email, copy the **access key**.
2. In `index.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with it.
3. Commit + push. Done — signups land in your inbox.

Until the key is set, the form validates the email and shows a "not wired yet" notice
instead of failing silently.

## Deploy to GitHub Pages
1. Push this folder to a GitHub repo (e.g. `cardalive-web`).
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/root`**.
3. Live at `https://<username>.github.io/cardalive-web/`.
