import React, { useRef, useEffect } from "react";

// Safe roundRect utility that polyfills roundRect if missing
const drawRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | { tl: number; tr: number; bl: number; br: number }
) => {
  if ((ctx as any).roundRect) {
    try {
      (ctx as any).roundRect(x, y, w, h, r);
    } catch (e) {
      ctx.rect(x, y, w, h);
    }
  } else {
    ctx.rect(x, y, w, h);
  }
};

const drawStartups = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#F0F4FF'); bg.addColorStop(1, '#EBF0FF');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 18; i++) {
    const px = (Math.sin(i * 2.3 + t * .3) * 0.4 + 0.5) * W;
    const py = (Math.cos(i * 1.7 + t * .2) * 0.4 + 0.5) * H;
    const a = 0.3 + 0.3 * Math.sin(t + i);
    ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(27,79,216,${a})`; ctx.fill();
  }

  const cx = W * .52, cy = H * .52;
  [100, 148, 196].forEach((r, i) => {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(27,79,216,${.08 - i * .01})`; ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 7]); ctx.stroke(); ctx.setLineDash([]);
  });

  const ry = cy - 30 + Math.sin(t * .85) * 12;
  const rx = cx + Math.sin(t * .4) * 8;

  for (let i = 5; i > 0; i--) {
    ctx.beginPath();
    ctx.arc(rx + (i - 3) * 2, ry + 36 + i * 7 + Math.sin(t * 4 + i) * 3, 6 - i * .5, 0, Math.PI * 2);
    const colors = ['rgba(239,68,68,.9)', 'rgba(249,115,22,.8)', 'rgba(251,191,36,.7)', 'rgba(253,224,71,.4)', 'rgba(255,255,255,.1)'];
    ctx.fillStyle = colors[i - 1]; ctx.fill();
  }

  ctx.save(); ctx.translate(rx, ry);
  ctx.fillStyle = '#1B4FD8'; ctx.beginPath();
  ctx.moveTo(0, -44); ctx.bezierCurveTo(22, -44, 26, -10, 26, 20); ctx.lineTo(-26, 20); ctx.bezierCurveTo(-26, -10, -22, -44, 0, -44); ctx.fill();
  ctx.fillStyle = '#163EC0'; ctx.beginPath();
  ctx.moveTo(0, -60); ctx.bezierCurveTo(14, -60, 26, -44, 26, -30); ctx.lineTo(-26, -30); ctx.bezierCurveTo(-26, -44, -14, -60, 0, -60); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -10, 13, 0, Math.PI * 2); ctx.fillStyle = 'rgba(147,197,253,.9)'; ctx.fill();
  ctx.beginPath(); ctx.arc(0, -10, 9, 0, Math.PI * 2); ctx.fillStyle = '#DBEAFE'; ctx.fill();
  ctx.beginPath(); ctx.arc(-3, -13, 4, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fill();
  ctx.fillStyle = '#1E40AF';
  ctx.beginPath(); ctx.moveTo(-26, 10); ctx.lineTo(-46, 28); ctx.lineTo(-26, 28); ctx.fill();
  ctx.beginPath(); ctx.moveTo(26, 10); ctx.lineTo(46, 28); ctx.lineTo(26, 28); ctx.fill();
  ctx.restore();

  const metrics = [{ l: 'MRR', v: '$42K', c: '#1B4FD8', bg: '#EBF0FF', r: 100, a: 0 }, { l: 'Users', v: '12,400', c: '#10B981', bg: '#D1FAE5', r: 148, a: 2.1 }, { l: 'Runway', v: '18 mo', c: '#B45309', bg: '#FEF3C7', r: 100, a: 3.2 }, { l: 'Series A', v: '$8M', c: '#6D28D9', bg: '#F5F3FF', r: 148, a: 4.8 }];
  metrics.forEach((m, i) => {
    const a = t * (i % 2 === 0 ? .5 : -.4) + m.a;
    const mx = cx + m.r * Math.cos(a), my = cy + m.r * Math.sin(a);
    ctx.save(); ctx.translate(mx, my);
    ctx.fillStyle = m.bg; ctx.beginPath();
    drawRoundRect(ctx, -40, -22, 80, 44, 10);
    ctx.fill();
    ctx.strokeStyle = m.c + '40'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = m.c + '90'; ctx.font = '10px Inter'; ctx.textAlign = 'center'; ctx.fillText(m.l, 0, -6);
    ctx.fillStyle = m.c; ctx.font = 'bold 13px Inter'; ctx.fillText(m.v, 0, 11);
    ctx.restore();
  });
  ctx.textAlign = 'start';
};

