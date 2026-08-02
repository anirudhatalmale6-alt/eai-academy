import mark from "../assets/empathetic-mark.png";
import oaiBadge from "../assets/openai-select-partner.png";

// Premium navy + gold completion certificate (PNG), generated client-side.
// Designed to be share-worthy on LinkedIn. No server or dependency needed.

const NAVY = "#16233f";
const NAVY2 = "#1e3a6e";
const CREAM = "#FBFAF6";
const INK = "#1b1b26";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

function goldGradient(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, "#8a6a24");
  g.addColorStop(0.25, "#e7cd82");
  g.addColorStop(0.5, "#c69b46");
  g.addColorStop(0.75, "#f0da97");
  g.addColorStop(1, "#9a7830");
  return g;
}

function letterspaced(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  spacing: number,
) {
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width + spacing);
  const total = widths.reduce((a, b) => a + b, 0) - spacing;
  let x = cx - total / 2;
  ctx.textAlign = "left";
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], x, y);
    x += widths[i];
  }
  ctx.textAlign = "center";
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
}

export function certId(name: string, course: string) {
  const s = (name + "|" + course).toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return "EAI-" + h.toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
}

// Opens LinkedIn's "Add to profile" for a certification, so students showcase
// the credential on their profile with a link back to the Academy.
export function linkedInAddUrl(name: string, courseTitle: string) {
  const now = new Date();
  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: courseTitle,
    organizationName: "Empathetic AI Academy",
    issueYear: String(now.getFullYear()),
    issueMonth: String(now.getMonth() + 1),
    certId: certId(name || "Student", courseTitle),
    certUrl: "https://academy.empathetic-ai.com",
  });
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}

