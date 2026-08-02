import mark from "../assets/empathetic-mark.png";

// Generates a downloadable certificate image (PNG) client-side, no server or
// dependency needed. Shareable on LinkedIn etc.
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

export async function downloadCertificate(name: string, courseTitle: string) {
  const W = 1600;
  const H = 1131;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background + borders
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#3B82F6";
  ctx.lineWidth = 10;
  ctx.strokeRect(46, 46, W - 92, H - 92);
  ctx.strokeStyle = "#cfe0fb";
  ctx.lineWidth = 2;
  ctx.strokeRect(66, 66, W - 132, H - 132);

  // Logo mark
  const img = new Image();
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = mark;
  });
  const ms = 120;
  ctx.drawImage(img, W / 2 - ms / 2, 120, ms, ms);

  ctx.textAlign = "center";

  ctx.fillStyle = "#6b6a78";
  ctx.font = "600 24px Inter, Arial, sans-serif";
  ctx.fillText("E M P A T H E T I C   A I   A C A D E M Y", W / 2, 292);

  ctx.fillStyle = "#1E1D29";
  ctx.font = "700 62px Georgia, 'Times New Roman', serif";
  ctx.fillText("Certificate of Completion", W / 2, 392);

  ctx.fillStyle = "#6b6a78";
  ctx.font = "400 27px Inter, Arial, sans-serif";
  ctx.fillText("This certificate is proudly presented to", W / 2, 470);

  ctx.fillStyle = "#2563EB";
  ctx.font = "700 74px Georgia, 'Times New Roman', serif";
  ctx.fillText(name || "Student", W / 2, 576);

  ctx.fillStyle = "#6b6a78";
  ctx.font = "400 27px Inter, Arial, sans-serif";
  ctx.fillText("for successfully completing", W / 2, 650);

  ctx.fillStyle = "#1E1D29";
  ctx.font = "600 42px Inter, Arial, sans-serif";
  wrapText(ctx, courseTitle, W / 2, 720, W - 320, 52);

  // Footer
  const dateStr = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  ctx.strokeStyle = "#e6e6ef";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 260, H - 210);
  ctx.lineTo(W / 2 + 260, H - 210);
  ctx.stroke();
  ctx.fillStyle = "#1E1D29";
  ctx.font = "600 26px Inter, Arial, sans-serif";
  ctx.fillText("Empathetic AI", W / 2, H - 165);
  ctx.fillStyle = "#6b6a78";
  ctx.font = "400 23px Inter, Arial, sans-serif";
  ctx.fillText("OpenAI Select Partner", W / 2, H - 130);
  ctx.fillText(`Awarded ${dateStr}`, W / 2, H - 95);

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `Certificate - ${courseTitle}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
