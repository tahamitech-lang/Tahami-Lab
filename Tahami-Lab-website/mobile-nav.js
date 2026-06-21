// ===========================
// MOBILE NAV JS
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var overlay = document.getElementById('mobileMenuOverlay');
    var closeBtn = document.getElementById('mobileCloseBtn');

    // Open menu
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function () {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close menu via X
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closeMenu();
        });
    }

    // Close menu when any nav link clicked
    var links = document.querySelectorAll('.mob-link, .mob-book-btn');
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    function closeMenu() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
});