const drawEdtech = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
  // Edtech page does not need any change (kept as-is from original local code)
  ctx.fillStyle = "#F8FAFC";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#7C3AED";
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "32px serif";
  ctx.textAlign = "center";
  ctx.fillText("🎓", w * 0.5, h * 0.5 + 10);

  ctx.strokeStyle = "rgba(124, 58, 237, 0.15)";
  ctx.lineWidth = 1.5;
  [100, 140, 180].forEach((r, i) => {
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
    ctx.setLineDash([4, 8]);
    ctx.stroke();
    ctx.setLineDash([]);
    const a = t * 0.3 * (i % 2 ? 1 : -1) + i * 2;
    const nx = w * 0.5 + r * Math.cos(a), ny = h * 0.5 + r * Math.sin(a);
    ctx.fillStyle = "white";
    ctx.beginPath();
    drawRoundRect(ctx, nx - 16, ny - 16, 32, 32, 8);
    ctx.fill();
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = "14px Inter";
    ctx.fillText(["📚", "✏️", "🧪", "🎨", "📐", "🧠"][i % 6], nx, ny + 4);
  });
};

const drawBooking = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#F0F9FF'); bg.addColorStop(1, '#E0F2FE');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const ox = W * .1, oy = H * .06, cw = W * .8, ch = H * .65;
  ctx.fillStyle = 'rgba(2,132,199,.08)'; ctx.beginPath();
  drawRoundRect(ctx, ox + 4, oy + 4, cw, ch, 16);
  ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath();
  drawRoundRect(ctx, ox, oy, cw, ch, 16);
  ctx.fill();
  ctx.strokeStyle = '#E0F2FE'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#0284C7'; ctx.beginPath();
  drawRoundRect(ctx, ox, oy, cw, 36, { tl: 16, tr: 16, bl: 0, br: 0 });
  ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center'; ctx.fillText('June 2024', ox + cw / 2, oy + 23);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cellW = (cw - 24) / 7, cellH = (ch - 58) / 5;
  days.forEach((d, i) => { ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = '10px Inter'; ctx.fillText(d, ox + 12 + i * cellW + cellW / 2, oy + 48) });

  const booked = new Set([3, 9, 15, 16, 22, 27]);
  const today = 14;
  const flashIdx = Math.floor(t * .5) % booked.size;
  let bArr = [...booked];

  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
    const n = r * 7 + c + 1; if (n > 30) continue;
    const dx = ox + 12 + c * cellW, dy = oy + 56 + r * cellH;
    const isBooked = booked.has(n), isToday = n === today;
    const isFlash = bArr[flashIdx] === n && Math.sin(t * 6) > .5;

    if (isBooked) {
      ctx.fillStyle = isFlash ? '#0EA5C9' : '#0284C7';
      ctx.beginPath(); ctx.arc(dx + cellW / 2, dy + cellH / 2, 14, 0, Math.PI * 2); ctx.fill();
      if (isFlash) { ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2; ctx.stroke(); }
      ctx.fillStyle = '#fff';
    } else if (isToday) {
      ctx.fillStyle = '#EBF0FF'; ctx.beginPath(); ctx.arc(dx + cellW / 2, dy + cellH / 2, 14, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#1B4FD8'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#1B4FD8';
    } else ctx.fillStyle = '#374151';
    ctx.font = (isToday ? 'bold ' : '') + '11px Inter'; ctx.fillText(String(n), dx + cellW / 2, dy + cellH / 2 + 4);
  }
  ctx.textAlign = 'start';

  const popY = H * .78 + Math.sin(t * .6) * 3;
  ctx.fillStyle = '#fff'; ctx.beginPath();
  drawRoundRect(ctx, W * .08, popY, W * .84, 46, 12);
  ctx.fill();
  ctx.strokeStyle = '#0284C7'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#0284C7'; ctx.font = 'bold 12px Inter'; ctx.fillText('✓  Appointment Confirmed', W * .14, popY + 17);
  ctx.fillStyle = '#6B7280'; ctx.font = '11px Inter'; ctx.fillText('June 14  ·  3:00 PM  ·  Dr. Riya Sharma', W * .14, popY + 34);
};

