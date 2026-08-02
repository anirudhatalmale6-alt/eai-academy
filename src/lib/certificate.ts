import mark from "../assets/empathetic-mark.png";
import oaiBadge from "../assets/openai-select-partner.png";

// Generates a refined, premium completion certificate (PNG) client-side.
// No server or dependency needed. Shareable on LinkedIn.

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
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

function certId(name: string, course: string) {
  const s = (name + "|" + course).toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return "EAI-" + h.toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
}

export async function downloadCertificate(name: string, courseTitle: string) {
  const W = 1600;
  const H = 1131;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const [logo, badge] = await Promise.all([
    loadImage(mark),
    loadImage(oaiBadge),
  ]);

  // Warm off-white background
  ctx.fillStyle = "#FCFBF9";
  ctx.fillRect(0, 0, W, H);

  // Faint watermark of the logo mark
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.drawImage(logo, W / 2 - 280, H / 2 - 300, 560, 560);
  ctx.restore();

  // Refined double border
  ctx.strokeStyle = "#2563EB";
  ctx.lineWidth = 2;
  ctx.strokeRect(44, 44, W - 88, H - 88);
  ctx.strokeStyle = "#cfe0fb";
  ctx.lineWidth = 1;
  ctx.strokeRect(62, 62, W - 124, H - 124);
  // Corner accents
  ctx.strokeStyle = "#2563EB";
  ctx.lineWidth = 2;
  const c = 26;
  [
    [62, 62, 1, 1],
    [W - 62, 62, -1, 1],
    [62, H - 62, 1, -1],
    [W - 62, H - 62, -1, -1],
  ].forEach(([x, y, sx, sy]) => {
    ctx.beginPath();
    ctx.moveTo(x + sx * c, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + sy * c);
    ctx.stroke();
  });

  ctx.textAlign = "center";

  // Header mark + wordmark
  ctx.drawImage(logo, W / 2 - 33, 98, 66, 66);
  ctx.fillStyle = "#8a8a97";
  ctx.font = "600 21px Inter, Arial, sans-serif";
  letterspaced(ctx, "EMPATHETIC AI ACADEMY", W / 2, 210, 4);

  // Title
  ctx.fillStyle = "#1E1D29";
  ctx.font = "700 56px Georgia, 'Times New Roman', serif";
  ctx.fillText("Certificate of Completion", W / 2, 302);

  // Divider with centre diamond
  ctx.strokeStyle = "#2563EB";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 95, 338);
  ctx.lineTo(W / 2 - 12, 338);
  ctx.moveTo(W / 2 + 12, 338);
  ctx.lineTo(W / 2 + 95, 338);
  ctx.stroke();
  ctx.fillStyle = "#2563EB";
  ctx.save();
  ctx.translate(W / 2, 338);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-5, -5, 10, 10);
  ctx.restore();

  // Recipient
  ctx.fillStyle = "#6b6a78";
  ctx.font = "italic 26px Georgia, serif";
  ctx.fillText("This certificate is proudly presented to", W / 2, 410);

  ctx.fillStyle = "#2563EB";
  ctx.font = "700 72px Georgia, 'Times New Roman', serif";
  ctx.fillText(name || "Student", W / 2, 502);

  ctx.fillStyle = "#6b6a78";
  ctx.font = "italic 26px Georgia, serif";
  ctx.fillText("for successfully completing", W / 2, 574);

  ctx.fillStyle = "#1E1D29";
  ctx.font = "600 40px Inter, Arial, sans-serif";
  wrapText(ctx, courseTitle, W / 2, 646, W - 360, 50);

  // Footer: signature (left), OpenAI badge (right), date + id (centre)
  ctx.textAlign = "center";
  ctx.fillStyle = "#1E1D29";
  ctx.font = "italic 40px Georgia, serif";
  ctx.fillText("Empathetic AI", 400, 930);
  ctx.strokeStyle = "#c9c8d4";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(280, 952);
  ctx.lineTo(520, 952);
  ctx.stroke();
  ctx.fillStyle = "#6b6a78";
  ctx.font = "500 19px Inter, Arial, sans-serif";
  ctx.fillText("Empathetic AI Academy", 400, 982);

  // Official OpenAI Select Partner badge, right
  const bw = 236;
  const bh = (badge.height / badge.width) * bw || 112;
  ctx.drawImage(badge, 1200 - bw / 2, 905 - bh / 2, bw, bh);

  // Date + certificate id, centre bottom
  const dateStr = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  ctx.fillStyle = "#4a4956";
  ctx.font = "500 22px Inter, Arial, sans-serif";
  ctx.fillText(`Awarded ${dateStr}`, W / 2, 1000);
  ctx.fillStyle = "#9a99a8";
  ctx.font = "400 17px Inter, Arial, sans-serif";
  ctx.fillText(`Certificate ID  ${certId(name, courseTitle)}`, W / 2, 1032);

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `Certificate - ${courseTitle}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
