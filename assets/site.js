// KiraDulu shared page behaviour: header menus, the mobile summary bar, and share links.
// Loaded in <head> on every page, so it runs before each calculator's own script.
(function () {
    // --- Shared calculation links (?s=...) ---
    // Every calculator already remembers its inputs in localStorage (kiradulu_* keys). A share
    // link carries that saved record, so restoring it here -- before the page script reads its
    // saved inputs -- reproduces the sender's calculation without any per-page share code.
    function encodeShare(data) {
        const bytes = new TextEncoder().encode(JSON.stringify(data));
        let bin = '';
        bytes.forEach(b => { bin += String.fromCharCode(b); });
        return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function decodeShare(str) {
        const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
    }

    const params = new URLSearchParams(location.search);
    if (params.has('s')) {
        try {
            const data = decodeShare(params.get('s'));
            Object.keys(data).forEach(key => {
                if (/^kiradulu_[a-z_]+$/.test(key) && typeof data[key] === 'string') localStorage.setItem(key, data[key]);
            });
        } catch (e) { /* malformed link or storage unavailable: the page opens with its defaults */ }
        params.delete('s');
        const query = params.toString();
        history.replaceState(null, '', location.pathname + (query ? '?' + query : '') + location.hash);
    }

    function flash(el, text) {
        if (!el) return;
        el.textContent = text;
        setTimeout(() => { el.textContent = ''; }, 3000);
    }

    // Phones get the native share sheet (WhatsApp, Telegram...); desktops copy the link.
    function shareUrl(url, title, msgEl) {
        if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
            navigator.share({ title: title, url: url }).catch(() => { /* user closed the sheet */ });
            return;
        }
        navigator.clipboard.writeText(url).then(() => flash(msgEl, 'Link copied!'), () => flash(msgEl, url));
    }

    window.kdShareCalculation = function () {
        const keys = (document.body.dataset.kdShare || '').split(',').filter(Boolean);
        const data = {};
        keys.forEach(key => {
            try {
                const value = localStorage.getItem(key);
                if (value !== null) data[key] = value;
            } catch (e) { /* storage unavailable */ }
        });
        const url = location.origin + location.pathname + '?s=' + encodeShare(data);
        shareUrl(url, document.title, document.getElementById('kd-share-msg'));
        if (typeof gtag === 'function') gtag('event', 'Copy_Shareable_Link', { event_category: 'Engagement', method: 'button_click' });
    };

    window.kdShareSite = function (via) {
        const url = location.origin + '/';
        const text = 'KiraDulu — free Malaysian calculators for salary, tax, EPF, property and cars: ' + url;
        if (via === 'whatsapp') {
            window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
        } else {
            navigator.clipboard.writeText(url).then(() => flash(document.getElementById('kd-site-share-msg'), 'Link copied!'));
        }
    };

    // Dark mode (calculator scripts define the same function; this covers pages without one, e.g. About).
    function syncDarkIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        const sun = document.getElementById('icon-sun');
        const moon = document.getElementById('icon-moon');
        if (sun && moon) { sun.classList.toggle('hidden', !isDark); moon.classList.toggle('hidden', isDark); }
    }
    window.toggleDarkMode = function () {
        const isDark = document.documentElement.classList.toggle('dark');
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
        syncDarkIcons();
    };

    // Charts: readable 13px text, coloured for the current theme (Chart.js defaults to 12px grey,
    // which almost disappears on the dark background). Re-applied whenever the theme flips.
    function styleCharts() {
        if (!window.Chart) return;
        const dark = document.documentElement.classList.contains('dark');
        Chart.defaults.font.size = 13;
        Chart.defaults.color = dark ? '#C9BC94' : '#5B5138';
        Chart.defaults.borderColor = dark ? 'rgba(237, 228, 204, 0.12)' : 'rgba(38, 32, 25, 0.1)';
        Chart.defaults.plugins.tooltip.titleFont = { size: 14, weight: 'bold' };
        Chart.defaults.plugins.tooltip.bodyFont = { size: 13 };
        Chart.defaults.plugins.tooltip.padding = 10;
        Object.values(Chart.instances || {}).forEach(chart => {
            chart.options.color = Chart.defaults.color;
            chart.update('none');
        });
    }
    new MutationObserver(styleCharts).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('DOMContentLoaded', () => {
        syncDarkIcons();
        styleCharts();

        // Two-column input grids where every cell is just "label + input/select/.kd-field" get .kd-pairs
        // (see site.css) so their labels and inputs line up row by row.
        document.querySelectorAll('main .grid-cols-2').forEach(grid => {
            const cells = [...grid.children];
            const isPair = cell => cell.tagName === 'DIV' && cell.children.length === 2
                && cell.children[0].tagName === 'LABEL'
                && (/^(INPUT|SELECT)$/.test(cell.children[1].tagName) || cell.children[1].classList.contains('kd-field'));
            if (cells.length && cells.every(isPair)) grid.classList.add('kd-pairs');
        });

        // Units inside input boxes (.kd-field): pad the input by the unit's measured width so the
        // value never runs under "RM" or "% p.a." (the inline padding is only a no-JS estimate).
        // Fields inside hidden toggles (e.g. EV-only inputs) have no size until shown, so re-fit
        // after any click (every show/hide toggle is a click), on resize and on load.
        const fitField = field => {
            const input = field.querySelector('input');
            const pre = field.querySelector('.kd-prefix');
            const suf = field.querySelector('.kd-suffix');
            if (pre && pre.offsetWidth) input.style.paddingLeft = (pre.offsetLeft + pre.offsetWidth + 6) + 'px';
            if (suf && suf.offsetWidth) input.style.paddingRight = (field.clientWidth - suf.offsetLeft + 6) + 'px';
        };
        const fitAll = () => document.querySelectorAll('.kd-field').forEach(fitField);
        fitAll();
        window.addEventListener('load', fitAll);
        window.addEventListener('resize', fitAll);
        document.addEventListener('click', () => setTimeout(fitAll, 0));

        // --- Desktop dropdowns: hover opens them (CSS); click/tap toggles for touch and keyboards ---
        const dropdowns = document.querySelectorAll('.kd-dd');
        function closeDropdowns(except) {
            dropdowns.forEach(dd => {
                if (dd === except) return;
                dd.classList.remove('open');
                dd.querySelector('[data-kd-dd]').setAttribute('aria-expanded', 'false');
            });
        }
        dropdowns.forEach(dd => {
            const btn = dd.querySelector('[data-kd-dd]');
            btn.addEventListener('click', () => {
                const open = dd.classList.toggle('open');
                btn.setAttribute('aria-expanded', String(open));
                closeDropdowns(dd);
            });
        });
        document.addEventListener('click', e => { if (!e.target.closest('.kd-dd')) closeDropdowns(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDropdowns(); setMenu(false); } });

        // --- Mobile menu ---
        const menuBtn = document.getElementById('kd-menu-btn');
        const menu = document.getElementById('kd-mobile-menu');
        function setMenu(open) {
            if (!menu) return;
            menu.classList.toggle('hidden', !open);
            menuBtn.setAttribute('aria-expanded', String(open));
            document.getElementById('kd-menu-open').classList.toggle('hidden', open);
            document.getElementById('kd-menu-close').classList.toggle('hidden', !open);
        }
        if (menuBtn && menu) {
            menuBtn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
            // In-page links (Property ROI tabs) don't navigate away, so close the menu explicitly.
            menu.querySelectorAll('a, button').forEach(link => link.addEventListener('click', () => setMenu(false)));
        }

        // --- Mobile summary bar: mirrors the headline results so they stay visible while typing ---
        document.querySelectorAll('[data-kd-mirror]').forEach(target => {
            const source = document.getElementById(target.dataset.kdMirror);
            if (!source) return;
            const sync = () => { target.textContent = source.textContent; };
            new MutationObserver(sync).observe(source, { childList: true, characterData: true, subtree: true });
            sync();
        });
    });
})();
