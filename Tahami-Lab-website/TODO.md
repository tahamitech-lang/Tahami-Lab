# TODO (Tahami Lab Website)

## Navbar mobile unification
- [x] Fix `about.html` navbar to match `index.html` mobile header:
  - [x] Replace current `<nav>` markup with `index.html`’s `nav#mainNav` + `.nav-container` + `.logo` + hamburger `#hamburger`. 
  - [x] Add `div#navDrawer.nav-drawer` drawer markup.
  - [x] Ensure `loader-nav.js` and `mobile-nav.js` are included.
- [ ] Apply the same navbar update to:
  - [ ] advancetech.html
  - [ ] affordablepricing.html
  - [ ] basiccheckup.html
  - [ ] contact.html
  - [ ] expertteam.html
  - [ ] fastresult.html
  - [ ] healthcheckup.html
  - [ ] homecollection.html
  - [ ] service.html
  - [ ] womenheath.html
- [ ] Verify mobile behavior on each page (logo left + hamburger right + drawer links).
- [ ] If any spacing/height mismatch: adjust shared CSS (`mobile-nav.css`, `mobile-responsive.css`) rather than per-page.

