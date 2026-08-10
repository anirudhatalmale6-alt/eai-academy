// Client helpers for starting a Stripe checkout and capturing referral codes.
// The actual pricing and session creation happen server-side in /api/checkout.

const REF_KEY = "eai_ref";

// Capture a ?ref=CODE from the URL (works with the hash router) and remember it
// so it can be attached to a later purchase. Call once on app start.
export function captureReferral() {
  try {
    const fromHash = window.location.hash.split("?")[1] || "";
    const fromSearch = window.location.search.replace(/^\?/, "");
    const params = new URLSearchParams(fromHash || fromSearch);
    const code = params.get("ref");
    if (code) localStorage.setItem(REF_KEY, code.trim().slice(0, 64));
  } catch {
    /* ignore */
  }
}

export function getReferral(): string | null {
  try {
    return localStorage.getItem(REF_KEY);
  } catch {
    return null;
  }
}

export type CheckoutItem =
  | { type: "course"; slug: string }
  | { type: "bundle" }
  | { type: "workshop"; slug: string };

// Start checkout. Returns an error message string on failure, or null on
// success (the browser is redirected to Stripe). If the payment backend is not
// available yet (e.g. static preview), returns a friendly notice.
export async function startCheckout(
  item: CheckoutItem,
  quantity = 1,
  email?: string,
  extra?: { registrationId?: string; name?: string; company?: string },
): Promise<string | null> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item,
        quantity,
        email,
        registrationId: extra?.registrationId,
        name: extra?.name,
        company: extra?.company,
        referralCode: getReferral() || undefined,
      }),
    });
    if (!res.ok) {
      if (res.status === 404)
        return "Checkout is being finalised and will be live at launch.";
      return "Sorry, we couldn't start checkout just now. Please try again.";
    }
    const data = await res.json();
    if (data.contactRequired)
      return "For 25 or more seats we'll tailor a quote. Please use Request team pricing.";
    if (data.url) {
      window.location.href = data.url;
      return null;
    }
    return "Sorry, we couldn't start checkout just now. Please try again.";
  } catch {
    return "Checkout is being finalised and will be live at launch.";
  }
}
