/* ═══════════════════════════════════════════════════
   loader-nav.js
   — Injects site-wide enhancements into every page
   — Handles loading screen between pages
═══════════════════════════════════════════════════ */

(function () {

  /* ── 1. Google Fonts: Inter ── */
  if (!document.querySelector('link[href*="Inter"]')) {
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(fontLink);
  }

  /* ── 2. Font Awesome ── */
  if (!document.querySelector('link[href*="font-awesome"]')) {
    var faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
    document.head.appendChild(faLink);
  }

  /* ── 3. AOS CSS ── */
  if (!document.querySelector('link[href*="aos"]')) {
    var aosLink = document.createElement('link');
    aosLink.rel = 'stylesheet';
    aosLink.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css';
    document.head.appendChild(aosLink);
  }

  /* ── 4. Global enhancement styles ── */
  var style = document.createElement('style');
  style.textContent = `
    /* Font */
    body { font-family: 'Inter','Segoe UI',Tahoma,Geneva,Verdana,sans-serif !important; }

    /* Remove underlines & blue from links globally */
    a { text-decoration: none !important; color: inherit; cursor: pointer; }
    a:hover, a:visited, a:active { text-decoration: none !important; }

    /* ── Page Reveal ── */
    #_pgReveal {
      position: fixed; inset: 0; z-index: 99999;
      background: #2d970d;
      transform-origin: top;
      animation: _revealOut .85s cubic-bezier(.77,0,.18,1) .05s forwards;
      pointer-events: none;
    }
    @keyframes _revealOut { 0%{transform:scaleY(1);} 100%{transform:scaleY(0);} }

    /* ── Scroll-to-top ── */
    #_stt {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 900;
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg, #2d970d, #4ff054);
      color: #fff; border: none; cursor: pointer; font-size: 1.1rem;
      box-shadow: 0 4px 20px rgba(45,151,13,.5);
      opacity: 0; transform: translateY(20px);
      transition: opacity .35s, transform .35s;
      display: flex; align-items: center; justify-content: center;
    }
    #_stt.show { opacity: 1; transform: translateY(0); }
    #_stt:hover { transform: translateY(-4px) scale(1.1) !important; }

    /* ── Navbar glass on scroll ── */
    nav { transition: background .4s, box-shadow .4s, padding .4s !important; }
    nav.nav-scrolled {
      background: rgba(10,28,8,.96) !important;
      backdrop-filter: blur(18px) !important;
      -webkit-backdrop-filter: blur(18px) !important;
      box-shadow: 0 2px 32px rgba(0,0,0,.4) !important;
      padding: .65rem 0 !important;
    }

    /* ── Logo image glow ── */
    .logo-img {
      border: 2px solid rgba(79,240,84,.6) !important;
      box-shadow: 0 0 14px rgba(79,240,84,.4) !important;
      transition: transform .4s, box-shadow .4s !important;
    }
    .logo:hover .logo-img {
      transform: rotate(8deg) scale(1.1) !important;
      box-shadow: 0 0 24px rgba(79,240,84,.8) !important;
    }

    /* ── cta-btn pill ── */
    .cta-btn {
      background: linear-gradient(135deg, #4ff054, #175308) !important;
      color: #fff !important;
      padding: .65rem 1.5rem !important;
      border-radius: 50px !important;
      font-weight: 700 !important;
      box-shadow: 0 4px 16px rgba(79,240,84,.45) !important;
      transition: transform .3s, box-shadow .3s !important;
      border: none !important;
    }
    .cta-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 24px rgba(79,240,84,.7) !important;
    }
    .cta-btn::after { display: none !important; }

    /* ── Section title underline ── */
    .section-title, .detailed-services h2, .packages-section h2,
    h2.page-title, .page-header h1 {
      position: relative;
    }
    .s-underline::after,
    .section-title::after {
      content: '';
      display: block;
      width: 60px; height: 4px;
      background: linear-gradient(90deg, #2d970d, #4ff054);
      border-radius: 4px;
      margin: .5rem auto 0;
    }

    /* ── Page header hero animation ── */
    .page-header h1 { animation: _hFade .9s ease .2s both; }
    .page-header p  { animation: _hFade .9s ease .4s both; }
    @keyframes _hFade { from{opacity:0;transform:translateY(22px);} to{opacity:1;transform:translateY(0);} }

    /* ── Page-header grid overlay ── */
    .page-header {
      position: relative !important;
      overflow: hidden !important;
      padding-top: 110px !important;
    }
    .page-header::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cdefs%3E%3Cpattern id='pg' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M40 0L0 0 0 40' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='1200' height='400' fill='url(%23pg)'/%3E%3C/svg%3E");
      opacity: 1;
      z-index: 0;
    }
    .page-header > * { position: relative; z-index: 1; }

    /* ── Card & item hover lifts ── */
    .card, .pricing-card, .highlight-card, .why-card,
    .service-card, .package-card, .detailed-item,
    .mv-card, .team-card, .cert-card, .info-item,
    .why-choose-item, .testimonial-card, .stat-box {
      transition: transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s !important;
    }
    .card:hover, .pricing-card:hover, .highlight-card:hover,
    .why-card:hover, .mv-card:hover, .team-card:hover,
    .cert-card:hover, .info-item:hover, .why-choose-item:hover,
    .testimonial-card:hover, .stat-box:hover {
      transform: translateY(-10px) !important;
      box-shadow: 0 20px 48px rgba(45,151,13,.22) !important;
    }

    /* ── AOS scroll-fade ── */
    .scroll-fade {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity .65s ease, transform .65s ease !important;
    }
    .scroll-fade.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    /* ── Button ripple ── */
    @keyframes _ripple { to { transform: scale(2.5); opacity: 0; } }

    /* ── Footer link hover ── */
    .footer-section a:hover {
      color: #4ff054 !important;
      padding-left: 5px !important;
    }
    .footer-section a {
      transition: color .3s, padding-left .3s !important;
    }
  `;
  document.head.appendChild(style);

  /* ── 5. Inject page reveal div ── */
  var rev = document.createElement('div');
  rev.id = '_pgReveal';
  document.body.insertBefore(rev, document.body.firstChild);

  /* ── 6. Inject scroll-to-top button ── */
  var stt = document.createElement('button');
  stt.id = '_stt';
  stt.title = 'Back to top';
  stt.innerHTML = '<i class="fas fa-chevron-up"></i>';
  document.body.insertBefore(stt, document.body.firstChild);
  stt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 7. Load AOS + GSAP scripts then init ── */
  function loadScript(src, cb) {
    if (document.querySelector('script[src="' + src + '"]')) { if (cb) cb(); return; }
    var s = document.createElement('script');
    s.src = src;
    s.onload = cb || null;
    document.body.appendChild(s);
  }

  function initEnhancements() {
    /* AOS */
    if (window.AOS) {
      AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 50 });
      /* Add AOS attrs to cards that don't have them */
      document.querySelectorAll(
        '.card, .pricing-card, .highlight-card, .package-card, .detailed-item, .why-card, .mv-card, .team-card'
      ).forEach(function (el, i) {
        if (!el.getAttribute('data-aos')) {
          el.setAttribute('data-aos', 'fade-up');
          el.setAttribute('data-aos-delay', String((i % 4) * 80));
        }
      });
      AOS.refresh();
    }

    /* GSAP */
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      /* hero text stagger if exists */
      var heroContent = document.querySelector('.hero-content, .hero .text, .hero > div');
      if (heroContent) {
        gsap.fromTo(heroContent.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: .85, stagger: .12, ease: 'power3.out', delay: .3 }
        );
      }

      /* cards stagger */
      ['service-card', 'package-card', 'pricing-card', 'highlight-card', 'stat-box', 'team-card'].forEach(function (cls) {
        var els = document.querySelectorAll('.' + cls);
        if (els.length) {
          gsap.fromTo(els,
            { y: 45, opacity: 0 },
            {
              y: 0, opacity: 1, duration: .65, stagger: .1, ease: 'power2.out',
              scrollTrigger: { trigger: els[0].parentElement, start: 'top 82%', once: true }
            }
          );
        }
      });

      /* CTA section heading */
      var ctaH = document.querySelector('.cta-section h2');
      if (ctaH) {
        gsap.fromTo(ctaH,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: .8, ease: 'power3.out',
            scrollTrigger: { trigger: ctaH, start: 'top 82%', once: true } }
        );
      }

      /* gallery images */
      var galleryImgs = document.querySelectorAll('.gallery img');
      if (galleryImgs.length) {
        gsap.fromTo(galleryImgs,
          { scale: .9, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: .6, stagger: .1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.gallery', start: 'top 85%', once: true }
          }
        );
      }
    }

    /* Scroll-fade observer */
    var sfObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); sfObs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -70px 0px' });
    document.querySelectorAll('.scroll-fade').forEach(function (el) { sfObs.observe(el); });

    /* Add scroll-fade to cards that don't have it */
    document.querySelectorAll(
      '.card, .pricing-card, .highlight-card, .why-card, .mv-card, .team-card, .stat-box, .info-item'
    ).forEach(function (el) {
      if (!el.classList.contains('scroll-fade')) {
        el.classList.add('scroll-fade');
        sfObs.observe(el);
      }
    });
  }

  /* ── 8. Navbar scroll + stt visibility ── */
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
      if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 60);
      stt.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    /* ── 9. Smooth hash scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var h = this.getAttribute('href');
        if (h !== '#') {
          var t = document.querySelector(h);
          if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }
      });
    });

    /* ── 10. Button ripple ── */
    document.querySelectorAll('button, .cta-btn, .package-btn, .filter-btn, .btn-primary, .btn-secondary, .submit-btn, .book-btn, .service-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var r = document.createElement('span');
        var rc = btn.getBoundingClientRect();
        var sz = Math.max(rc.width, rc.height);
        r.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,.32);width:' + sz + 'px;height:' + sz + 'px;left:' + (e.clientX - rc.left - sz / 2) + 'px;top:' + (e.clientY - rc.top - sz / 2) + 'px;transform:scale(0);animation:_ripple .5s linear;pointer-events:none';
        btn.style.position = 'relative'; btn.style.overflow = 'hidden';
        btn.appendChild(r);
        setTimeout(function () { if (r.parentNode) r.remove(); }, 520);
      });
    });

    /* ── 11. Global link → loading screen ── */
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var trimmed = href.trim();
      if (
        trimmed === '' ||
        trimmed.startsWith('#') ||
        trimmed.startsWith('mailto:') ||
        trimmed.startsWith('tel:') ||
        trimmed.startsWith('javascript:') ||
        trimmed.toLowerCase().includes('loading.html')
      ) return;
      try {
        var url = new URL(trimmed, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (!url.pathname.toLowerCase().endsWith('.html')) return;
      } catch (_) { return; }

      link.addEventListener('click', function (event) {
        event.preventDefault();
        var destination = new URL(trimmed, window.location.href).href;
        window.location.href = 'loading.html?target=' + encodeURIComponent(destination);
      });
    });

    /* ── 12. Load AOS → then GSAP → then init ── */
    loadScript('https://unpkg.com/aos@2.3.4/dist/aos.js', function () {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', function () {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', function () {
          initEnhancements();
        });
      });
    });

    /* ── 13. Dynamic footer year ── */
    document.querySelectorAll('.footer-bottom p, #footerCopy').forEach(function (el) {
      el.innerHTML = el.innerHTML.replace(/202[0-9]/g, new Date().getFullYear());
    });
    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();
  });

})();