const drawFintech = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#F0F9FF'); bg.addColorStop(1, '#EBF0FF');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const cx = W / 2, cy = H * .48;

  [120, 170, 220].forEach((r) => {
    const grd = ctx.createRadialGradient(cx, cy, r * .6, cx, cy, r);
    grd.addColorStop(0, `rgba(27,79,216,.04)`); grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  });

  [[110, t * .6], [162, -t * .42], [214, t * .28]].forEach(([r]) => {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(27,79,216,.12)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 7]); ctx.stroke(); ctx.setLineDash([]);
  });

  const cg = ctx.createRadialGradient(cx - 14, cy - 14, 0, cx, cy, 48);
  cg.addColorStop(0, '#FBBF24'); cg.addColorStop(.7, '#F59E0B'); cg.addColorStop(1, '#D97706');
  const glowR = ctx.createRadialGradient(cx, cy, 0, cx, cy, 72);
  glowR.addColorStop(0, 'rgba(245,158,11,.25)'); glowR.addColorStop(1, 'transparent');
  ctx.fillStyle = glowR; ctx.beginPath(); ctx.arc(cx, cy, 72, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, 48, 0, Math.PI * 2); ctx.fillStyle = cg; ctx.fill();
  ctx.strokeStyle = 'rgba(245,158,11,.35)'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.fillStyle = '#7C2D12'; ctx.font = 'bold 16px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('DeFi', cx, cy);
  ctx.textBaseline = 'alphabetic';

  const ico1 = ['💳', '🔐', '💹', '🏦'];
  const ico2 = ['⛓️', '🤖', '📊', '🔑', '🌐'];
  const ico3 = ['💰', '📡', '🛡️', '⚡', '🏧'];
  [[110, ico1, t * .6], [162, ico2, -t * .42], [214, ico3, t * .28]].forEach(([r, ics, a]) => {
    (ics as string[]).forEach((ic, i) => {
      const ang = (a as number) + i * (Math.PI * 2 / (ics as string[]).length);
      const nx = cx + (r as number) * Math.cos(ang), ny = cy + (r as number) * Math.sin(ang);
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(nx, ny, 14, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(27,79,216,.12)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.font = '13px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(ic, nx, ny);
      ctx.textBaseline = 'alphabetic';
    });
  });

  const ea = t * .28 + 3.2; const ex = cx + 214 * Math.cos(ea), ey = cy + 214 * Math.sin(ea);
  ctx.fillStyle = '#EBF0FF'; ctx.beginPath();
  drawRoundRect(ctx, ex - 16, ey - 11, 32, 22, 6);
  ctx.fill();
  ctx.fillStyle = '#1B4FD8'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center'; ctx.fillText('ETH', ex, ey + 4);
  ctx.textAlign = 'start';
};

