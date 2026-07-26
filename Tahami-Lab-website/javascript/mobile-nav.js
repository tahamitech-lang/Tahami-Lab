(function () {
  'use strict';

  // Get elements
  var hbg = document.getElementById('hamburger');
  var drw = document.getElementById('navDrawer');
  
  // If elements not found, exit
  if (!hbg || !drw) {
    console.warn('Hamburger or NavDrawer not found!');
    return;
  }

  // Close drawer function
  function closeDrawer() {
    hbg.classList.remove('open');
    drw.classList.remove('open');
    document.body.style.overflow = '';
    document.body.style.position = '';
  }

  // Open drawer function
  function openDrawer() {
    hbg.classList.add('open');
    drw.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
  }

  // Toggle drawer on hamburger click
  hbg.addEventListener('click', function (e) {
    e.stopPropagation();
    if (drw.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close drawer when clicking outside
  document.addEventListener('click', function (e) {
    if (drw.classList.contains('open')) {
      var isClickInsideDrawer = drw.contains(e.target);
      var isClickOnHamburger = hbg.contains(e.target);
      if (!isClickInsideDrawer && !isClickOnHamburger) {
        closeDrawer();
      }
    }
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drw.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking on any link inside
  var links = drw.querySelectorAll('a');
  links.forEach(function (a) {
    a.addEventListener('click', closeDrawer);
  });

  // Handle window resize - close drawer if open
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && drw.classList.contains('open')) {
      closeDrawer();
    }
  });

  console.log('✅ Mobile navigation initialized successfully!');
})();