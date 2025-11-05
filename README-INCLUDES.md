# Common Header and Footer Setup

This website uses common header and footer files that are loaded dynamically.

## File Structure
```
project/
├── includes/
│   ├── header.html    (Common header with navigation)
│   └── footer.html    (Common footer with links and scripts)
├── assets/
│   └── js/
│       └── load-includes.js  (Loader script)
└── *.html  (All HTML pages)

```

## How It Works

1. Each HTML page has placeholder divs:
   - `<div id="header-placeholder"></div>` - Where header will be inserted
   - `<div id="footer-placeholder"></div>` - Where footer will be inserted

2. The `load-includes.js` script automatically loads the header and footer from `includes/` folder

3. To update header/footer, just edit the files in `includes/` folder and changes will appear on all pages

## Important: Running the Website

**You must run the website through a web server** - opening HTML files directly (file://) won't work due to browser security restrictions.

### Quick Start Options:

#### Option 1: Python (if installed)
```bash
cd project
python -m http.server 8000
```
Then open: `http://localhost:8000/index.html`

#### Option 2: Node.js (if installed)
```bash
cd project
npx http-server -p 8000
```
Then open: `http://localhost:8000/index.html`

#### Option 3: PHP (if installed)
```bash
cd project
php -S localhost:8000
```
Then open: `http://localhost:8000/index.html`

#### Option 4: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html` → "Open with Live Server"

## Troubleshooting

If header/footer are not showing:

1. **Check browser console** (F12) for errors
2. **Verify you're using a web server** (not file:// protocol)
3. **Check that files exist**:
   - `includes/header.html`
   - `includes/footer.html`
   - `assets/js/load-includes.js`
4. **Verify placeholder divs exist** in your HTML files:
   - `#header-placeholder`
   - `#footer-placeholder`

## Updating Header/Footer

Simply edit:
- `includes/header.html` - to update header/navigation
- `includes/footer.html` - to update footer/contact info

Changes will appear on all pages that use these includes.


