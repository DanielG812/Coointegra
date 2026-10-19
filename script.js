const d = document, nav = d.querySelector('.navbar'), btn = d.querySelector('.menu-btn'), bar = d.querySelector('.progress');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const show = (el, v) => { el.textContent = (el.dataset.pre || '') + v.toLocaleString('es-CO') + (el.dataset.suf || ''); };

// Contadores animados: cuentan de 0 al valor final cuando aparecen en pantalla
function count(el) {
    const end = +el.dataset.count;
    if (still) return show(el, end);
    const t0 = performance.now();
    (function tick(t) {
        const p = Math.min(1, (t - t0) / 1600);
        show(el, Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
    })(t0);
}

const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(count);
        io.unobserve(e.target);
    }
}), { threshold: .15 });
d.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

const setMenu = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); };
btn.onclick = () => setMenu(!nav.classList.contains('open'));
d.querySelectorAll('.nav-links a').forEach(a => a.onclick = () => setMenu(false));

const onScroll = () => {
    nav.classList.toggle('scrolled', scrollY > 20);
    bar.style.transform = 'scaleX(' + scrollY / Math.max(1, d.documentElement.scrollHeight - innerHeight) + ')';
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
