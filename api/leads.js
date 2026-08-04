// Simple, self-contained leads dashboard for the team. Server-rendered, read
// only, protected by a passcode (env LEADS_KEY). Reads both the enquiry forms
// (inquiries) and the free-course sign-ups (enrollments) via the service-role
// client, so there is no need to log into Supabase. Visit:
//   https://eai-academy.vercel.app/api/leads?key=YOUR_KEY
import { supabaseAdmin } from "./_lib/supabaseAdmin.js";
import { COURSES, BUNDLE } from "./_lib/catalog.js";

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function courseTitle(slug) {
  if (!slug) return "";
  if (slug === "bundle") return BUNDLE.title;
  return (COURSES[slug] && COURSES[slug].title) || slug;
}
function fmt(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(d);
  }
}

export default async function handler(req, res) {
  const key = (req.query && (req.query.key || req.query.k)) || "";
  const expected = process.env.LEADS_KEY;

  if (!expected || key !== expected) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res
      .status(401)
      .send(
        `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f5f6f8;color:#1b1b26;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0"><div style="text-align:center"><h2>Leads</h2><p style="color:#6b7280">Add your access key to the link: <code>?key=...</code></p></div></body>`,
      );
    return;
  }

  let inquiries = [];
  let signups = [];
  let err = "";
  try {
    const sb = supabaseAdmin();
    const [iq, en] = await Promise.all([
      sb
        .from("inquiries")
        .select("name,email,company,phone,message,source,created_at")
        .order("created_at", { ascending: false }),
      sb
        .from("enrollments")
        .select("first_name,email,course_slug,source,created_at")
        .order("created_at", { ascending: false }),
    ]);
    inquiries = iq.data || [];
    signups = en.data || [];
    if (iq.error) err = iq.error.message;
    if (en.error) err = en.error.message;
  } catch (e) {
    err = (e && e.message) || "read failed";
  }

  const iqRows = inquiries
    .map(
      (r) => `<tr>
<td>${esc(fmt(r.created_at))}</td>
<td>${esc(r.name)}</td>
<td><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></td>
<td>${esc(r.company)}</td>
<td>${esc(r.phone)}</td>
<td>${esc(r.source)}</td>
<td class="msg">${esc(r.message)}</td>
</tr>`,
    )
    .join("");

  const enRows = signups
    .map(
      (r) => `<tr>
<td>${esc(fmt(r.created_at))}</td>
<td>${esc(r.first_name)}</td>
<td><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></td>
<td>${esc(courseTitle(r.course_slug))}</td>
<td>${esc(r.source)}</td>
</tr>`,
    )
    .join("");

  const data = { inquiries, signups };

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(`<!doctype html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Empathetic AI — Leads</title>
<style>
:root{--line:#e6e7eb;--ink:#0f172a;--ink2:#6b7280;--accent:#2563EB}
*{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:var(--ink);background:#f5f6f8;margin:0;padding:24px}
.wrap{max-width:1100px;margin:0 auto}
h1{font-size:24px;margin:0 0 4px}
.sub{color:var(--ink2);margin:0 0 20px;font-size:14px}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-bottom:22px;overflow:hidden}
.head{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin-bottom:12px}
h2{font-size:17px;margin:0}
.count{color:var(--ink2);font-weight:400;font-size:14px}
.btn{background:var(--ink);color:#fff;border:0;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block}
input.search{border:1px solid var(--line);border-radius:9px;padding:8px 12px;font-size:14px;min-width:200px}
.tblwrap{overflow-x:auto;border:1px solid var(--line);border-radius:10px}
table{width:100%;border-collapse:collapse;font-size:13px;min-width:640px}
th{background:var(--ink);color:#fff;text-align:left;padding:10px 12px;font-weight:600;white-space:nowrap}
td{padding:10px 12px;border-top:1px solid var(--line);vertical-align:top}
td a{color:var(--accent);text-decoration:none}
.msg{max-width:280px;white-space:pre-wrap}
.empty{color:var(--ink2);padding:18px 4px}
.err{color:#b91c1c;font-size:13px;margin:0 0 12px}
</style></head><body><div class="wrap">
<h1>Leads</h1>
<p class="sub">Everyone who filled out a form. Updated live. This page is private to you.</p>
${err ? `<p class="err">Note: ${esc(err)}</p>` : ""}

<div class="card">
<div class="head">
<h2>Enquiries <span class="count">(${inquiries.length})</span></h2>
<div style="display:flex;gap:10px;align-items:center">
<input class="search" id="s1" placeholder="Search enquiries…" oninput="filter('t1','s1')">
<button class="btn" onclick="csv('inquiries')">Export CSV</button>
</div>
</div>
${
  inquiries.length
    ? `<div class="tblwrap"><table id="t1"><thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Company</th><th>Phone</th><th>Source</th><th>Message</th></tr></thead><tbody>${iqRows}</tbody></table></div>`
    : `<p class="empty">No enquiries yet.</p>`
}
</div>

<div class="card">
<div class="head">
<h2>Free-course sign-ups <span class="count">(${signups.length})</span></h2>
<div style="display:flex;gap:10px;align-items:center">
<input class="search" id="s2" placeholder="Search sign-ups…" oninput="filter('t2','s2')">
<button class="btn" onclick="csv('signups')">Export CSV</button>
</div>
</div>
${
  signups.length
    ? `<div class="tblwrap"><table id="t2"><thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Course</th><th>Source</th></tr></thead><tbody>${enRows}</tbody></table></div>`
    : `<p class="empty">No sign-ups yet.</p>`
}
</div>

<script>
var DATA = ${JSON.stringify(data)};
function filter(tid, sid){
  var q=(document.getElementById(sid).value||'').toLowerCase();
  var rows=document.querySelectorAll('#'+tid+' tbody tr');
  rows.forEach(function(r){ r.style.display = r.innerText.toLowerCase().indexOf(q)>-1 ? '' : 'none'; });
}
function csv(which){
  var rows = DATA[which]||[];
  var cols = which==='inquiries'
    ? ['created_at','name','email','company','phone','source','message']
    : ['created_at','first_name','email','course_slug','source'];
  var out = [cols.join(',')];
  rows.forEach(function(r){
    out.push(cols.map(function(c){
      var v = r[c]==null?'':String(r[c]);
      return '"'+v.replace(/"/g,'""')+'"';
    }).join(','));
  });
  var blob=new Blob([out.join('\\n')],{type:'text/csv'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=which+'.csv';
  a.click();
}
</script>
</div></body></html>`);
}