const drawEcommerce = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#F0F9FF'); bg.addColorStop(1, '#E0F2FE');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
 
  const prods = [{ x: .04, y: .38, e: '👟', n: 'Sneakers', p: '₹2,499', c: '#1B4FD8', bg: '#EBF0FF' },
  { x: .36, y: .32, e: '⌚', n: 'Smart Watch', p: '₹8,999', c: '#10B981', bg: '#D1FAE5' },
  { x: .66, y: .38, e: '👜', n: 'Handbag', p: '₹3,299', c: '#2563EB', bg: '#EFF6FF' }];
 
  prods.forEach((pr, i) => {
    const px = W * pr.x + Math.sin(t * .42 + i * 2) * 4;
    const py = H * pr.y + Math.cos(t * .38 + i * 1.8) * 4;
    const pw = W * .28, ph = H * .36;
    ctx.fillStyle = 'rgba(0,0,0,.05)'; ctx.beginPath();
    drawRoundRect(ctx, px + 3, py + 3, pw, ph, 14);
    ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath();
    drawRoundRect(ctx, px, py, pw, ph, 14);
    ctx.fill();
    ctx.strokeStyle = '#E5E7EB'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = pr.bg; ctx.beginPath();
    drawRoundRect(ctx, px + 6, py + 6, pw - 12, ph * .48, 10);
    ctx.fill();
    ctx.font = '28px serif'; ctx.textAlign = 'center'; ctx.fillText(pr.e, px + pw / 2, py + ph * .34);
    ctx.fillStyle = '#111827'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'left'; ctx.fillText(pr.n, px + 10, py + ph * .6);
    ctx.fillStyle = pr.c; ctx.font = 'bold 13px Inter'; ctx.fillText(pr.p, px + 10, py + ph * .75);
    ctx.fillStyle = '#2563EB'; ctx.font = '10px Inter'; ctx.fillText('★★★★★', px + 10, py + ph * .88);
  });
 
  const ctY = H * .07 + Math.abs(Math.sin(t * 1.2)) * 4;
  ctx.fillStyle = '#fff'; ctx.beginPath();
  drawRoundRect(ctx, W * .26, ctY, W * .48, 34, 10);
  ctx.fill();
  ctx.strokeStyle = '#2563EB'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#1E3A8A'; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center'; ctx.fillText('🛒  Cart: ₹14,697  —  Checkout', W * .5, ctY + 21);
  ctx.textAlign = 'start';
};

const drawManufacturing = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#F8FAFC'); bg.addColorStop(1, '#F1F5F9');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  function gear(cx: number, cy: number, R: number, n: number, a: number, fill: string, stroke: string) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
    ctx.beginPath();
    for (let i = 0; i < n * 2; i++) { const ang = i / n * Math.PI, r = i % 2 === 0 ? R : R * .76; ctx.lineTo(r * Math.cos(ang), r * Math.sin(ang)) }
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = stroke || 'rgba(0,0,0,.1)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, R * .3, 0, Math.PI * 2); ctx.fillStyle = '#F1F5F9'; ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  gear(W * .33, H * .42, 54, 12, t * .5, '#9CA3AF', '#6B7280');
  gear(W * .58, H * .4, 38, 9, -t * .72, '#CBD5E1', '#94A3B8');
  gear(W * .2, H * .6, 28, 8, t * .95, '#64748B', '#475569');
  gear(W * .7, H * .58, 24, 7, -t * .88, '#D1D5DB', '#9CA3AF');

  ctx.strokeStyle = 'rgba(100,116,139,.3)'; ctx.lineWidth = 3; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(W * .33, H * .42); ctx.lineTo(W * .58, H * .4); ctx.stroke();
  ctx.setLineDash([]);

  const rw = W * .46, rh = H * .58 + Math.sin(t * .7) * 3;
  ctx.fillStyle = '#1F2937'; ctx.beginPath();
  drawRoundRect(ctx, rw - 13, rh, 26, 28, 5);
  ctx.fill();
  ctx.fillStyle = '#374151'; ctx.beginPath();
  drawRoundRect(ctx, rw - 10, rh - 20, 20, 20, 5);
  ctx.fill();
  ctx.fillStyle = '#10B981'; ctx.beginPath(); ctx.arc(rw - 3.5, rh - 11, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#F59E0B'; ctx.beginPath(); ctx.arc(rw + 4, rh - 11, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1F2937'; ctx.beginPath();
  drawRoundRect(ctx, rw - 18, rh + 2, 6, 16, 2);
  ctx.fill();
  ctx.beginPath();
  drawRoundRect(ctx, rw + 12, rh + 2, 6, 16, 2);
  ctx.fill();
  ctx.beginPath();
  drawRoundRect(ctx, rw - 9, rh + 28, 8, 14, 3);
  ctx.fill();
  ctx.beginPath();
  drawRoundRect(ctx, rw + 1, rh + 28, 8, 14, 3);
  ctx.fill();

  const oee = .78 + Math.sin(t * .28) * .02;
  ctx.fillStyle = '#fff'; ctx.beginPath();
  drawRoundRect(ctx, W * .08, H * .82, W * .84, 38, 12);
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB'; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = '#374151'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'left'; ctx.fillText('OEE Live', W * .13, H * .82 + 14);
  ctx.fillStyle = '#10B981'; ctx.font = 'bold 16px Inter'; ctx.fillText(Math.round(oee * 100) + '%', W * .13, H * .82 + 32);
  ctx.fillStyle = '#E5E7EB'; ctx.beginPath();
  drawRoundRect(ctx, W * .3, H * .82 + 22, W * .58, 7, 4);
  ctx.fill();
  ctx.fillStyle = '#10B981'; ctx.beginPath();
  drawRoundRect(ctx, W * .3, H * .82 + 22, W * .58 * oee, 7, 4);
  ctx.fill();
  ctx.textAlign = 'start';
};

