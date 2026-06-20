// Mobile Navigation JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');

    if (hamburger && mobileNavMenu) {
        hamburger.addEventListener('click', () => {
            if (mobileNavMenu.classList.contains('open')) {
                mobileNavMenu.classList.remove('open');
                mobileNavMenu.classList.add('closed');
                setTimeout(() => {
                    mobileNavMenu.style.display = 'none';
                    mobileNavMenu.classList.remove('closed');
                }, 300); // Match animation duration
            } else {
                mobileNavMenu.style.display = 'block';
                mobileNavMenu.classList.add('open');
            }
        });

        // Close menu when a link is clicked
        mobileNavMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNavMenu.classList.contains('open')) {
                    mobileNavMenu.classList.remove('open');
                    mobileNavMenu.classList.add('closed');
                    setTimeout(() => {
                        mobileNavMenu.style.display = 'none';
                        mobileNavMenu.classList.remove('closed');
                    }, 300); // Match animation duration
                }
            });
        });
    }
});
