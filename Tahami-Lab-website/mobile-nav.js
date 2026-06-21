// Mobile Navigation JavaScript
// Goal: make mobile header consistent across pages.
// Supports two navbar patterns:
//  - Pattern A (existing): .nav-hamburger + #navDrawer
//  - Pattern B (missing): inject hamburger + fullscreen drawer into the first <nav> when needed

(function () {
  function cloneButton(button) {
    if (!button) return button;
    var clone = button.cloneNode(true);
    clone.id = button.id;
    clone.className = button.className;
    clone.type = button.type || 'button';
    clone.setAttribute('aria-label', button.getAttribute('aria-label') || 'Toggle menu');
    clone.setAttribute('aria-controls', button.getAttribute('aria-controls') || 'navDrawer');
    clone.onclick = null;
    clone.onmouseover = null;
    clone.onmouseout = null;
    clone.onmousedown = null;
    clone.onmouseup = null;
    clone.removeAttribute('onclick');
    button.parentNode.replaceChild(clone, button);
    return clone;
  }

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
    // Pattern A: existing button + drawer markup
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
        if (!drawerA.contains(e.target) && !hamburgerA.contains(e.target)) {
          closeMenu(hamburgerA, drawerA);
        }
      });
      return;
    }

    // Pattern B: existing button or drawer markup but not both, or generic nav injection
    var nav = document.querySelector('nav');
    if (!nav) return;

    var container = nav.querySelector('.nav-container');
    if (container) {
      container.style.position = container.style.position || 'relative';
    }

    var existingHamburger = nav.querySelector('#hamburger') || nav.querySelector('.nav-hamburger');
    var existingDrawer = document.getElementById('navDrawer') || document.querySelector('.nav-drawer');

    if (existingHamburger) {
      existingHamburger = cloneButton(existingHamburger);
    }

    // If there is a button and a drawer somewhere else on page, wire them
    if (existingHamburger && existingDrawer) {
      existingHamburger.addEventListener('click', function () {
        toggleMenu(existingHamburger, existingDrawer);
      });
      existingDrawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          closeMenu(existingHamburger, existingDrawer);
        });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu(existingHamburger, existingDrawer);
      });
      document.addEventListener('click', function (e) {
        if (!existingDrawer.contains(e.target) && !existingHamburger.contains(e.target)) {
          closeMenu(existingHamburger, existingDrawer);
        }
      });
      return;
    }

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

    if (!navLinks.length) {
      navLinks = [
        { text: 'Services', href: 'service.html' },
        { text: 'About', href: 'about.html' },
        { text: 'Contact', href: 'contact.html' },
        { text: 'Book Test', href: 'schedule%20your%20payment.html' }
      ];
    }

    // Reuse existing button when available, otherwise inject a new one.
    var hamburger = existingHamburger;
    if (!hamburger) {
      hamburger = document.createElement('button');
      hamburger.type = 'button';
      hamburger.id = 'mobileInjectedHamburger';
      hamburger.className = 'nav-hamburger';
      hamburger.setAttribute('aria-label', 'Toggle menu');
      hamburger.setAttribute('aria-controls', 'mobileInjectedDrawer');
      hamburger.style.zIndex = '1001';
      hamburger.innerHTML = '<span></span><span></span><span></span>';
      var container = nav.querySelector('.nav-container') || nav;
      container.style.position = container.style.position || 'relative';
      container.insertBefore(hamburger, container.firstChild);
    }

    // Reuse existing drawer when available, otherwise inject a new one.
    var drawer = existingDrawer;
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mobileInjectedDrawer';
      drawer.className = 'nav-drawer';

      var itemsHtml = '';
      navLinks.forEach(function (item) {
        var label = item.text;
        if (!label) return;
        var isBook = label.toLowerCase().includes('book');

        if (isBook) {
          itemsHtml += '<a href="' + item.href + '" class="cta-btn">Book Test</a>';
        } else {
          if (label.toLowerCase().includes('service')) label = 'Services';
          if (label.toLowerCase().includes('about')) label = 'About';
          if (label.toLowerCase().includes('contact')) label = 'Contact';

          itemsHtml += '<a href="' + item.href + '">' + label + '</a>';
        }
      });

      drawer.innerHTML = itemsHtml;
      document.body.appendChild(drawer);
      drawer.style.display = 'none';
      drawer.classList.remove('open');
    }

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

