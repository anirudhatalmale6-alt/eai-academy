// OpenAI Select Partner badge. Uses a generic mark (not the OpenAI logo) so we
// signal the partnership without copying their brand assets.
export function PartnerBadge({
  variant = "light",
}: {
  variant?: "light" | "glass";
}) {
  const glass = variant === "glass";
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full text-[13px] font-semibold px-4 py-1.5 ${
        glass
          ? "bg-white/16 border border-white/30 backdrop-blur text-white"
          : "bg-[#F1F5FF] border border-[#dbe6fb] text-ink"
      }`}
    >
      <span className="w-[18px] h-[18px] rounded-full bg-black text-white flex items-center justify-center text-[10px]">
        ◎
      </span>
      OpenAI Select Partner
    </span>
  );
}