const drawRealestate = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#FFF7ED'); bg.addColorStop(1, '#FFEDD5');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  function house(x: number, y: number, s: number, body: string, roof: string) {
    ctx.fillStyle = roof; ctx.beginPath(); ctx.moveTo(x, y - s * .54); ctx.lineTo(x + s, y); ctx.lineTo(x - s, y); ctx.closePath(); ctx.fill();
    ctx.fillStyle = body; ctx.beginPath();
    drawRoundRect(ctx, x - s * .75, y, s * 1.5, s * .9, { bl: 6, br: 6, tl: 0, tr: 0 });
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.42)'; ctx.beginPath();
    drawRoundRect(ctx, x - s * .2, y + s * .25, s * .4, s * .38, 3);
    ctx.fill();
  }
  house(W * .2, H * .58 + Math.sin(t * .68) * 4, 54, '#FDBA74', '#F97316');
  house(W * .5, H * .52 + Math.sin(t * .6 + 1) * 5, 68, '#FCA5A5', '#EF4444');
  house(W * .78, H * .58 + Math.sin(t * .78 + 2) * 4, 46, '#A5F3FC', '#0284C7');
  house(W * .08, H * .7, 34, '#C4B5FD', '#7C3AED');
  house(W * .88, H * .68, 30, '#BBF7D0', '#10B981');

  ctx.fillStyle = 'rgba(0,0,0,.04)'; ctx.fillRect(0, H * .82, W, 2);

  [{ x: .32, y: .1, p: '₹1.2 Cr', c: '#F97316' }, { x: .6, y: .16, p: '₹85 L', c: '#EF4444' }, { x: .62, y: .54, p: '₹48 L', c: '#0284C7' }].forEach((tg, i) => {
    const tx = W * tg.x + Math.sin(t * .55 + i * 1.8) * 4, ty = H * tg.y + Math.cos(t * .45 + i * 1.5) * 3;
    ctx.fillStyle = '#fff'; ctx.beginPath();
    drawRoundRect(ctx, tx, ty, 88, 28, 8);
    ctx.fill();
    ctx.strokeStyle = tg.c; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = tg.c; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center'; ctx.fillText(tg.p, tx + 44, ty + 18);
  });

  const pinX = W * .5 + Math.sin(t * .38) * 5;
  const pinBounce = Math.abs(Math.sin(t * 1.5)) * 8;
  const pinY = H * .34 - pinBounce;
  ctx.fillStyle = '#EF4444'; ctx.beginPath(); ctx.arc(pinX, pinY - 8, 13, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(pinX, pinY + 4); ctx.lineTo(pinX - 8, pinY - 8); ctx.lineTo(pinX + 8, pinY - 8); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = '11px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('📍', pinX, pinY - 8);
  ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(pinX, H * .54, pinBounce * .4 + 4, 2, 0, 0, Math.PI * 2); ctx.fill();
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'start';
};

