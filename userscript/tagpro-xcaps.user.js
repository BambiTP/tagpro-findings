// ==UserScript==
// @name         TagPro Expected Caps (replay overlay)
// @namespace    https://github.com/BambiTP/tagpro-findings
// @version      0.3.0
// @description  Each team's chance to cap in the next 30 s under the replay seek bar, every player's live net contribution (offense / denial), and flagged sharp drops. The heavy work runs on an xCaps server; the browser only draws.
// @match        https://tagpro.koalabeast.com/game?replay=*
// @match        http://*/game?replay=*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

/* Setup: the first time, the script asks for the server address (the cloudflared https URL) and the
   access key. Both are saved in this browser (localStorage). Click the panel title to change them.
   The server receives the replay's recorded packets (which this page already has), computes the whole
   game at once, and returns a small timeline. */

(function () {
  'use strict';
  const LS_URL = 'xcaps_server', LS_KEY = 'xcaps_token';
  let data = null, strip, ctx, panel, status = 'waiting for replay';

  function settings(force) {
    let url = localStorage.getItem(LS_URL), key = localStorage.getItem(LS_KEY);
    if (force || !url) { url = (prompt('xCaps server address (https://....trycloudflare.com)', url || '') || '').trim().replace(/\/$/, ''); if (url) localStorage.setItem(LS_URL, url); }
    if (force || !key) { key = (prompt('xCaps access key', key || '') || '').trim(); if (key) localStorage.setItem(LS_KEY, key); }
    return { url, key };
  }

  async function fetchTimeline() {
    const { url, key } = settings(false);
    if (!url) { status = 'no server set (click title)'; return; }
    // only the record types the server reads, and no circular references (the replay player keeps
    // internal links inside its packets)
    const KEEP = new Set(['recorder-metadata', 'map', 'time', 'p', 'mapupdate', 'score', 'playerLeft', 'end', 'postGameStats']);
    const rp = tagpro.replayPlayer.player;
    const src = (rp.origPackets && rp.origPackets.length ? rp.origPackets : rp.packets).filter((x) => Array.isArray(x) && KEEP.has(x[1]));
    const seen = new WeakSet();
    const text = JSON.stringify(src, (k, v) => {
      if (v && typeof v === 'object') { if (seen.has(v)) return undefined; seen.add(v); }
      return v;
    });
    let body = new Blob([text]);
    const headers = { 'Content-Type': 'application/json', 'X-Token': key || '' };
    if (window.CompressionStream) {            // gzip the upload: several times smaller
      body = await new Response(body.stream().pipeThrough(new CompressionStream('gzip'))).blob();
      headers['Content-Encoding'] = 'gzip';
    }
    status = 'computing on server...';
    try {
      const r = await fetch(url + '/xcaps', { method: 'POST', headers, body });
      const j = await r.json();
      if (!r.ok) { status = 'server error: ' + (j.error || r.status); return; }
      data = j; status = '';
    } catch (e) { status = 'cannot reach server (click title to change)'; }
  }

  function buildUI() {
    const seek = document.getElementById('replaySeekBar');
    strip = document.createElement('canvas');
    strip.title = "Chance to cap within 30 s (red / blue). Yellow ticks: one player's net contribution dropped sharply.";
    strip.style.cssText = 'position:fixed;height:46px;background:rgba(0,0,0,0.6);border-radius:3px;z-index:9998;pointer-events:none';
    document.body.appendChild(strip);
    ctx = strip.getContext('2d');
    panel = document.createElement('div');
    panel.style.cssText = 'position:fixed;right:8px;top:90px;z-index:9999;background:rgba(0,0,0,0.72);color:#eee;font:12px system-ui,sans-serif;padding:8px 10px;border-radius:6px;min-width:250px';
    document.body.appendChild(panel);
    panel.addEventListener('click', (e) => { if (e.target.dataset.cfg) { settings(true); data = null; fetchTimeline().then(drawStrip); } });
    const place = () => {
      const r = seek.getBoundingClientRect();
      strip.style.left = r.left + 'px'; strip.style.width = r.width + 'px'; strip.style.top = Math.max(4, r.bottom + 2) + 'px';
    };
    place(); setInterval(place, 500);
  }

  function drawStrip() {
    const w = strip.width = strip.clientWidth * devicePixelRatio, h = strip.height = strip.clientHeight * devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    if (!data) return;
    const max = Number(document.getElementById('replaySeekBar').max) || 1;
    const X = (ms) => (ms / max) * w, Y = (p) => h - 4 - p * (h - 8);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.beginPath(); ctx.moveTo(0, Y(0.5)); ctx.lineTo(w, Y(0.5)); ctx.stroke();
    for (const [arr, col] of [[data.red, '#ff4d4d'], [data.blue, '#4da3ff']]) {
      ctx.strokeStyle = col; ctx.lineWidth = 1.5 * devicePixelRatio; ctx.beginPath();
      arr.forEach((p, i) => { const x = X(data.t0_ms + i * data.tick_ms); if (i) ctx.lineTo(x, Y(p)); else ctx.moveTo(x, Y(p)); });
      ctx.stroke();
    }
    ctx.fillStyle = '#ffd400';
    for (const m of data.marks) ctx.fillRect(X(data.start_ms + m.t * 1000) - devicePixelRatio, 0, 2 * devicePixelRatio, h * 0.35);
  }

  function renderPanel() {
    const title = '<div style="font-weight:600;margin-bottom:4px;cursor:pointer" data-cfg="1" title="click to change server / key">Chance to cap in 30 s ⚙</div>';
    if (!data) { panel.innerHTML = title + `<div style="color:#aaa">${status}</div>`; return; }
    const now = tagpro.replayPlayer.player.currentTime;
    const i = Math.max(0, Math.min(data.red.length - 1, Math.round((now - data.t0_ms) / data.tick_ms)));
    const fmt = (v) => (v == null ? '–' : (v >= 0 ? '+' : '') + (v * 100).toFixed(1));
    const row = (pl) => {
      const o = pl.off[i], d = pl.den[i];
      if (o == null) return '';
      const c = o + d, bar = Math.min(60, Math.abs(c) * 400), col = c >= 0 ? '#5f5' : '#f55';
      return `<div style="display:flex;align-items:center;gap:6px;margin:2px 0">
        <span style="width:96px;overflow:hidden;white-space:nowrap;color:${pl.team === 1 ? '#ff8a8a' : '#8ac4ff'}">${pl.name}</span>
        <span style="display:inline-block;height:8px;width:${bar}px;background:${col}"></span><span>${fmt(c)}</span>
        <span style="color:#888;font-size:11px">(${fmt(o)} / ${fmt(d)})</span></div>`;
    };
    const tNow = (now - data.start_ms) / 1000;
    const recent = data.marks.filter((m) => m.t <= tNow).slice(-3).reverse()
      .map((m) => `<div style="color:#ffd400">${Math.floor(m.t / 60)}:${String(Math.floor(m.t % 60)).padStart(2, '0')} ${m.name} −${(m.drop * 100).toFixed(0)}</div>`).join('');
    panel.innerHTML = title + `<div><span style="color:#ff6b6b">Red ${(data.red[i] * 100).toFixed(0)}%</span> &nbsp; <span style="color:#6bb5ff">Blue ${(data.blue[i] * 100).toFixed(0)}%</span></div>
      <div style="margin:6px 0 2px;color:#aaa">Net contribution (offense / denial), points</div>
      ${data.players.filter((p) => p.team === 1).map(row).join('')}<div style="height:4px"></div>${data.players.filter((p) => p.team === 2).map(row).join('')}
      ${recent ? `<div style="margin-top:6px;color:#aaa">Recent sharp drops</div>${recent}` : ''}`;
  }

  const wait = setInterval(() => {
    const rp = window.tagpro && tagpro.replayPlayer && tagpro.replayPlayer.player;
    if (rp && rp.packets && rp.packets.length && document.getElementById('replaySeekBar')) {
      clearInterval(wait); buildUI();
      fetchTimeline().catch((e) => { status = 'error: ' + e.message; }).then(drawStrip);
      setInterval(renderPanel, 250);
      window.addEventListener('resize', drawStrip);
      setInterval(drawStrip, 2000);
    }
  }, 500);
})();
