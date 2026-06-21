(function () {
  var hbg = document.getElementById('hamburger');
  var drw = document.getElementById('navDrawer');
  if (!hbg || !drw) return;

  function closeDrawer() {
    hbg.classList.remove('open');
    drw.classList.remove('open');
    document.body.style.overflow = '';
  }

  hbg.addEventListener('click', function () {
    hbg.classList.toggle('open');
    drw.classList.toggle('open');
    document.body.style.overflow = drw.classList.contains('open') ? 'hidden' : '';
  });

  drw.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeDrawer);
  });
})();

