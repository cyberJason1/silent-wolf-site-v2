// script.js
(function () {
    var pages = [['index.html','首页'],['characters.html','人物档案'],['plot.html','剧情大纲'],['trailer.html','30秒预告分镜'],['quotes.html','金句库'],['download.html','档案下载']];
    var cur = document.body.getAttribute('data-page');
    var root = document.documentElement;
    // 统一导航栏
    var nav = document.createElement('header');
    nav.className = 'site-header';
    nav.innerHTML = '<div class="nav-inner"><a class="brand" href="index.html">沉默之狼 <small>V5.5</small></a><nav>' +
        pages.map(function (p) {
            return '<a href="' + p[0] + '"' + (p[0] === cur ? ' class="active" aria-current="page"' : '') + '>' + p[1] + '</a>';
        }).join('') + '</nav></div>';
    document.body.prepend(nav);
    // 统一页脚
    var f = document.createElement('footer');
    f.className = 'site-footer';
    f.textContent = '《沉默之狼》院线级完整总档案 V5.5';
    document.body.appendChild(f);
    // 同步导航高度（手机端导航换行时高度会变化）
    function syncNav() { root.style.setProperty('--nav-h', nav.offsetHeight + 'px'); }
    syncNav();
    // 表格：移动端自动生成标签
    document.querySelectorAll('table').forEach(function (t) {
        var heads = Array.from(t.querySelectorAll('thead th')).map(function (x) { return x.textContent; });
        t.classList.add('stack');
        t.querySelectorAll('tbody tr').forEach(function (tr) {
            Array.from(tr.children).forEach(function (td, i) { td.setAttribute('data-label', heads[i] || ''); });
        });
    });
    // 代码块：复制按钮
    document.querySelectorAll('pre.code').forEach(function (pre) {
        var b = document.createElement('button');
        b.className = 'copy'; b.type = 'button'; b.textContent = '复制';
        b.addEventListener('click', function () {
            var text = pre.querySelector('code').textContent;
            var done = function () { b.textContent = '已复制'; setTimeout(function () { b.textContent = '复制'; }, 1500); };
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(done);
            } else {
                var ta = document.createElement('textarea');
                ta.value = text; document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); done(); } catch (e) {}
                document.body.removeChild(ta);
            }
        });
        pre.appendChild(b);
    });
    // 淡入
    var els = document.querySelectorAll('.fade,.text-block');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: .1 });
        els.forEach(function (el) { io.observe(el); });
    } else { els.forEach(function (el) { el.classList.add('in'); }); }
    // 下载页：检测 docx 是否已上传
    var dl = document.getElementById('dl-btn');
    if (dl) {
        dl.addEventListener('click', function (ev) {
            ev.preventDefault();
            var url = dl.getAttribute('href'), box = document.getElementById('dl-notice');
            fetch(url, { method: 'HEAD' }).then(function (r) {
                if (r.ok) { location.href = url; } else { box.classList.add('show'); }
            }).catch(function () { box.classList.add('show'); });
        });
    }
    // ================= 首页：环形轮播 =================
    var hero = document.getElementById('hero');
    if (!hero) { window.addEventListener('resize', syncNav); return; }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var stage = document.getElementById('stage');
    var floater = document.getElementById('floater');
    var scene = hero.querySelector('.circle-scene');
    var items = Array.prototype.slice.call(hero.querySelectorAll('.character-item'));
    var n = items.length, ticking = false;
    // 图片缺失时显示占位
    function watch(img, onFail) {
        if (img.complete && img.naturalWidth === 0) onFail();
        img.addEventListener('error', onFail);
    }
    items.forEach(function (el) {
        var img = el.querySelector('img');
        el.setAttribute('data-name', img.alt);
        watch(img, function () { el.classList.add('noimg'); });
    });
    watch(document.querySelector('.poster-img'), function () { document.getElementById('poster').classList.add('no-poster'); });
    watch(floater.querySelector('img'), function () { floater.classList.add('gone'); });
    // 【新增】附加旋转量：单位是"几个角色"。正数 = 整体向左转，负数 = 向右转
    var extra = 0;
    // 页面滚动进度 p（0~1）
    function progress() {
        var r = hero.getBoundingClientRect();
        var span = Math.max(1, r.height - stage.offsetHeight);
        return Math.min(1, Math.max(0, (nav.offsetHeight - r.top) / span));
    }
    function update() {
        ticking = false;
        var r = hero.getBoundingClientRect();
        var p = progress();
        floater.classList.toggle('show', r.bottom < window.innerHeight * 0.3);
        if (reduce) return;
        var R = Math.min(stage.clientWidth * 0.36, 360);
        // 页面滚动进度 + 滚轮产生的附加旋转量
        var s = p * (n - 1) + extra;
        items.forEach(function (el, i) {
            var a = (i - s) * (2 * Math.PI / n);   // s 恰为整数 i 时，第 i 个角色正好在正面
            var c = Math.cos(a), x = Math.sin(a) * R;
            var k = (c + 1) / 2;                    // 0 背面 ~ 1 正面
            el.style.transform = 'translate(-50%,-50%) translateX(' + x.toFixed(1) + 'px) translateY(' +
                (-k * 24).toFixed(1) + 'px) scale(' + (0.5 + 0.62 * k).toFixed(3) + ')';
            el.style.opacity = (0.25 + 0.75 * k).toFixed(3);
            el.style.zIndex = Math.round(c * 100) + 100;
            el.lastElementChild.style.opacity = Math.min(1, Math.max(0, (c - 0.9) / 0.1)).toFixed(2);
        });
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', function () { syncNav(); req(); });
    window.addEventListener('load', function () { syncNav(); req(); });
    update();
    // ================= 【新增】.circle-scene 滚轮 / 触控板交互 =================
    if (!scene || reduce) return;           // 无该元素或系统要求减少动态效果时，不启用
    /* ---- 可调参数 ---- */
    var SENS = 1 / 260;       // 灵敏度：滚轮累计约 260px 转 1 个角色；数值变大转动更快，数值变小转动迟钝
    var EASE = 0.12;          // 缓动系数：越小越柔和，越大越跟手
    var SNAP_DELAY = 150;     // 滚轮停止多少毫秒后，自动吸附到最近的角色
    /* 滚轮响应区（占 .circle-scene 宽高的比例）。
       三个都设为 0 = 整个 .circle-scene 都响应，但那样鼠标在首屏内就无法翻页 */
    var ZONE_X = 0.12;        // 左右各留出的比例
    var ZONE_TOP = 0.28;      // 顶部留出的比例（避开大标题）
    var ZONE_BOTTOM = 0.02;   // 底部留出的比例
    var extraTarget = 0;      // 目标附加旋转量，滚轮只改它
    var raf = null, snapTimer = null;
    // 判断鼠标是否在响应区内
    function inZone(e) {
        var b = scene.getBoundingClientRect();
        var x = (e.clientX - b.left) / b.width;
        var y = (e.clientY - b.top) / b.height;
        return x >= ZONE_X && x <= 1 - ZONE_X && y >= ZONE_TOP && y <= 1 - ZONE_BOTTOM;
    }
    // 平滑动画：每帧让 extra 逼近 extraTarget
    function frame() {
        var d = extraTarget - extra;
        if (Math.abs(d) < 0.0005) {           // 足够接近：对齐并停止，省电
            extra = extraTarget;
            update();
            raf = null;
            return;
        }
        extra += d * EASE;
        update();
        raf = requestAnimationFrame(frame);
    }
    function startFrame() { if (raf === null) raf = requestAnimationFrame(frame); }
    // 吸附：让 p*(n-1)+extraTarget 变成整数，即某个角色正好转到正中
    function snap() {
        var base = progress() * (n - 1);
        extraTarget = Math.round(base + extraTarget) - base;
        startFrame();
    }
    // 滚轮事件：必须 passive:false，preventDefault 才能阻止页面竖向滚动
    scene.addEventListener('wheel', function (e) {
        if (!inZone(e)) return;               // 不在响应区：不拦截，页面正常滚动
        // 统一单位为像素（部分浏览器按"行/页"计量）
        var unit = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? 400 : 1);
        var dx = e.deltaX * unit, dy = e.deltaY * unit;
        var step;
        if (Math.abs(dx) > Math.abs(dy)) {
            step = dx * SENS;                   // 触控板横向：deltaX>0 → 向左转
        } else {
            step = -dy * SENS;                  // 滚轮：向上(dy<0) → 向左转；向下(dy>0) → 向右转
        }
        if (step === 0) return;
        step = Math.max(-0.8, Math.min(0.8, step));   // 单次限幅，避免猛滚时一下转太多
        e.preventDefault();                   // 阻止页面原生竖向滚动
        extraTarget += step;
        startFrame();
        clearTimeout(snapTimer);              // 停止滚动一小会儿后吸附到最近角色
        snapTimer = setTimeout(snap, SNAP_DELAY);
    }, { passive: false });
    // 鼠标在响应区内时显示左右箭头光标，作为"已进入角色滚动模式"的提示
    scene.addEventListener('mousemove', function (e) {
        scene.classList.toggle('wheel-on', inZone(e));
    });
    // 鼠标移出：仅移除光标样式，不立刻吸附；等待计时器超时再吸附
    scene.addEventListener('mouseleave', function () {
        scene.classList.remove('wheel-on');
    });
})();