const drawLegal = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#FDF4FF'); bg.addColorStop(1, '#FCE7F3');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const sx = W * .52, sy = H * .44, sw = Math.sin(t * .65) * .14;
  ctx.strokeStyle = '#9CA3AF'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(sx, sy + 10); ctx.lineTo(sx, sy - 62); ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(sx - 70, sy - 62 + sw * 16); ctx.lineTo(sx + 70, sy - 62 - sw * 16); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(sx - 70, sy - 62 + sw * 16); ctx.lineTo(sx - 70, sy - 30 + sw * 16); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(sx + 70, sy - 62 - sw * 16); ctx.lineTo(sx + 70, sy - 30 - sw * 16); ctx.stroke();
  ctx.fillStyle = '#E5E7EB';
  ctx.beginPath(); ctx.ellipse(sx - 70, sy - 28 + sw * 16, 26, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#9CA3AF'; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(sx + 70, sy - 28 - sw * 16, 26, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.font = '14px serif'; ctx.textAlign = 'center';
  ctx.fillText('📄', sx - 70, sy - 30 + sw * 16);
  ctx.fillText('⚖️', sx + 70, sy - 28 - sw * 16);
  ctx.fillStyle = '#6B7280'; ctx.beginPath();
  drawRoundRect(ctx, sx - 24, sy + 10, 48, 10, 4);
  ctx.fill();
  ctx.beginPath();
  drawRoundRect(ctx, sx - 14, sy + 18, 28, 8, 3);
  ctx.fill();

  [2, 1, 0].forEach(i => {
    const dx = W * .08 + i * 5, dy = H * .55 + i * 6;
    ctx.fillStyle = ['#fff', '#FDF4FF', '#FCE7F3'][i];
    ctx.beginPath();
    drawRoundRect(ctx, dx, dy, W * .35, H * .3, 10);
    ctx.fill();
    ctx.strokeStyle = '#E5E7EB'; ctx.lineWidth = 1; ctx.stroke();
    if (i === 0) {
      ['Case #4421', 'Client: Sharma Ltd.', '● In Progress', '✓ Filed'].forEach((l, li) => {
        ctx.fillStyle = li === 2 ? '#F59E0B' : li === 3 ? '#10B981' : '#9CA3AF';
        ctx.font = (li === 0 ? 'bold ' : '') + '11px Inter';
        ctx.textAlign = 'left'; ctx.fillText(l, dx + 10, dy + 20 + li * 18);
      });
      ctx.fillStyle = '#7C3AED'; ctx.beginPath(); ctx.arc(dx + W * .35 - 18, dy + H * .3 - 18, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '10px Inter'; ctx.textAlign = 'center'; ctx.fillText('✓', dx + W * .35 - 18, dy + H * .3 - 14);
    }
  });
  ctx.textAlign = 'start';
};

const drawConsulting = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#EFF4FF'); bg.addColorStop(1, '#F5F3FF');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const pts = [[.08, .76], [.2, .63], [.3, .52], [.42, .6], [.54, .38], [.66, .28], [.78, .2], [.9, .12]];
  ctx.beginPath();
  pts.forEach((p, i) => { const x = W * p[0], y = H * p[i === 7 ? 1 : i] + Math.sin(t * .3 + i) * .5 * 2; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) });
  ctx.lineTo(W * .9, H * .82); ctx.lineTo(W * .08, H * .82); ctx.closePath();
  const ag = ctx.createLinearGradient(0, 0, 0, H * .82); ag.addColorStop(0, 'rgba(27,79,216,.12)'); ag.addColorStop(1, 'rgba(27,79,216,.01)');
  ctx.fillStyle = ag; ctx.fill();

  ctx.strokeStyle = '#1B4FD8'; ctx.lineWidth = 2.8; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath();
  pts.forEach((p, i) => { const x = W * p[0], y = H * p[i === 7 ? 1 : i]; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) });
  ctx.stroke();

  pts.forEach((p, i) => {
    const x = W * p[0], y = H * p[i === 7 ? 1 : i] + Math.sin(t * .4 + i) * .5 * 3;
    ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fillStyle = '#1B4FD8'; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
    if (i === 7) {
      ctx.fillStyle = '#EBF0FF'; ctx.beginPath();
      drawRoundRect(ctx, x - 34, y - 34, 68, 24, 8);
      ctx.fill();
      ctx.strokeStyle = '#1B4FD8'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#1B4FD8'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center'; ctx.fillText('↑ 38% ROI', x, y - 17);
    }
  });

  [.4, .55, .7].forEach(gy => {
    ctx.strokeStyle = 'rgba(0,0,0,.04)'; ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
    ctx.beginPath(); ctx.moveTo(W * .08, H * gy); ctx.lineTo(W * .9, H * gy); ctx.stroke(); ctx.setLineDash([]);
  });

  [{ x: .2, c: '#1B4FD8' }, { x: .5, c: '#6D28D9' }, { x: .78, c: '#9D174D' }].forEach((p, i) => {
    const wx = W * p.x + Math.sin(t * .42 + i * 2) * 2, wy = H * .89;
    const lg = Math.sin(t * 1.8 + i * 1.4) * 8;
    ctx.fillStyle = '#FBBF24'; ctx.beginPath(); ctx.arc(wx, wy - 30, 9, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = p.c; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(wx, wy - 21); ctx.lineTo(wx, wy - 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wx, wy - 7); ctx.lineTo(wx + lg, wy + 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wx, wy - 7); ctx.lineTo(wx - lg, wy + 8); ctx.stroke();
    ctx.fillStyle = p.c; ctx.beginPath();
    drawRoundRect(ctx, wx + 8, wy - 18, 12, 9, 3);
    ctx.fill();
  });
  ctx.textAlign = 'start';
};

