// Mobile Navigation JavaScript
// Goal: make mobile header consistent across pages.
// Supports two navbar patterns:
//  - Pattern A (existing): .nav-hamburger + #navDrawer
//  - Pattern B (missing): inject hamburger + fullscreen drawer into the first <nav> when needed

(function () {
  function closeMenu(hamburger, drawer) {
    if (hamburger) hamburger.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
    if (drawer) drawer.classList.add('closed');
    document.body.style.overflow = '';

    // reset display after animation
    if (drawer) {
      setTimeout(function () {
        drawer.style.display = 'none';
        drawer.classList.remove('closed');
      }, 250);
    }
  }

  function openMenu(hamburger, drawer) {
    if (hamburger) hamburger.classList.add('open');
    if (drawer) {
      drawer.style.display = 'flex';
      drawer.classList.remove('closed');
      drawer.classList.add('open');
    }
    document.body.style.overflow = 'hidden';
  }

  function toggleMenu(hamburger, drawer) {
    if (!drawer) return;
    if (drawer.classList.contains('open')) closeMenu(hamburger, drawer);
    else openMenu(hamburger, drawer);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Pattern A
    var hamburgerA = document.getElementById('hamburger');
    var drawerA = document.getElementById('navDrawer');
    if (hamburgerA && drawerA) {
      hamburgerA.addEventListener('click', function () {
        toggleMenu(hamburgerA, drawerA);
      });
      drawerA.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          closeMenu(hamburgerA, drawerA);
        });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu(hamburgerA, drawerA);
      });

      document.addEventListener('click', function (e) {
        // close when clicking outside drawer
        if (!drawerA.contains(e.target) && !hamburgerA.contains(e.target)) {
          closeMenu(hamburgerA, drawerA);
        }
      });
      return;
    }

    // Pattern A also for class-based names if present
    var hamburgerB = document.querySelector('.nav-hamburger');
    var drawerB = document.querySelector('.nav-drawer');
    if (hamburgerB && drawerB) {
      hamburgerB.addEventListener('click', function () {
        toggleMenu(hamburgerB, drawerB);
      });
      drawerB.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          closeMenu(hamburgerB, drawerB);
        });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu(hamburgerB, drawerB);
      });
      document.addEventListener('click', function (e) {
        if (!drawerB.contains(e.target) && !hamburgerB.contains(e.target)) {
          closeMenu(hamburgerB, drawerB);
        }
      });
      return;
    }

    // Pattern B: inject for pages where <nav> has only <ul> and no hamburger/drawer
    var nav = document.querySelector('nav');
    if (!nav) return;

    // If already has injected drawer, don't do again
    if (document.getElementById('mobileInjectedDrawer')) return;

    // If page already has some drawer markup, don't inject
    if (nav.querySelector('.nav-drawer') || nav.querySelector('#navDrawer')) return;
    if (nav.querySelector('.nav-hamburger') || nav.querySelector('#hamburger')) return;


    // Collect existing links from nav ul (if present)
    var navLinks = [];
    var ul = nav.querySelector('ul');
    if (ul) {
      ul.querySelectorAll('a').forEach(function (a) {
        var text = (a.textContent || '').trim();
        var href = a.getAttribute('href');
        if (href) navLinks.push({ text: text, href: href });
      });
    }

    // Fallback links if <ul> missing
    if (!navLinks.length) {
      navLinks = [
        { text: 'Services', href: 'service.html' },
        { text: 'About', href: 'about.html' },
        { text: 'Contact', href: 'contact.html' },
        { text: 'Book Test', href: 'schedule%20your%20payment.html' }
      ];
    }

    // Create hamburger button (LEFT)
    var hamburger = document.createElement('button');
    hamburger.type = 'button';
    hamburger.id = 'mobileInjectedHamburger';
    hamburger.className = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.setAttribute('aria-controls', 'mobileInjectedDrawer');
    hamburger.style.zIndex = '1001';

    hamburger.innerHTML = '<span></span><span></span><span></span>';

    // Create fullscreen drawer
    var drawer = document.createElement('div');
    drawer.id = 'mobileInjectedDrawer';
    drawer.className = 'nav-drawer';

    var itemsHtml = '';
    navLinks.forEach(function (item) {
      // Use About/Contact/Services casing from requirement
      var label = item.text;
      if (!label) return;
      var isBook = label.toLowerCase().includes('book');

      if (isBook) {
        itemsHtml += '<a href="' + item.href + '" class="cta-btn">Book Test</a>';
      } else {
        // Normalize common labels
        if (label.toLowerCase().includes('service')) label = 'Services';
        if (label.toLowerCase().includes('about')) label = 'About';
        if (label.toLowerCase().includes('contact')) label = 'Contact';

        itemsHtml += '<a href="' + item.href + '">' + label + '</a>';
      }
    });

    drawer.innerHTML = itemsHtml;

    // Insert hamburger on LEFT of nav container if possible
    // Try: nav .nav-container exists? else insert before nav ul
    var container = nav.querySelector('.nav-container') || nav;
    container.style.position = container.style.position || 'relative';
    container.insertBefore(hamburger, container.firstChild);

    // Append drawer to body (for fixed positioning)
    document.body.appendChild(drawer);

    // Initialize drawer hidden
    drawer.style.display = 'none';
    drawer.classList.remove('open');

    // Wire events
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu(hamburger, drawer);
    });

    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeMenu(hamburger, drawer);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu(hamburger, drawer);
    });

    document.addEventListener('click', function (e) {
      if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu(hamburger, drawer);
      }
    });
  });
})();