export async function downloadCertificate(name: string, courseTitle: string) {
  const W = 1600;
  const H = 1131;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const person = name || "Student";

  const [logo, badge] = await Promise.all([loadImage(mark), loadImage(oaiBadge)]);
  // Ensure the handwriting signature font is ready before drawing.
  try {
    await (document as Document & { fonts: FontFaceSet }).fonts.load(
      "54px 'Great Vibes'",
    );
  } catch {
    /* falls back to cursive */
  }

  const star = (cx: number, cy: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? r * 0.45 : r;
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  };

  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);

  // Guilloche watermark
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = "#4a5b86";
  ctx.lineWidth = 1;
  for (let i = 0; i < 70; i++) {
    ctx.save();
    ctx.translate(W / 2, 560);
    ctx.rotate((i * Math.PI) / 35);
    ctx.beginPath();
    ctx.ellipse(0, 0, 250, 150, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  const tri = (p: number[], fill: string) => {
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    ctx.lineTo(p[2], p[3]);
    ctx.lineTo(p[4], p[5]);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  };
  tri([0, 0, 300, 0, 0, 300], NAVY);
  ctx.strokeStyle = goldGradient(ctx, 0, 0, 260, 260);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(300, 0);
  ctx.lineTo(0, 300);
  ctx.stroke();
  tri([W, H, W - 300, H, W, H - 300], NAVY);
  ctx.beginPath();
  ctx.moveTo(W - 300, H);
  ctx.lineTo(W, H - 300);
  ctx.stroke();

  // Gold borders
  ctx.strokeStyle = goldGradient(ctx, 50, 50, W - 50, H - 50);
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 50, W - 100, H - 100);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(64, 64, W - 128, H - 128);
  ctx.lineWidth = 2;
  const bx = 96;
  const bl = 34;
  (
    [
      [bx, bx, 1, 1],
      [W - bx, bx, -1, 1],
      [bx, H - bx, 1, -1],
      [W - bx, H - bx, -1, -1],
    ] as number[][]
  ).forEach(([x, y, sx, sy]) => {
    ctx.beginPath();
    ctx.moveTo(x + sx * bl, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + sy * bl);
    ctx.stroke();
  });

  ctx.textAlign = "center";

  // Header
  ctx.drawImage(logo, W / 2 - 34, 92, 68, 68);
  ctx.strokeStyle = goldGradient(ctx, W / 2 - 40, 92, W / 2 + 40, 160);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(W / 2, 126, 44, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = NAVY;
  ctx.font = "600 22px Georgia, serif";
  letterspaced(ctx, "EMPATHETIC AI ACADEMY", W / 2, 208, 6);

  ctx.fillStyle = NAVY;
  ctx.font = "700 66px Georgia, 'Times New Roman', serif";
  letterspaced(ctx, "CERTIFICATE", W / 2, 288, 4);
  ctx.font = "600 25px Georgia, serif";
  letterspaced(ctx, "OF COMPLETION", W / 2, 330, 7);
  ctx.strokeStyle = goldGradient(ctx, W / 2 - 220, 342, W / 2 + 220, 342);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 230, 340);
  ctx.lineTo(W / 2 - 120, 340);
  ctx.moveTo(W / 2 + 120, 340);
  ctx.lineTo(W / 2 + 230, 340);
  ctx.stroke();
  ctx.fillStyle = goldGradient(ctx, W / 2 - 130, 335, W / 2 - 110, 345);
  [-118, 118].forEach((dx) => {
    ctx.save();
    ctx.translate(W / 2 + dx, 340);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-4, -4, 8, 8);
    ctx.restore();
  });

  ctx.fillStyle = "#5c5b69";
  ctx.font = "italic 27px Georgia, serif";
  ctx.fillText("This certificate is proudly presented to", W / 2, 406);
  ctx.fillStyle = NAVY2;
  ctx.font = "700 74px Georgia, 'Times New Roman', serif";
  ctx.fillText(person, W / 2, 494);
  ctx.fillStyle = "#5c5b69";
  ctx.font = "italic 26px Georgia, serif";
  ctx.fillText("for successfully completing", W / 2, 556);
  ctx.fillStyle = INK;
  ctx.font = "700 38px Georgia, 'Times New Roman', serif";
  wrapText(ctx, courseTitle, W / 2, 616, W - 420, 48);

  // Ornate gold seal, centred
  const scx = W / 2;
  const scy = 770;
  const R = 72;
  ctx.fillStyle = goldGradient(ctx, scx - R, scy - R, scx + R, scy + R);
  ctx.beginPath();
  const pts = 48;
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * 2 * Math.PI - Math.PI / 2;
    const rr = i % 2 === 0 ? R + 16 : R + 6;
    const x = scx + Math.cos(a) * rr;
    const y = scy + Math.sin(a) * rr;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#8a6a24";
  ctx.beginPath();
  ctx.arc(scx, scy, R, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = goldGradient(ctx, scx - R, scy - R, scx + R, scy + R);
  ctx.beginPath();
  ctx.arc(scx, scy, R - 7, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "#fff8e6";
  star(scx, scy - 40, 11);
  ctx.drawImage(logo, scx - 28, scy - 18, 56, 56);
  ctx.fillStyle = NAVY;
  [-1, 1].forEach((s) => {
    ctx.beginPath();
    ctx.moveTo(scx + s * 34, scy + R + 6);
    ctx.lineTo(scx + s * 14, scy + R + 6);
    ctx.lineTo(scx + s * 24, scy + R + 46);
    ctx.lineTo(scx + s * 40, scy + R + 34);
    ctx.closePath();
    ctx.fill();
  });

  // Signature (left) in a handwriting font
  ctx.fillStyle = INK;
  ctx.font = "54px 'Great Vibes', 'Snell Roundhand', cursive";
  ctx.fillText("Empathetic AI", 360, 975);
  ctx.strokeStyle = goldGradient(ctx, 250, 992, 470, 992);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(250, 992);
  ctx.lineTo(470, 992);
  ctx.stroke();
  ctx.fillStyle = "#5c5b69";
  ctx.font = "500 18px Georgia, serif";
  ctx.fillText("Empathetic AI Academy", 360, 1020);

  // Date + id (centre)
  const dateStr = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  ctx.fillStyle = NAVY;
  ctx.font = "600 22px Georgia, serif";
  ctx.fillText(`Awarded ${dateStr}`, W / 2, 978);
  ctx.strokeStyle = goldGradient(ctx, W / 2 - 90, 996, W / 2 + 90, 996);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 90, 996);
  ctx.lineTo(W / 2 - 14, 996);
  ctx.moveTo(W / 2 + 14, 996);
  ctx.lineTo(W / 2 + 90, 996);
  ctx.stroke();
  ctx.fillStyle = "#7a7986";
  ctx.font = "400 17px Georgia, serif";
  ctx.fillText(`Certificate ID  ${certId(person, courseTitle)}`, W / 2, 1024);

  // OpenAI badge in white card (right)
  const bw = 200;
  const bh = (badge.height / badge.width) * bw || 95;
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#e2e2ea";
  ctx.lineWidth = 1;
  const cardX = 1240 - bw / 2 - 14;
  const cardY = 946 - bh / 2 - 12;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, bw + 28, bh + 24, 12);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(cardX, cardY, bw + 28, bh + 24);
    ctx.strokeRect(cardX, cardY, bw + 28, bh + 24);
  }
  ctx.drawImage(badge, 1240 - bw / 2, 946 - bh / 2, bw, bh);

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `Empathetic AI Academy Certificate - ${courseTitle}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