const drawMarketing = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#FAF5FF'); bg.addColorStop(1, '#F5F0FF');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const mx = W * .2, my = H * .42 + Math.sin(t * .78) * 6;
  ctx.fillStyle = '#6D28D9'; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + 78, my - 28); ctx.lineTo(mx + 78, my + 28); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#5B21B6'; ctx.beginPath();
  drawRoundRect(ctx, mx - 24, my - 18, 28, 36, 7);
  ctx.fill();
  ctx.fillStyle = '#8B5CF6'; ctx.beginPath();
  drawRoundRect(ctx, mx - 22, my - 16, 24, 32, 6);
  ctx.fill();

  [1, 2, 3].forEach(i => {
    const wave = Math.max(0, Math.sin(t * 2.5 - i * .8));
    ctx.strokeStyle = `rgba(109,40,217,${wave * .6})`; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(mx + 80, my, 18 * i, -.54, .54); ctx.stroke();
  });

  ['❤️', '👍', '📣', '🔥', '💬', '✨'].forEach((e, i) => {
    const ang = t * .55 + i * 1.05, r = 72 + i * 10;
    const ex = mx + 80 + r * Math.cos(ang) * .62, ey = my + r * Math.sin(ang) * .52;
    ctx.font = '16px serif'; ctx.textAlign = 'center'; ctx.fillText(e, ex, ey);
  });

  const bars = [{ l: 'Meta', v: .62, c: '#1B4FD8' }, { l: 'Google', v: .78, c: '#EF4444' }, { l: 'Email', v: .88, c: '#6D28D9' }, { l: 'SEO', v: .55, c: '#10B981' }, { l: 'SMS', v: .42, c: '#F59E0B' }];
  const bw = W * .09, gap = W * .022, ox = W * .46, maxH = H * .44;
  bars.forEach((b, i) => {
    const x = ox + i * (bw + gap);
    const animV = b.v * (0.5 + 0.5 * Math.min(1, t / 3 + i * .1));
    const bh = maxH * animV;
    ctx.fillStyle = b.c + '20'; ctx.beginPath();
    drawRoundRect(ctx, x, H * .8 - maxH, bw, maxH, 4);
    ctx.fill();
    ctx.fillStyle = b.c; ctx.beginPath();
    drawRoundRect(ctx, x, H * .8 - bh, bw, bh, 4);
    ctx.fill();
    ctx.fillStyle = '#374151'; ctx.font = '9px Inter'; ctx.textAlign = 'center'; ctx.fillText(b.l, x + bw / 2, H * .84);
    ctx.fillStyle = b.c; ctx.font = 'bold 9px Inter'; ctx.fillText(Math.round(animV * 100) + '%', x + bw / 2, H * .8 - bh - 4);
  });
  ctx.textAlign = 'start';
};

