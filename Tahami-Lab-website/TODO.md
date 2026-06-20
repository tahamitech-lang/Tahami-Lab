# TODO - Mobile Navbar Fix

## Plan
1. Fix root cause: `mobile-nav.js`/`mobile-nav.css` currently expects elements with classes `.hamburger-menu` and `.mobile-nav-menu`, but many pages use a different navbar structure (no hamburger, different classes/IDs). Also, several pages don’t include a drawer element.
2. Unify navigation markup for mobile across pages by adding the required hamburger + drawer markup (or by adapting `mobile-nav.js/css` to also work with existing `#mainNav` + `.nav-hamburger` + `#navDrawer` pattern).
3. Update `mobile-nav.css` + `mobile-nav.js` to support BOTH patterns:
   - Pattern A (already present in `index.html`/`service.html`/`advancetech.html`): `#hamburger`, `#navDrawer`, `.nav-hamburger`, `.nav-drawer`.
   - Pattern B (current in failing pages like `womenheath.html`, `basiccheckup.html`, `healthcheckup.html`): nav uses only `<ul>`; add hamburger + drawer via script OR ensure `mobile-nav.js` can inject them.
4. Inject hamburger + drawer automatically on pages that have `<nav>` with `<ul>` but missing hamburger/drawer. Links inside the existing `<ul>` will be reused for Service/About/Contact and Book Test.
5. Ensure hamburger is on LEFT in mobile and drawer lists Service/About/Contact + Book Test.
6. After code changes, verify on mobile for: `womenheath.html`, `basiccheckup.html`, `healthcheckup.html`, and confirm existing pages still work.

## Steps
- [x] Step 1: Update `mobile-nav.js` to inject missing hamburger/drawer when elements aren’t found.
- [x] Step 2: Update `mobile-nav.css` to style injected hamburger (left) and drawer fullscreen.
- [x] Step 3: Ensure closing works on link click and outside click.

- [ ] Step 4: Quick regression check on `index.html`/`service.html`/`advancetech.html`.


