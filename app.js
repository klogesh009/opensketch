'use strict';
(function () {
  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const store = {
    get(k, d) { try { const v = localStorage.getItem('os_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('os_' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
  };
  const today = () => new Date().toLocaleDateString('en-CA');

  const ICON = {
    pencil: 'M4 20l1-4L16 5l3 3L8 19l-4 1z M14 7l3 3',
    pen: 'M4 20l2-5 10-10 3 3-10 10-5 2z M15 6l3 3 M4 20l4-4',
    marker: 'M5 19h6 M7 15l8-11 4 3-8 11-4-3z',
    highlighter: 'M3 21h7 M13 3l8 8-9 9-8-8 9-9z M9 9l6 6',
    airbrush: 'M12 12h.01 M12 5h.01 M6 8h.01 M18 8h.01 M6 16h.01 M18 16h.01 M12 19h.01 M12 8.5h.01 M12 15.5h.01',
    charcoal: 'M5 19L19 5 M5 13L13 5 M11 19l8-8',
    smudge: 'M8 15c0-5 1-10 4-10s4 5 4 10v3H8v-3z M7 21h10',
    eraser: 'M4 15l8-9 8 8-6 6H9l-5-5z M9 11l8 8',
    fill: 'M5 12l7-7 8 8-7 7-8-8z M3 20h4 M19 16c1 2 2 3 2 4a2 2 0 0 1-4 0c0-1 1-2 2-4z',
    line: 'M5 19L19 5',
    rect: 'M5 6h14v12H5z',
    ellipse: 'M12 6c4.4 0 8 2.7 8 6s-3.6 6-8 6-8-2.7-8-6 3.6-6 8-6z',
    eyedrop: 'M4 20l1-4 9-9 3 3-9 9-4 1z M13 8l3 3 M16 5l3 3-2 2-3-3z',
    hand: 'M8 12V6a1.5 1.5 0 0 1 3 0v5 M11 11V4.5a1.5 1.5 0 0 1 3 0V11 M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2 7-6 7s-5-2-7-5l-1-2a1.5 1.5 0 0 1 2.5-1.5L8 14',
    undo: 'M9 14L4 9l5-5 M4 9h10a6 6 0 0 1 0 12h-3',
    redo: 'M15 14l5-5-5-5 M20 9H10a6 6 0 0 0 0 12h3',
    layers: 'M12 3l9 5-9 5-9-5 9-5z M3 12l9 5 9-5 M3 16l9 5 9-5',
    eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 .01 0z',
    eyeoff: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M3 3l18 18',
    trash: 'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13',
    plus: 'M12 5v14 M5 12h14',
    copy: 'M8 8h11v11H8z M5 16V5h11',
    up: 'M6 15l6-6 6 6',
    down: 'M6 9l6 6 6-6',
    download: 'M12 4v11 M7 11l5 5 5-5 M5 20h14',
    share: 'M4 12v7h16v-7 M12 3v12 M8 7l4-4 4 4',
    back: 'M15 5l-7 7 7 7',
    more: 'M5 12h.01 M12 12h.01 M19 12h.01',
    guide: 'M12 3v4 M12 17v4 M3 12h4 M17 12h4 M12 9a3 3 0 1 0 .01 0z',
    check: 'M5 13l4 4 10-10',
    book: 'M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z M8 17h10',
    gallery: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
    brush: 'M18 3l3 3-9 9-3-3 9-9z M9 13c-3 0-4 2-4 4s-1 3-2 4c3 0 7 0 7-4 0-1 0-2-1-3z',
    flame: 'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
    x: 'M6 6l12 12 M18 6L6 18',
    fit: 'M4 9V4h5 M20 9V4h-5 M4 15v5h5 M20 15v5h-5',
    merge: 'M6 4v6a6 6 0 0 0 12 0V4 M12 16v5 M9 18l3 3 3-3',
    edit: 'M4 20l1-4L16 5l3 3L8 19l-4 1z',
  };
  const ic = (n, sz = 22) => `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICON[n] || ''}"/></svg>`;
  const fillIcons = (root = document) => $$('[data-i]', root).forEach((el) => { el.innerHTML = ic(el.dataset.i); });

  // ---------- tools ----------
  const TOOLS = {
    pencil: { n: 'Pencil', i: 'pencil', size: 6, op: 90, mode: 'stamp' },
    pen: { n: 'Pen', i: 'pen', size: 4, op: 100, mode: 'line' },
    marker: { n: 'Marker', i: 'marker', size: 18, op: 75, mode: 'line', buf: true },
    highlighter: { n: 'Highlight', i: 'highlighter', size: 34, op: 45, mode: 'line', buf: true, blend: 'multiply' },
    airbrush: { n: 'Airbrush', i: 'airbrush', size: 50, op: 50, mode: 'stamp' },
    charcoal: { n: 'Charcoal', i: 'charcoal', size: 22, op: 80, mode: 'stamp' },
    smudge: { n: 'Blend', i: 'smudge', size: 30, op: 60, mode: 'smudge' },
    eraser: { n: 'Eraser', i: 'eraser', size: 30, op: 100, mode: 'line', erase: true },
    fill: { n: 'Fill', i: 'fill', size: 0, op: 100, mode: 'fill' },
    line: { n: 'Line', i: 'line', size: 4, op: 100, mode: 'shape' },
    rect: { n: 'Box', i: 'rect', size: 4, op: 100, mode: 'shape' },
    ellipse: { n: 'Oval', i: 'ellipse', size: 4, op: 100, mode: 'shape' },
    eyedrop: { n: 'Pick', i: 'eyedrop', size: 0, op: 100, mode: 'pick' },
    pan: { n: 'Move', i: 'hand', size: 0, op: 100, mode: 'pan' },
  };
  const savedTools = store.get('tools', {});
  Object.keys(savedTools).forEach((k) => { if (TOOLS[k]) { TOOLS[k].size = savedTools[k].size; TOOLS[k].op = savedTools[k].op; } });
  const saveTools = () => store.set('tools', Object.fromEntries(Object.entries(TOOLS).map(([k, t]) => [k, { size: t.size, op: t.op }])));

  const PAPERS = ['#fbf8f1', '#ffffff', '#efe3cc', '#d9d9d9', '#2b2f33', '#101214'];
  const BLENDS = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten'];
  const PALETTE = ['#111111', '#333333', '#555555', '#777777', '#999999', '#bbbbbb', '#dddddd', '#ffffff',
    '#e63946', '#f4793b', '#ffd23f', '#a7c957', '#3bb273', '#2a9d8f', '#3a86ff', '#5a4fcf', '#9b5de5', '#f15bb5',
    '#8d5a3b', '#c68642', '#f2c6a0', '#ffe5d0'];
  const SYMS = [['off', 'Off'], ['mirror', 'Mirror'], ['quad', 'Quad'], ['r6', 'Radial 6'], ['r8', 'Radial 8'], ['kal', 'Kaleidoscope']];

  // ---------- state ----------
  const S = {
    tool: store.get('tool', 'pencil'), color: store.get('color', '#222222'), recents: store.get('recents', []),
    layers: [], cur: null, paper: '#fbf8f1', sym: 'off', grid: false, shapeFill: false, stab: store.get('stab', 0.35),
    history: [], redo: [], docId: null, name: 'Untitled', dirty: false, lesson: null, guideOn: true, guideOp: 0.9,
    ref: { on: false, over: false, op: 40 }, prevView: 'learn',
  };
  if (!TOOLS[S.tool]) S.tool = 'pencil';
  const DOC = { w: 900, h: 1200 };
  const V = { s: 1, tx: 0, ty: 0, fitted: true };

  // ---------- DOM refs ----------
  const vp = $('#viewport'), stage = $('#stage'), layersEl = $('#layers'), paperEl = $('#paper');
  const sheet = $('#sheet'), backdrop = $('#backdrop'), sheetBody = $('#sheetBody');
  const strokeCanvas = document.createElement('canvas');
  strokeCanvas.className = 'stroke';
  const sctx = strokeCanvas.getContext('2d');

  // ---------- IndexedDB ----------
  const DB = {
    db: null,
    open() {
      if (this.db) return Promise.resolve(this.db);
      return new Promise((res, rej) => {
        const r = indexedDB.open('opensketch', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('docs', { keyPath: 'id' });
        r.onsuccess = () => { this.db = r.result; res(this.db); };
        r.onerror = () => rej(r.error);
      });
    },
    async tx(mode, fn) {
      const db = await this.open();
      return new Promise((res, rej) => {
        const t = db.transaction('docs', mode); const st = t.objectStore('docs'); const rq = fn(st);
        t.oncomplete = () => res(rq && rq.result); t.onerror = () => rej(t.error);
      });
    },
    put(d) { return this.tx('readwrite', (s) => s.put(d)); },
    get(id) { return this.tx('readonly', (s) => s.get(id)); },
    all() { return this.tx('readonly', (s) => s.getAll()).then((a) => (a || []).sort((x, y) => y.updated - x.updated)); },
    del(id) { return this.tx('readwrite', (s) => s.delete(id)); },
  };

  // ---------- toast / sheet ----------
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 1900);
  }
  function openSheet(title, node) {
    $('#sheetTitle').textContent = title;
    sheetBody.replaceChildren(node);
    fillIcons(sheetBody);
    sheet.classList.add('open'); backdrop.classList.add('open');
  }
  function closeSheet() { sheet.classList.remove('open'); backdrop.classList.remove('open'); }
  backdrop.addEventListener('click', closeSheet);
  $('#sheetClose').addEventListener('click', closeSheet);
  function el(html, cls) { const d = document.createElement('div'); if (cls) d.className = cls; d.innerHTML = html; return d; }

  // ---------- canvas / layers ----------
  function makeCanvas(w = DOC.w, h = DOC.h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  function newLayer(name) {
    const c = makeCanvas();
    return { id: uid(), name, canvas: c, ctx: c.getContext('2d'), visible: true, opacity: 1, blend: 'normal' };
  }
  function syncLayersDOM() {
    layersEl.replaceChildren();
    S.layers.forEach((L) => {
      L.canvas.style.display = L.visible ? 'block' : 'none';
      L.canvas.style.opacity = L.opacity;
      L.canvas.style.mixBlendMode = L.blend === 'normal' ? 'normal' : L.blend;
      layersEl.appendChild(L.canvas);
    });
  }
  function setDocSize(w, h) {
    DOC.w = w; DOC.h = h;
    stage.style.width = w + 'px'; stage.style.height = h + 'px';
    strokeCanvas.width = w; strokeCanvas.height = h;
    strokeCanvas.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none';
    $('#grid').style.backgroundSize = (w / 12) + 'px ' + (w / 12) + 'px';
  }
  function setPaper(c) {
    S.paper = c; paperEl.style.background = c;
  }
  function cloneCanvas(src) { const c = makeCanvas(src.width, src.height); c.getContext('2d').drawImage(src, 0, 0); return c; }

  function flatten(withPaper = true, scale = 1) {
    const c = makeCanvas(Math.round(DOC.w * scale), Math.round(DOC.h * scale)); const x = c.getContext('2d');
    if (withPaper) { x.fillStyle = S.paper; x.fillRect(0, 0, c.width, c.height); }
    for (const L of S.layers) {
      if (!L.visible) continue;
      x.globalAlpha = L.opacity; x.globalCompositeOperation = L.blend === 'normal' ? 'source-over' : L.blend;
      x.drawImage(L.canvas, 0, 0, c.width, c.height);
    }
    x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
    return c;
  }

  // ---------- doc lifecycle ----------
  function resetDoc({ w = 900, h = 1200, paper = '#fbf8f1', name, lesson = null } = {}) {
    setDocSize(w, h); setPaper(paper);
    const L = newLayer(lesson ? 'Drawing' : 'Layer 1');
    S.layers = [L]; S.cur = L; syncLayersDOM();
    S.history = []; S.redo = []; S.docId = uid(); S.dirty = false; S.sym = 'off';
    S.lesson = lesson; S.guideOn = true;
    S.name = name || (lesson ? LESSONS.find((l) => l.id === lesson.id).title : 'Sketch ' + new Date().toLocaleDateString());
    $('#docTitle').textContent = S.name;
    updateLessonCard(); updateUndoUI(); renderGuide();
    $('#refUnder').style.display = 'none'; $('#refOver').style.display = 'none'; S.ref.on = false;
    $('#grid').style.display = S.grid ? 'block' : 'none';
  }
  async function loadDoc(id) {
    const rec = await DB.get(id); if (!rec) { toast('Could not open that drawing'); return; }
    resetDoc({ w: rec.w, h: rec.h, paper: rec.paper, name: rec.name, lesson: rec.lesson || null });
    S.docId = rec.id; S.layers = [];
    for (const l of rec.layers) {
      const L = newLayer(l.name); L.visible = l.visible; L.opacity = l.opacity; L.blend = l.blend || 'normal';
      await drawBlob(l.blob, L.ctx); S.layers.push(L);
    }
    if (!S.layers.length) S.layers.push(newLayer('Layer 1'));
    S.cur = S.layers[S.layers.length - 1]; syncLayersDOM(); S.dirty = false;
    updateLessonCard(); renderGuide();
  }
  async function drawBlob(blob, ctx) {
    if (window.createImageBitmap) { const b = await createImageBitmap(blob); ctx.drawImage(b, 0, 0); if (b.close) b.close(); return; }
    await new Promise((res) => { const u = URL.createObjectURL(blob); const im = new Image(); im.onload = () => { ctx.drawImage(im, 0, 0); URL.revokeObjectURL(u); res(); }; im.src = u; });
  }
  let saveT, saving = false;
  function markDirty() { S.dirty = true; clearTimeout(saveT); saveT = setTimeout(saveDoc, 2000); }
  async function saveDoc() {
    if (!S.dirty || saving) return;
    saving = true;
    try {
      const th = flatten(true, 240 / DOC.w);
      const layers = await Promise.all(S.layers.map(async (L) => ({
        name: L.name, visible: L.visible, opacity: L.opacity, blend: L.blend,
        blob: await new Promise((r) => L.canvas.toBlob(r, 'image/png')),
      })));
      await DB.put({
        id: S.docId, name: S.name, w: DOC.w, h: DOC.h, paper: S.paper, updated: Date.now(),
        thumb: th.toDataURL('image/jpeg', 0.7), layers, lesson: S.lesson ? { id: S.lesson.id, step: S.lesson.step } : null,
      });
      S.dirty = false;
    } catch (e) { console.error(e); toast('Could not save automatically'); }
    saving = false;
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) { clearTimeout(saveT); saveDoc(); } });

  // ---------- view transform ----------
  const zoomBadge = $('#zoomBadge'); let zbT;
  function applyView() {
    stage.style.transform = `translate(${V.tx}px,${V.ty}px) scale(${V.s})`;
    zoomBadge.textContent = Math.round(V.s / fitScale() * 100) + '%'; zoomBadge.classList.add('on');
    clearTimeout(zbT); zbT = setTimeout(() => zoomBadge.classList.remove('on'), 900);
  }
  function fitScale() { const r = vp.getBoundingClientRect(); return Math.min(r.width / DOC.w, r.height / DOC.h) * 0.96 || 1; }
  function fitView() {
    const r = vp.getBoundingClientRect(); if (!r.width) return;
    const s = fitScale(); V.s = s; V.tx = (r.width - DOC.w * s) / 2; V.ty = (r.height - DOC.h * s) / 2; V.fitted = true; applyView();
  }
  window.addEventListener('resize', () => { if ($('#view-studio').classList.contains('active') && V.fitted) fitView(); });
  $('#btnFit').addEventListener('click', fitView);

  // ---------- history ----------
  const HMAX = 40;
  function pushHistory(e) { S.history.push(e); if (S.history.length > HMAX) S.history.shift(); S.redo.length = 0; updateUndoUI(); markDirty(); }
  function undo() { const e = S.history.pop(); if (!e) return; e.undo(); S.redo.push(e); updateUndoUI(); markDirty(); }
  function redo() { const e = S.redo.pop(); if (!e) return; e.redo(); S.history.push(e); updateUndoUI(); markDirty(); }
  function updateUndoUI() { $('#btnUndo').disabled = !S.history.length; $('#btnRedo').disabled = !S.redo.length; }
  $('#btnUndo').addEventListener('click', undo);
  $('#btnRedo').addEventListener('click', redo);
  window.addEventListener('keydown', (e) => {
    if (!$('#view-studio').classList.contains('active') || /INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ''))) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); }
  });

  // ---------- symmetry ----------
  const mul = (A, B) => [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3],
    A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]];
  function symMats() {
    const cx = DOC.w / 2, cy = DOC.h / 2, ID = [1, 0, 0, 1, 0, 0];
    const rot = (a) => { const c = Math.cos(a), s = Math.sin(a); return [c, s, -s, c, cx - c * cx + s * cy, cy - s * cx - c * cy]; };
    const mirV = [-1, 0, 0, 1, 2 * cx, 0], mirH = [1, 0, 0, -1, 0, 2 * cy];
    const rots = (n) => Array.from({ length: n }, (_, k) => rot((2 * Math.PI * k) / n));
    switch (S.sym) {
      case 'mirror': return [ID, mirV];
      case 'quad': return [ID, mirV, mirH, rot(Math.PI)];
      case 'r6': return rots(6);
      case 'r8': return rots(8);
      case 'kal': return rots(8).flatMap((r) => [r, mul(r, mirV)]);
      default: return [ID];
    }
  }

  // ---------- colour utils ----------
  function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function rgbToHex(r, g, b) { return '#' + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join(''); }
  function hsvToRgb(h, s, v) {
    const f = (n) => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
    return [f(5) * 255, f(3) * 255, f(1) * 255];
  }
  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0;
    if (d) { if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
    return [h, mx ? d / mx : 0, mx];
  }
  function setColor(hex, remember) {
    S.color = hex; store.set('color', hex); $('#btnColor span').style.background = hex;
    if (remember) { S.recents = [hex, ...S.recents.filter((c) => c !== hex)].slice(0, 10); store.set('recents', S.recents); }
  }

  // ---------- brush textures ----------
  const texCache = new Map();
  function makeTex(kind, rgb, d) {
    const c = document.createElement('canvas'); c.width = c.height = d; const x = c.getContext('2d');
    const im = x.createImageData(d, d); const r = d / 2;
    for (let j = 0; j < d; j++) for (let i = 0; i < d; i++) {
      const dx = (i + 0.5 - r) / r, dy = (j + 0.5 - r) / r, q = Math.sqrt(dx * dx + dy * dy); let a = 0;
      if (q < 1) {
        if (kind === 'pencil') a = (q < 0.55 ? 1 : 1 - (q - 0.55) / 0.45) * (0.35 + 0.65 * Math.random());
        else if (kind === 'charcoal') a = (1 - q * q * 0.6) * Math.pow(Math.random(), 1.4) * 1.3;
        else a = Math.pow(1 - q, 1.6);
      }
      const o = (j * d + i) * 4; im.data[o] = rgb[0]; im.data[o + 1] = rgb[1]; im.data[o + 2] = rgb[2]; im.data[o + 3] = clamp(a, 0, 1) * 255;
    }
    x.putImageData(im, 0, 0); return c;
  }
  function getTex(kind, rgb, size) {
    const d = Math.max(4, Math.round(size / 2) * 2); const key = kind + rgb.join() + d;
    let t = texCache.get(key);
    if (!t) { if (texCache.size > 60) texCache.clear(); t = [0, 1, 2].map(() => makeTex(kind, rgb, d)); texCache.set(key, t); }
    return t;
  }
  const maskCache = new Map();
  function circleMask(d) {
    let m = maskCache.get(d); if (m) return m;
    m = makeCanvas(d, d); const x = m.getContext('2d'); const g = x.createRadialGradient(d / 2, d / 2, 0, d / 2, d / 2, d / 2);
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.6, 'rgba(0,0,0,.8)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, d, d); if (maskCache.size > 30) maskCache.clear(); maskCache.set(d, m); return m;
  }

  // ---------- stroke engine ----------
  let stroke = null;
  const pointers = new Map(); let gesture = null, panning = null;
  const activeLayer = () => S.cur;

  function toDoc(e) {
    const r = vp.getBoundingClientRect();
    return { x: (e.clientX - r.left - V.tx) / V.s, y: (e.clientY - r.top - V.ty) / V.s, pr: e.pointerType === 'pen' ? (e.pressure || 0.5) : 1 };
  }
  function grow(st, x, y, r) {
    if (st.full) return;
    if (st.mats.length > 1) { st.full = true; return; }
    const b = st.bbox || (st.bbox = { x0: x, y0: y, x1: x, y1: y });
    b.x0 = Math.min(b.x0, x - r); b.y0 = Math.min(b.y0, y - r); b.x1 = Math.max(b.x1, x + r); b.y1 = Math.max(b.y1, y + r);
  }

  function beginStroke(e) {
    const T = TOOLS[S.tool];
    if (T.mode === 'pan') { startPan(e); return; }
    const p = toDoc(e);
    if (T.mode === 'pick') { pickColor(p); return; }
    const L = activeLayer();
    if (!L || !L.visible) { toast('This layer is hidden'); return; }
    if (T.mode === 'fill') { floodFill(p); return; }
    if (S.recents[0] !== S.color) { S.recents = [S.color, ...S.recents.filter((c) => c !== S.color)].slice(0, 10); store.set('recents', S.recents); }
    const useBuf = T.mode === 'shape' || T.buf || (T.mode === 'line' && !T.erase && T.op < 100);
    stroke = {
      T, L, useBuf, pts: [p], start: p, cur: p, carry: 0, lastMid: null, before: cloneCanvas(L.canvas), bbox: null, full: false,
      mats: T.mode === 'smudge' ? [[1, 0, 0, 1, 0, 0]] : symMats(), color: S.color, rgb: hexToRgb(S.color), size: T.size,
    };
    if (useBuf) {
      const after = L.canvas; after.after(strokeCanvas);
      strokeCanvas.style.opacity = (T.op / 100) * L.opacity;
      strokeCanvas.style.mixBlendMode = T.blend || 'normal';
      sctx.clearRect(0, 0, DOC.w, DOC.h);
    }
    if (T.mode === 'line') dot(stroke, p);
    else if (T.mode === 'stamp') stamp(stroke, p);
    else if (T.mode === 'smudge') { stroke.tmp = makeCanvas(Math.max(4, Math.round(T.size)), Math.max(4, Math.round(T.size))); stroke.lastStamp = p; }
    markStreak();
  }

  function dot(st, p) {
    const ctx = st.useBuf ? sctx : st.L.ctx; const w = st.size * (0.4 + 0.6 * p.pr);
    ctx.save(); setLineStyle(ctx, st);
    for (const m of st.mats) { ctx.save(); ctx.transform(...m); ctx.beginPath(); ctx.arc(p.x, p.y, w / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    ctx.restore(); grow(st, p.x, p.y, w);
  }
  function setLineStyle(ctx, st) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (st.T.erase) { ctx.globalCompositeOperation = 'destination-out'; ctx.strokeStyle = ctx.fillStyle = '#000'; ctx.globalAlpha = st.T.op / 100; }
    else { ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = ctx.fillStyle = st.color; ctx.globalAlpha = 1; }
  }
  function lineStep(st, final) {
    const n = st.pts.length; if (n < 2) return;
    const p0 = st.pts[n - 2], p1 = st.pts[n - 1];
    const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    const from = st.lastMid || p0; const w = st.size * (0.4 + 0.6 * p1.pr);
    const ctx = st.useBuf ? sctx : st.L.ctx;
    ctx.save(); setLineStyle(ctx, st); ctx.lineWidth = w;
    for (const m of st.mats) {
      ctx.save(); ctx.transform(...m); ctx.beginPath(); ctx.moveTo(from.x, from.y);
      if (final) ctx.lineTo(p1.x, p1.y); else ctx.quadraticCurveTo(p0.x, p0.y, mid.x, mid.y);
      ctx.stroke(); ctx.restore();
    }
    ctx.restore();
    grow(st, p0.x, p0.y, w + 4); grow(st, p1.x, p1.y, w + 4); grow(st, from.x, from.y, w + 4);
    if (!final) st.lastMid = mid;
  }

  function stamp(st, p) {
    const T = st.T, ctx = st.L.ctx; const kind = S.tool === 'pencil' ? 'pencil' : S.tool === 'charcoal' ? 'charcoal' : 'air';
    const sz = st.size * (kind === 'pencil' ? 0.7 + 0.5 * p.pr : 0.85 + 0.3 * p.pr);
    const tex = getTex(kind, st.rgb, sz); const d = tex[0].width;
    const alpha = (kind === 'pencil' ? 0.18 : kind === 'charcoal' ? 0.35 : 0.08) * (T.op / 100) * (0.55 + 0.45 * p.pr);
    ctx.save(); ctx.globalAlpha = clamp(alpha, 0.005, 1);
    for (const m of st.mats) {
      ctx.save(); ctx.transform(...m); ctx.translate(p.x, p.y);
      if (d >= 8) ctx.rotate(Math.random() * Math.PI * 2);
      ctx.drawImage(tex[(Math.random() * 3) | 0], -d / 2, -d / 2); ctx.restore();
    }
    ctx.restore(); grow(st, p.x, p.y, d);
  }
  function stampAlong(st, p0, p1) {
    const dx = p1.x - p0.x, dy = p1.y - p0.y, dist = Math.hypot(dx, dy); if (!dist) return;
    const sp = Math.max(0.8, st.size * (S.tool === 'airbrush' ? 0.12 : S.tool === 'charcoal' ? 0.2 : 0.25));
    let d = st.carry;
    while (d <= dist) {
      const t = d / dist; stamp(st, { x: p0.x + dx * t, y: p0.y + dy * t, pr: p0.pr + (p1.pr - p0.pr) * t });
      d += sp;
    }
    st.carry = d - dist;
  }
  function smudgeAlong(st, p0, p1) {
    const dx = p1.x - p0.x, dy = p1.y - p0.y, dist = Math.hypot(dx, dy); if (!dist) return;
    const d = st.tmp.width, sp = Math.max(1, d * 0.18), tctx = st.tmp.getContext('2d'), L = st.L;
    let walked = st.carry; let prev = st.lastStamp;
    while (walked <= dist) {
      const t = walked / dist; const q = { x: p0.x + dx * t, y: p0.y + dy * t };
      tctx.globalCompositeOperation = 'source-over'; tctx.clearRect(0, 0, d, d);
      tctx.drawImage(L.canvas, prev.x - d / 2, prev.y - d / 2, d, d, 0, 0, d, d);
      tctx.globalCompositeOperation = 'destination-in'; tctx.drawImage(circleMask(d), 0, 0);
      L.ctx.save(); L.ctx.globalAlpha = clamp(st.T.op / 100 * 0.6, 0.05, 1); L.ctx.drawImage(st.tmp, q.x - d / 2, q.y - d / 2); L.ctx.restore();
      grow(st, q.x, q.y, d); prev = q; walked += sp;
    }
    st.lastStamp = prev; st.carry = walked - dist;
  }

  function drawShape(st) {
    sctx.clearRect(0, 0, DOC.w, DOC.h);
    const a = st.start, b = st.cur, T = st.T;
    sctx.save(); sctx.lineCap = 'round'; sctx.lineJoin = 'round'; sctx.lineWidth = st.size; sctx.strokeStyle = sctx.fillStyle = st.color;
    for (const m of st.mats) {
      sctx.save(); sctx.transform(...m); sctx.beginPath();
      if (S.tool === 'line') { sctx.moveTo(a.x, a.y); sctx.lineTo(b.x, b.y); sctx.stroke(); }
      else if (S.tool === 'rect') { sctx.rect(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(b.x - a.x), Math.abs(b.y - a.y)); S.shapeFill ? sctx.fill() : sctx.stroke(); }
      else { sctx.ellipse((a.x + b.x) / 2, (a.y + b.y) / 2, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 2, 0, 0, Math.PI * 2); S.shapeFill ? sctx.fill() : sctx.stroke(); }
      sctx.restore();
    }
    sctx.restore();
    st.full = true; void T;
  }

  function moveStroke(e) {
    const st = stroke; if (!st) return;
    const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    for (const ev of (evs.length ? evs : [e])) {
      let p = toDoc(ev); const q = st.pts[st.pts.length - 1];
      if (st.T.mode === 'shape') { st.cur = p; continue; }
      const k = 1 - S.stab; p = { x: q.x + (p.x - q.x) * k, y: q.y + (p.y - q.y) * k, pr: q.pr + (p.pr - q.pr) * 0.5 };
      st.pts.push(p);
      if (st.T.mode === 'line') lineStep(st, false);
      else if (st.T.mode === 'stamp') stampAlong(st, q, p);
      else if (st.T.mode === 'smudge') smudgeAlong(st, q, p);
    }
    if (st.T.mode === 'shape') drawShape(st);
  }

  function cancelStroke() {
    if (!stroke) return; const st = stroke; stroke = null;
    st.L.ctx.save(); st.L.ctx.globalCompositeOperation = 'copy'; st.L.ctx.drawImage(st.before, 0, 0); st.L.ctx.restore();
    if (st.useBuf) { sctx.clearRect(0, 0, DOC.w, DOC.h); strokeCanvas.remove(); }
  }

  function finishStroke() {
    const st = stroke; if (!st) return; stroke = null;
    if (st.T.mode === 'line' && st.pts.length > 1) lineStep(st, true);
    if (st.T.mode === 'shape' && Math.hypot(st.cur.x - st.start.x, st.cur.y - st.start.y) < 2) { sctx.clearRect(0, 0, DOC.w, DOC.h); strokeCanvas.remove(); return; }
    if (st.useBuf) {
      const L = st.L; L.ctx.save(); L.ctx.globalAlpha = st.T.op / 100; L.ctx.globalCompositeOperation = st.T.blend || 'source-over';
      L.ctx.drawImage(strokeCanvas, 0, 0); L.ctx.restore(); sctx.clearRect(0, 0, DOC.w, DOC.h); strokeCanvas.remove();
    }
    commitPatch(st);
  }
  function commitPatch(st) {
    let r;
    if (st.full || !st.bbox) r = { x: 0, y: 0, w: DOC.w, h: DOC.h };
    else {
      const pad = 3, b = st.bbox;
      const x0 = clamp(Math.floor(b.x0 - pad), 0, DOC.w), y0 = clamp(Math.floor(b.y0 - pad), 0, DOC.h);
      const x1 = clamp(Math.ceil(b.x1 + pad), 0, DOC.w), y1 = clamp(Math.ceil(b.y1 + pad), 0, DOC.h);
      r = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    }
    if (r.w <= 0 || r.h <= 0) return;
    const L = st.L;
    const before = st.before.getContext('2d').getImageData(r.x, r.y, r.w, r.h);
    const after = L.ctx.getImageData(r.x, r.y, r.w, r.h);
    pushHistory({ undo() { L.ctx.putImageData(before, r.x, r.y); }, redo() { L.ctx.putImageData(after, r.x, r.y); } });
  }

  // ---------- pick / fill ----------
  function pickColor(p) {
    const x = Math.floor(p.x), y = Math.floor(p.y); if (x < 0 || y < 0 || x >= DOC.w || y >= DOC.h) return;
    const f = flatten(true); const d = f.getContext('2d').getImageData(x, y, 1, 1).data;
    setColor(rgbToHex(d[0], d[1], d[2]), true); toast('Colour picked');
  }
  function floodFill(p) {
    const L = activeLayer(), W = DOC.w, H = DOC.h, x0 = Math.floor(p.x), y0 = Math.floor(p.y);
    if (x0 < 0 || y0 < 0 || x0 >= W || y0 >= H) return;
    const src = flatten(false).getContext('2d').getImageData(0, 0, W, H).data;
    // fill respects what you see: paper counts as the background
    const bg = hexToRgb(S.paper);
    const px = (i) => { const a = src[i * 4 + 3] / 255; return [src[i * 4] * a + bg[0] * (1 - a), src[i * 4 + 1] * a + bg[1] * (1 - a), src[i * 4 + 2] * a + bg[2] * (1 - a)]; };
    const t = px(y0 * W + x0), tol = 48;
    const match = (i) => { const c = px(i); return Math.abs(c[0] - t[0]) <= tol && Math.abs(c[1] - t[1]) <= tol && Math.abs(c[2] - t[2]) <= tol; };
    const mask = new Uint8Array(W * H), stack = [x0, y0]; let minX = x0, maxX = x0, minY = y0, maxY = y0;
    while (stack.length) {
      const y = stack.pop(), x = stack.pop(); const i = y * W + x;
      if (mask[i] || !match(i)) continue;
      let xl = x; while (xl > 0 && !mask[y * W + xl - 1] && match(y * W + xl - 1)) xl--;
      let xr = x; while (xr < W - 1 && !mask[y * W + xr + 1] && match(y * W + xr + 1)) xr++;
      for (let k = xl; k <= xr; k++) mask[y * W + k] = 1;
      minX = Math.min(minX, xl); maxX = Math.max(maxX, xr); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      for (const dy of [-1, 1]) {
        const ny = y + dy; if (ny < 0 || ny >= H) continue; let inSpan = false;
        for (let k = xl; k <= xr; k++) {
          const ni = ny * W + k, ok = !mask[ni] && match(ni);
          if (ok && !inSpan) { stack.push(k, ny); inSpan = true; } else if (!ok) inSpan = false;
        }
      }
    }
    const pad = 3; const bx0 = Math.max(0, minX - pad), bx1 = Math.min(W - 1, maxX + pad), by0 = Math.max(0, minY - pad), by1 = Math.min(H - 1, maxY + pad);
    const bw = bx1 - bx0 + 1, bh = by1 - by0 + 1;
    const core = new ImageData(bw, bh), ring = new ImageData(bw, bh), rgb = hexToRgb(S.color);
    const inM = (x, y) => x >= 0 && y >= 0 && x < W && y < H && mask[y * W + x];
    for (let y = by0; y <= by1; y++) for (let x = bx0; x <= bx1; x++) {
      const o = ((y - by0) * bw + (x - bx0)) * 4;
      if (mask[y * W + x]) { core.data[o] = rgb[0]; core.data[o + 1] = rgb[1]; core.data[o + 2] = rgb[2]; core.data[o + 3] = 255; }
      else if (inM(x - 1, y) || inM(x + 1, y) || inM(x, y - 1) || inM(x, y + 1) || inM(x - 1, y - 1) || inM(x + 1, y + 1) || inM(x - 1, y + 1) || inM(x + 1, y - 1)) {
        ring.data[o] = rgb[0]; ring.data[o + 1] = rgb[1]; ring.data[o + 2] = rgb[2]; ring.data[o + 3] = 255;
      }
    }
    const before = L.ctx.getImageData(bx0, by0, bw, bh);
    const cc = makeCanvas(bw, bh); cc.getContext('2d').putImageData(core, 0, 0);
    const rc = makeCanvas(bw, bh); rc.getContext('2d').putImageData(ring, 0, 0);
    L.ctx.save(); L.ctx.globalAlpha = TOOLS.fill.op / 100;
    L.ctx.drawImage(cc, bx0, by0);
    L.ctx.globalCompositeOperation = 'destination-over'; L.ctx.drawImage(rc, bx0, by0);
    L.ctx.restore();
    const after = L.ctx.getImageData(bx0, by0, bw, bh);
    pushHistory({ undo() { L.ctx.putImageData(before, bx0, by0); }, redo() { L.ctx.putImageData(after, bx0, by0); } });
    markStreak();
  }

  // ---------- pointer handling ----------
  function startPan(e) { panning = { x: e.clientX, y: e.clientY, tx: V.tx, ty: V.ty }; V.fitted = false; }
  function startGesture() {
    const [a, b] = [...pointers.values()];
    gesture = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, s: V.s, tx: V.tx, ty: V.ty, t: performance.now(), moved: 0 };
    V.fitted = false;
  }
  function updateGesture() {
    const [a, b] = [...pointers.values()]; const g = gesture;
    const d = Math.hypot(a.x - b.x, a.y - b.y) || 1, mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, r = vp.getBoundingClientRect();
    const ns = clamp(g.s * d / g.d, fitScale() * 0.3, fitScale() * 20);
    const ax = (g.mx - r.left - g.tx) / g.s, ay = (g.my - r.top - g.ty) / g.s;
    V.s = ns; V.tx = mx - r.left - ax * ns; V.ty = my - r.top - ay * ns;
    g.moved = Math.max(g.moved, Math.abs(d - g.d) + Math.hypot(mx - g.mx, my - g.my)); applyView();
  }
  vp.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0 && e.button !== 1) return;
    try { vp.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) { cancelStroke(); panning = null; startGesture(); return; }
    if (pointers.size > 2) return;
    if (e.pointerType === 'mouse' && e.button === 1) { startPan(e); return; }
    beginStroke(e); e.preventDefault();
  });
  vp.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (gesture) { if (pointers.size >= 2) updateGesture(); return; }
    if (panning) { V.tx = panning.tx + e.clientX - panning.x; V.ty = panning.ty + e.clientY - panning.y; applyView(); return; }
    if (stroke) moveStroke(e);
  });
  function endPointer(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    if (gesture) {
      if (pointers.size < 2) {
        const g = gesture; gesture = null;
        if (performance.now() - g.t < 280 && g.moved < 12) undo();
      }
      return;
    }
    if (panning) { panning = null; return; }
    if (stroke) finishStroke();
  }
  vp.addEventListener('pointerup', endPointer);
  vp.addEventListener('pointercancel', endPointer);
  vp.addEventListener('contextmenu', (e) => e.preventDefault());
  vp.addEventListener('wheel', (e) => {
    e.preventDefault(); const r = vp.getBoundingClientRect();
    const f = Math.exp(-e.deltaY * 0.0015), ns = clamp(V.s * f, fitScale() * 0.3, fitScale() * 20);
    const ax = (e.clientX - r.left - V.tx) / V.s, ay = (e.clientY - r.top - V.ty) / V.s;
    V.s = ns; V.tx = e.clientX - r.left - ax * ns; V.ty = e.clientY - r.top - ay * ns; V.fitted = false; applyView();
  }, { passive: false });

  // ---------- layer operations ----------
  function refreshLayers() { syncLayersDOM(); }
  function addLayerOp() {
    if (S.layers.length >= 8) { toast('Up to 8 layers'); return; }
    const L = newLayer('Layer ' + (S.layers.length + 1)); const idx = S.layers.indexOf(S.cur) + 1; const prev = S.cur;
    S.layers.splice(idx, 0, L); S.cur = L; refreshLayers();
    pushHistory({ undo() { S.layers.splice(S.layers.indexOf(L), 1); S.cur = prev; refreshLayers(); }, redo() { S.layers.splice(idx, 0, L); S.cur = L; refreshLayers(); } });
  }
  function dupLayerOp() {
    if (S.layers.length >= 8) { toast('Up to 8 layers'); return; }
    const src = S.cur, L = newLayer(src.name + ' copy'); L.ctx.drawImage(src.canvas, 0, 0); L.opacity = src.opacity; L.blend = src.blend;
    const idx = S.layers.indexOf(src) + 1; S.layers.splice(idx, 0, L); S.cur = L; refreshLayers();
    pushHistory({ undo() { S.layers.splice(S.layers.indexOf(L), 1); S.cur = src; refreshLayers(); }, redo() { S.layers.splice(idx, 0, L); S.cur = L; refreshLayers(); } });
  }
  function deleteLayerOp() {
    if (S.layers.length === 1) { clearLayerOp(); return; }
    const L = S.cur, idx = S.layers.indexOf(L); S.layers.splice(idx, 1); S.cur = S.layers[Math.max(0, idx - 1)]; refreshLayers();
    pushHistory({ undo() { S.layers.splice(idx, 0, L); S.cur = L; refreshLayers(); }, redo() { S.layers.splice(S.layers.indexOf(L), 1); S.cur = S.layers[Math.max(0, idx - 1)]; refreshLayers(); } });
  }
  function moveLayerOp(dir) {
    const i = S.layers.indexOf(S.cur), j = i + dir; if (j < 0 || j >= S.layers.length) return;
    const swap = (a, b) => { [S.layers[a], S.layers[b]] = [S.layers[b], S.layers[a]]; refreshLayers(); };
    swap(i, j); pushHistory({ undo() { swap(j, i); }, redo() { swap(i, j); } });
  }
  function mergeDownOp() {
    const i = S.layers.indexOf(S.cur); if (i === 0) { toast('Nothing below to merge into'); return; }
    const top = S.cur, below = S.layers[i - 1], b0 = cloneCanvas(below.canvas);
    below.ctx.save(); below.ctx.globalAlpha = top.opacity; below.ctx.globalCompositeOperation = top.blend === 'normal' ? 'source-over' : top.blend; below.ctx.drawImage(top.canvas, 0, 0); below.ctx.restore();
    const b1 = cloneCanvas(below.canvas); S.layers.splice(i, 1); S.cur = below; refreshLayers();
    const setPix = (c) => { below.ctx.save(); below.ctx.globalCompositeOperation = 'copy'; below.ctx.drawImage(c, 0, 0); below.ctx.restore(); };
    pushHistory({ undo() { setPix(b0); S.layers.splice(i, 0, top); S.cur = top; refreshLayers(); }, redo() { setPix(b1); S.layers.splice(S.layers.indexOf(top), 1); S.cur = below; refreshLayers(); } });
  }
  function clearLayerOp() {
    const L = S.cur, b = cloneCanvas(L.canvas); L.ctx.clearRect(0, 0, DOC.w, DOC.h);
    const set = (c) => { L.ctx.save(); L.ctx.globalCompositeOperation = 'copy'; if (c) L.ctx.drawImage(c, 0, 0); else L.ctx.clearRect(0, 0, DOC.w, DOC.h); L.ctx.restore(); };
    pushHistory({ undo() { set(b); }, redo() { set(null); } });
  }

  // ---------- studio UI ----------
  function buildTools() {
    const box = $('#tools'); box.innerHTML = '';
    for (const [k, t] of Object.entries(TOOLS)) {
      const b = document.createElement('button'); b.className = 'tool' + (k === S.tool ? ' on' : ''); b.dataset.tool = k;
      b.innerHTML = ic(t.i, 22) + '<span>' + t.n + '</span>';
      b.addEventListener('click', () => selectTool(k)); box.appendChild(b);
    }
  }
  function selectTool(k) {
    S.tool = k; store.set('tool', k);
    $$('.tool').forEach((b) => b.classList.toggle('on', b.dataset.tool === k));
    const on = $('.tool.on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
    syncOpt();
  }
  function syncOpt() {
    const T = TOOLS[S.tool], hasSize = T.size > 0 || T.mode === 'shape';
    const sr = $('#sizeRange'), or = $('#opRange');
    $('#optbar').classList.toggle('nosize', !hasSize);
    sr.disabled = !hasSize; or.disabled = ['pick', 'pan'].includes(T.mode);
    sr.value = T.size || 1; or.value = T.op; $('#sizeVal').textContent = T.size || '-'; $('#opVal').textContent = T.op + '%';
  }
  $('#sizeRange').addEventListener('input', (e) => { const T = TOOLS[S.tool]; T.size = +e.target.value; $('#sizeVal').textContent = T.size; saveTools(); });
  $('#opRange').addEventListener('input', (e) => { const T = TOOLS[S.tool]; T.op = +e.target.value; $('#opVal').textContent = T.op + '%'; saveTools(); });
  $('#btnColor').addEventListener('click', openColorSheet);
  $('#btnLayers').addEventListener('click', openLayersSheet);
  $('#btnMenu').addEventListener('click', openMenuSheet);
  $('#docTitle').addEventListener('click', renameDoc);
  function renameDoc() { const n = prompt('Name this drawing', S.name); if (n && n.trim()) { S.name = n.trim().slice(0, 60); $('#docTitle').textContent = S.name; markDirty(); } }

  function openColorSheet() {
    const n = el(`<canvas id="svc" width="260" height="170"></canvas><input type="range" class="hue" id="hue" min="0" max="360" value="0">
      <div class="hexrow"><span class="chip" id="cprev"></span><input class="textin" id="hex" maxlength="7" autocapitalize="off" spellcheck="false"></div>
      <div class="sec"><span class="lab">Palette</span><div class="swatches" id="swA"></div></div>
      <div class="sec" id="recWrap"><span class="lab">Recent</span><div class="swatches" id="swR"></div></div>`);
    openSheet('Colour', n);
    const cv = $('#svc', n), cx = cv.getContext('2d'), hueIn = $('#hue', n), hex = $('#hex', n), prev = $('#cprev', n);
    let [h, s, v] = rgbToHsv(...hexToRgb(S.color));
    const draw = () => {
      const w = cv.width, ht = cv.height; cx.fillStyle = `hsl(${h},100%,50%)`; cx.fillRect(0, 0, w, ht);
      let g = cx.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#fff'); g.addColorStop(1, 'rgba(255,255,255,0)'); cx.fillStyle = g; cx.fillRect(0, 0, w, ht);
      g = cx.createLinearGradient(0, 0, 0, ht); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, '#000'); cx.fillStyle = g; cx.fillRect(0, 0, w, ht);
      cx.beginPath(); cx.arc(s * w, (1 - v) * ht, 8, 0, 7); cx.lineWidth = 3; cx.strokeStyle = '#fff'; cx.stroke(); cx.lineWidth = 1; cx.strokeStyle = '#000'; cx.stroke();
    };
    const apply = (commit) => { const c = rgbToHex(...hsvToRgb(h, s, v)); setColor(c, false); hex.value = c; prev.style.background = c; draw(); if (commit) setColor(c, true); };
    const pick = (e) => { const r = cv.getBoundingClientRect(); s = clamp((e.clientX - r.left) / r.width, 0, 1); v = 1 - clamp((e.clientY - r.top) / r.height, 0, 1); apply(false); };
    cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); pick(e); cv.onpointermove = pick; });
    cv.addEventListener('pointerup', () => { cv.onpointermove = null; apply(true); });
    hueIn.value = h; hueIn.addEventListener('input', () => { h = +hueIn.value; apply(false); });
    hueIn.addEventListener('change', () => apply(true));
    hex.addEventListener('change', () => { let t = hex.value.trim(); if (!t.startsWith('#')) t = '#' + t; if (/^#[0-9a-f]{6}$/i.test(t)) { [h, s, v] = rgbToHsv(...hexToRgb(t)); hueIn.value = h; apply(true); } });
    const fill = (id, list) => {
      const box = $(id, n); box.innerHTML = list.map((c) => `<button class="sw" data-c="${c}" style="background:${c}" aria-label="${c}"></button>`).join('');
      box.addEventListener('click', (e) => { const b = e.target.closest('.sw'); if (!b) return; [h, s, v] = rgbToHsv(...hexToRgb(b.dataset.c)); hueIn.value = h; apply(true); });
    };
    fill('#swA', PALETTE); fill('#swR', S.recents); if (!S.recents.length) $('#recWrap', n).classList.add('hidden');
    apply(false);
  }

  function openLayersSheet() {
    const n = document.createElement('div');
    const render = () => {
      const L = S.cur;
      n.innerHTML = `<div class="lrows">${S.layers.slice().reverse().map((l) => `<div class="lrow ${l === L ? 'on' : ''}" data-id="${l.id}">
        <button class="ib sm" data-a="vis" aria-label="Show or hide">${ic(l.visible ? 'eye' : 'eyeoff', 18)}</button>
        <button class="lname" data-a="sel">${esc(l.name)}</button>
        <select data-a="blend" aria-label="Blend mode">${BLENDS.map((b) => `<option ${b === l.blend ? 'selected' : ''}>${b}</option>`).join('')}</select></div>`).join('')}</div>
        <div class="sec"><label>Layer opacity <b id="lopv">${Math.round(L.opacity * 100)}%</b></label><input type="range" id="lop" min="0" max="100" value="${Math.round(L.opacity * 100)}"></div>
        <div class="lbtns">
          <button class="pill" data-a="add">${ic('plus', 16)} Add</button><button class="pill" data-a="dup">${ic('copy', 16)} Duplicate</button>
          <button class="pill" data-a="up">${ic('up', 16)} Up</button><button class="pill" data-a="down">${ic('down', 16)} Down</button>
          <button class="pill" data-a="merge">${ic('merge', 16)} Merge down</button><button class="pill" data-a="rename">${ic('edit', 16)} Rename</button>
          <button class="pill" data-a="clear">Clear</button><button class="pill" data-a="del">${ic('trash', 16)} Delete</button></div>`;
    };
    render(); openSheet('Layers', n);
    n.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a; const row = b.closest('.lrow');
      if (row) { const l = S.layers.find((x) => x.id === row.dataset.id); if (a === 'vis') { l.visible = !l.visible; refreshLayers(); markDirty(); } else if (a === 'sel') S.cur = l; }
      else if (a === 'add') addLayerOp(); else if (a === 'dup') dupLayerOp(); else if (a === 'del') deleteLayerOp();
      else if (a === 'up') moveLayerOp(1); else if (a === 'down') moveLayerOp(-1); else if (a === 'merge') mergeDownOp(); else if (a === 'clear') clearLayerOp();
      else if (a === 'rename') { const nm = prompt('Layer name', S.cur.name); if (nm && nm.trim()) { S.cur.name = nm.trim().slice(0, 30); markDirty(); } }
      render(); fillIcons(n);
    });
    n.addEventListener('change', (e) => {
      if (e.target.dataset.a === 'blend') { const row = e.target.closest('.lrow'); const l = S.layers.find((x) => x.id === row.dataset.id); l.blend = e.target.value; refreshLayers(); markDirty(); }
    });
    n.addEventListener('input', (e) => { if (e.target.id === 'lop') { S.cur.opacity = e.target.value / 100; S.cur.canvas.style.opacity = S.cur.opacity; $('#lopv', n).textContent = e.target.value + '%'; markDirty(); } });
  }

  function openMenuSheet() {
    const n = el(`
      <div class="sec"><label>Paper</label><div class="swatches" id="mPaper">${PAPERS.map((c) => `<button class="sw ${c === S.paper ? 'on' : ''}" data-c="${c}" style="background:${c}" aria-label="Paper ${c}"></button>`).join('')}</div></div>
      <div class="sec"><label>Symmetry</label><div class="pills" id="mSym">${SYMS.map(([k, t]) => `<button class="pill ${S.sym === k ? 'on' : ''}" data-k="${k}">${t}</button>`).join('')}</div></div>
      <div class="sec"><label>Stabiliser (smooth lines) <b id="stabv">${Math.round(S.stab * 100)}%</b></label><input type="range" id="mStab" min="0" max="80" value="${Math.round(S.stab * 100)}"></div>
      <div class="sec"><div class="toggle"><span>Show grid</span><input type="checkbox" id="mGrid" ${S.grid ? 'checked' : ''}></div>
        <div class="toggle"><span>Fill shapes (Box, Oval)</span><input type="checkbox" id="mFill" ${S.shapeFill ? 'checked' : ''}></div></div>
      <div class="sec"><label>Trace an image</label><div class="pills"><button class="pill" id="mRef">Choose photo</button><button class="pill" id="mRefX">Remove</button>
        <button class="pill ${S.ref.over ? 'on' : ''}" id="mRefO">On top</button></div>
        <input type="range" id="mRefOp" min="5" max="100" value="${S.ref.op}" style="margin-top:8px"></div>
      ${S.lesson ? `<div class="sec"><label>Lesson guide opacity</label><input type="range" id="mGop" min="10" max="100" value="${Math.round(S.guideOp * 100)}"></div>` : ''}
      <div class="list">
        <button class="item" id="mSave">${ic('download')} Save as picture (PNG)</button>
        <button class="item" id="mShare">${ic('share')} Share</button>
        <button class="item" id="mName">${ic('edit')} Rename drawing</button>
        <button class="item" id="mNew">${ic('plus')} New drawing</button>
      </div>`);
    openSheet('Canvas & options', n);
    $('#mPaper', n).addEventListener('click', (e) => { const b = e.target.closest('.sw'); if (!b) return; setPaper(b.dataset.c); $$('.sw', n).forEach((x) => x.classList.toggle('on', x === b)); markDirty(); });
    $('#mSym', n).addEventListener('click', (e) => { const b = e.target.closest('.pill'); if (!b) return; S.sym = b.dataset.k; $$('#mSym .pill', n).forEach((x) => x.classList.toggle('on', x === b)); });
    $('#mStab', n).addEventListener('input', (e) => { S.stab = e.target.value / 100; store.set('stab', S.stab); $('#stabv', n).textContent = e.target.value + '%'; });
    $('#mGrid', n).addEventListener('change', (e) => { S.grid = e.target.checked; $('#grid').style.display = S.grid ? 'block' : 'none'; });
    $('#mFill', n).addEventListener('change', (e) => { S.shapeFill = e.target.checked; });
    $('#mRef', n).addEventListener('click', () => $('#refInput').click());
    $('#mRefX', n).addEventListener('click', () => { S.ref.on = false; updateRef(); toast('Reference removed'); });
    $('#mRefO', n).addEventListener('click', (e) => { S.ref.over = !S.ref.over; e.currentTarget.classList.toggle('on', S.ref.over); updateRef(); });
    $('#mRefOp', n).addEventListener('input', (e) => { S.ref.op = +e.target.value; updateRef(); });
    const g = $('#mGop', n); if (g) g.addEventListener('input', (e) => { S.guideOp = e.target.value / 100; renderGuide(); });
    $('#mSave', n).addEventListener('click', () => exportPng(false));
    $('#mShare', n).addEventListener('click', () => exportPng(true));
    $('#mName', n).addEventListener('click', () => { closeSheet(); renameDoc(); });
    $('#mNew', n).addEventListener('click', async () => { closeSheet(); await saveDoc(); resetDoc(); V.fitted = true; requestAnimationFrame(fitView); toast('New drawing'); });
  }
  $('#refInput').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const url = URL.createObjectURL(f); S.ref.on = true; $('#refUnder').src = url; $('#refOver').src = url; updateRef(); e.target.value = ''; toast('Reference added - adjust opacity in Options');
  });
  function updateRef() {
    const u = $('#refUnder'), o = $('#refOver');
    u.style.display = S.ref.on && !S.ref.over ? 'block' : 'none'; o.style.display = S.ref.on && S.ref.over ? 'block' : 'none';
    u.style.opacity = o.style.opacity = S.ref.op / 100;
  }
  async function exportPng(share) {
    const c = flatten(true, 1); const blob = await new Promise((r) => c.toBlob(r, 'image/png')); const name = S.name.replace(/[^\w\- ]+/g, '').trim() || 'drawing';
    const file = new File([blob], name + '.png', { type: 'image/png' });
    if (share && navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: S.name }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name + '.png'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast('Saved to your downloads');
  }

  // ---------- lessons in studio ----------
  function currentLesson() { return S.lesson ? LESSONS.find((l) => l.id === S.lesson.id) : null; }
  function renderGuide() {
    const g = $('#guide'), L = currentLesson();
    $('#btnGuide').classList.toggle('hidden', !L);
    if (!L || !S.guideOn) { g.style.display = 'none'; return; }
    const gs = Math.min(DOC.w, DOC.h);
    g.style.display = 'block'; g.style.left = (DOC.w - gs) / 2 + 'px'; g.style.top = (DOC.h - gs) / 2 + 'px';
    g.style.width = gs + 'px'; g.style.height = gs + 'px'; g.style.opacity = S.guideOp;
    g.innerHTML = L.steps.slice(0, S.lesson.step + 1).map((s, i) => `<g class="gs ${i === S.lesson.step ? 'cur' : 'old'}">${s.svg}</g>`).join('');
  }
  function updateLessonCard() {
    const c = $('#lessonCard'), L = currentLesson();
    if (!L) { c.classList.add('hidden'); renderGuide(); return; }
    const st = L.steps[S.lesson.step], last = S.lesson.step === L.steps.length - 1;
    c.classList.remove('hidden');
    $('#lcCount').textContent = `${L.title} - step ${S.lesson.step + 1} of ${L.steps.length}`;
    $('#lcTitle').textContent = st.t; $('#lcText').textContent = st.d;
    $('#lcPrev').disabled = S.lesson.step === 0; $('#lcNext').textContent = last ? 'Finish lesson' : 'Next step';
    renderGuide();
  }
  $('#lcPrev').addEventListener('click', () => { if (S.lesson && S.lesson.step > 0) { S.lesson.step--; updateLessonCard(); markDirty(); } });
  $('#lcNext').addEventListener('click', () => {
    const L = currentLesson(); if (!L) return;
    if (S.lesson.step < L.steps.length - 1) { S.lesson.step++; updateLessonCard(); markDirty(); }
    else {
      const done = new Set(store.get('done', [])); done.add(L.id); store.set('done', [...done]);
      S.lesson = null; S.guideOn = false; updateLessonCard(); markDirty(); toast('Lesson complete! Nicely done.');
    }
  });
  $('#lcMin').addEventListener('click', () => { const c = $('#lessonCard'); c.classList.toggle('min'); $('#lcMin').innerHTML = ic(c.classList.contains('min') ? 'up' : 'down'); requestAnimationFrame(() => { if (V.fitted) fitView(); }); });
  $('#btnGuide').addEventListener('click', () => { S.guideOn = !S.guideOn; renderGuide(); toast(S.guideOn ? 'Guide on' : 'Guide hidden - draw from memory'); });

  // ---------- streak ----------
  function markStreak() {
    const s = store.get('streak', { last: '', count: 0 }), t = today(); if (s.last === t) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    s.count = s.last === y.toLocaleDateString('en-CA') ? s.count + 1 : 1; s.last = t; store.set('streak', s);
  }
  function streakCount() {
    const s = store.get('streak', { last: '', count: 0 }); if (!s.last) return 0;
    const y = new Date(); y.setDate(y.getDate() - 1);
    return s.last === today() || s.last === y.toLocaleDateString('en-CA') ? s.count : 0;
  }

  // ---------- views ----------
  const views = { learn: '#view-learn', gallery: '#view-gallery', studio: '#view-studio' };
  let current = 'learn';
  function showView(name) {
    current = name;
    Object.entries(views).forEach(([k, sel]) => $(sel).classList.toggle('active', k === name));
    $('#tabbar').classList.toggle('hidden', name === 'studio');
    $$('#tabbar button').forEach((b) => b.classList.toggle('on', b.dataset.tab === name));
    if (name === 'learn') renderLearn(); if (name === 'gallery') renderGallery();
    if (name === 'studio') requestAnimationFrame(() => { V.fitted = true; fitView(); });
  }
  function enterStudio() { if (current !== 'studio') { S.prevView = current; history.pushState({ v: 'studio' }, ''); } showView('studio'); }
  async function leaveStudio() { closeSheet(); clearTimeout(saveT); await saveDoc(); showView(S.prevView === 'studio' ? 'learn' : S.prevView || 'learn'); }
  $('#btnBack').addEventListener('click', () => { if (history.state && history.state.v === 'studio') history.back(); else leaveStudio(); });
  window.addEventListener('popstate', () => { if (current === 'studio') leaveStudio(); });
  $$('#tabbar button').forEach((b) => b.addEventListener('click', () => {
    const t = b.dataset.tab; if (t === 'studio') { enterStudio(); } else showView(t);
  }));

  function startLesson(id) { resetDoc({ w: 900, h: 1200, lesson: { id, step: 0 } }); selectTool('pencil'); enterStudio(); }
  function startFree() { resetDoc(); enterStudio(); }

  // ---------- learn view ----------
  let installEvt = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; if (current === 'learn') renderLearn(); });
  window.addEventListener('appinstalled', () => { installEvt = null; if (current === 'learn') renderLearn(); });
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

  async function renderLearn() {
    const root = $('#view-learn'), done = new Set(store.get('done', [])), sc = streakCount();
    const prompts = window.DAILY_PROMPTS, d = new Date(), doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5), prompt = prompts[doy % prompts.length];
    let recent = null; try { const all = await DB.all(); recent = all[0] || null; } catch (e) { /* ignore */ }
    const card = (l) => `<button class="lesson" data-lesson="${l.id}">${done.has(l.id) ? `<span class="done">${ic('check', 14)}</span>` : ''}
      <div class="thumb"><svg viewBox="0 0 100 100">${l.steps.map((s) => `<g class="gs">${s.svg}</g>`).join('')}</svg></div>
      <div><b>${esc(l.title)}</b><br><small>${l.steps.length} steps &middot; ${l.time}</small></div></button>`;
    const group = (lvl) => `<h2>${lvl}</h2><div class="lessons">${LESSONS.filter((l) => l.level === lvl).map(card).join('')}</div>`;
    root.innerHTML = `
      <div class="hero"><div><h1>OpenSketch</h1><p>Learn to draw. Free, with no ads.</p></div>
        <div class="streak" title="Days in a row">${ic('flame', 18)}<b>${sc}</b></div></div>
      ${installEvt && !isStandalone() ? `<div class="install"><span>Install OpenSketch on this phone</span><button class="btn" data-act="install">Install</button></div>` : ''}
      <div class="card today"><small>Today's sketch idea</small><div class="big">Draw ${esc(prompt)}</div>
        <div class="row"><button class="btn" data-act="free">Start drawing</button></div></div>
      ${recent ? `<button class="card continue" data-act="open" data-id="${recent.id}"><img alt="" src="${recent.thumb}"><div><b>Continue drawing</b><span>${esc(recent.name)}</span></div></button>` : ''}
      ${group('Foundations')}${group('First drawings')}
      <h2>Quick tips</h2><div class="tips">
        <div class="tip">Draw light first, then darken. Layer soft strokes to build shadows.</div>
        <div class="tip">Use the <b>Blend</b> tool to smooth shading, and the <b>Eraser</b> to lift highlights.</div>
        <div class="tip">Pinch to zoom, drag with two fingers to move, tap with two fingers to undo.</div>
        <div class="tip">Turn the guide off with the target icon to try a step from memory.</div></div>
      <p class="foot">Everything is free. Your drawings stay on your device.</p>`;
  }
  $('#view-learn').addEventListener('click', async (e) => {
    const l = e.target.closest('[data-lesson]'); if (l) { startLesson(l.dataset.lesson); return; }
    const a = e.target.closest('[data-act]'); if (!a) return;
    if (a.dataset.act === 'free') startFree();
    else if (a.dataset.act === 'open') { await loadDoc(a.dataset.id); enterStudio(); }
    else if (a.dataset.act === 'install' && installEvt) { installEvt.prompt(); await installEvt.userChoice; installEvt = null; renderLearn(); }
  });

  // ---------- gallery view ----------
  async function renderGallery() {
    const root = $('#view-gallery'); let all = []; try { all = await DB.all(); } catch (e) { /* ignore */ }
    root.innerHTML = `<h1>My art</h1>` + (all.length ? `<div class="ggrid">${all.map((d) => `<div class="gcard" data-id="${d.id}">
      <button class="im" data-act="open" aria-label="Open ${esc(d.name)}"><img alt="" src="${d.thumb}"></button>
      <div class="gmeta"><div><b>${esc(d.name)}</b><small>${new Date(d.updated).toLocaleDateString()}</small></div>
      <button class="ib sm" data-act="menu" aria-label="Options">${ic('more', 20)}</button></div></div>`).join('')}</div>`
      : `<div class="empty"><p>Nothing here yet.<br>Everything you draw is saved automatically.</p><button class="btn" data-act="new">Start drawing</button></div>`);
  }
  $('#view-gallery').addEventListener('click', async (e) => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    if (a.dataset.act === 'new') { startFree(); return; }
    const id = a.closest('.gcard') && a.closest('.gcard').dataset.id;
    if (a.dataset.act === 'open') { await loadDoc(id); enterStudio(); }
    else if (a.dataset.act === 'menu') openGallerySheet(id);
  });
  async function openGallerySheet(id) {
    const rec = await DB.get(id); if (!rec) return;
    const n = el(`<div class="list"><button class="item" data-a="open">${ic('brush')} Open</button><button class="item" data-a="rename">${ic('edit')} Rename</button>
      <button class="item" data-a="png">${ic('download')} Save as picture (PNG)</button><button class="item danger" data-a="del">${ic('trash')} Delete</button></div>`);
    openSheet(rec.name, n);
    n.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a;
      if (a === 'open') { closeSheet(); await loadDoc(id); enterStudio(); }
      else if (a === 'rename') { const nm = prompt('Rename', rec.name); if (nm && nm.trim()) { rec.name = nm.trim().slice(0, 60); await DB.put(rec); closeSheet(); renderGallery(); } }
      else if (a === 'png') { closeSheet(); await loadDoc(id); await exportPng(false); renderGallery(); }
      else if (a === 'del') { if (confirm('Delete this drawing? This cannot be undone.')) { await DB.del(id); closeSheet(); renderGallery(); } }
    });
  }

  // ---------- init ----------
  fillIcons(); buildTools(); setColor(S.color, false); resetDoc(); syncOpt(); renderLearn();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
  if (new URLSearchParams(location.search).get('new') === '1') startFree();
  window.__os = { S, DOC, V }; // handy for debugging
})();