const drawHealthtech = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
  ctx.fillStyle = "#F8FAFC";
  ctx.fillRect(0, 0, w, h);
  const pts: { x: number; y: number }[] = [];
  for (let x = 0; x < w; x++) {
    const p = (x + t * 60) % w;
    let y = h * 0.5;
    if (p > w * 0.2 && p < w * 0.25) y = h * 0.5 - 20;
    else if (p > w * 0.25 && p < w * 0.28) y = h * 0.5 + 80;
    else if (p > w * 0.28 && p < w * 0.32) y = h * 0.5 - 120;
    else if (p > w * 0.32 && p < w * 0.36) y = h * 0.5 + 30;
    else if (p > w * 0.36 && p < w * 0.4) y = h * 0.5 - 10;
    else if (p > w * 0.7 && p < w * 0.72) y = h * 0.5 - 15;
    else if (p > w * 0.72 && p < w * 0.74) y = h * 0.5 + 60;
    else if (p > w * 0.74 && p < w * 0.77) y = h * 0.5 - 90;
    else if (p > w * 0.77 && p < w * 0.8) y = h * 0.5 + 25;
    pts.push({ x, y });
  }
  ctx.strokeStyle = "#EF4444";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  pts.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.stroke();

  const heartY = h * 0.5 + Math.sin(t * 5) * 5;
  ctx.font = "32px serif";
  ctx.textAlign = "center";
  ctx.fillText("❤️", w * 0.5, heartY);
};

const drawLogistics = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
  ctx.fillStyle = "#F8FAFC";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#E2E8F0";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(w * 0.1, h * 0.7);
  ctx.bezierCurveTo(w * 0.3, h * 0.3, w * 0.6, h * 0.9, w * 0.9, h * 0.5);
  ctx.stroke();
  ctx.setLineDash([]);

  const pos = (t * 0.1) % 1;
  const cx = w * 0.1 + (w * 0.8) * pos;
  const cy = h * 0.7 * (1 - pos) + h * 0.5 * pos + Math.sin(pos * Math.PI * 4) * 40;

  ctx.font = "28px serif";
  ctx.textAlign = "center";
  ctx.fillText("🚚", cx, cy + 8);
};

const drawNonprofit = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
  ctx.fillStyle = "#F8FAFC";
  ctx.fillRect(0, 0, w, h);
  const scale = 1 + Math.sin(t * 2) * 0.05;
  ctx.save();
  ctx.translate(w * 0.5, h * 0.5);
  ctx.scale(scale, scale);
  ctx.font = "56px serif";
  ctx.textAlign = "center";
  ctx.fillText("🤝", 0, 18);
  ctx.restore();
};

const drawDefault = (ctx: CanvasRenderingContext2D, w: number, h: number, _t: number) => {
  ctx.fillStyle = "#F8FAFC";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#E2E8F0";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, 40, 0, Math.PI * 2);
  ctx.stroke();
};

export interface IndustryCanvasProps {
  industryKey: string;
}

export const IndustryCanvas: React.FC<IndustryCanvasProps> = ({ industryKey }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    let animationFrameId: number;
    let time = 0;

    const loop = () => {
      time += 0.016; // Approx. 60 FPS delta
      
      switch (industryKey) {
        case "startups": drawStartups(ctx, W, H, time); break;
        case "edtech": drawEdtech(ctx, W, H, time); break;
        case "booking": drawBooking(ctx, W, H, time); break;
        case "fintech": drawFintech(ctx, W, H, time); break;
        case "healthtech": drawHealthtech(ctx, W, H, time); break;
        case "ecommerce": drawEcommerce(ctx, W, H, time); break;
        case "manufacturing": drawManufacturing(ctx, W, H, time); break;
        case "real-estate": drawRealestate(ctx, W, H, time); break;
        case "legal": drawLegal(ctx, W, H, time); break;
        case "consulting": drawConsulting(ctx, W, H, time); break;
        case "marketing": drawMarketing(ctx, W, H, time); break;
        case "logistics": drawLogistics(ctx, W, H, time); break;
        case "non-profit": drawNonprofit(ctx, W, H, time); break;
        default: drawDefault(ctx, W, H, time); break;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [industryKey]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", borderRadius: "20px", background: "#F8FAFC", border: "1px solid #E2E8F0" }}
    />
  );
};

export default IndustryCanvas;
