import badge from "../assets/openai-select-partner.png";

// Official OpenAI Select Partner badge (supplied by OpenAI, cleared to display).
export function PartnerBadge({ className = "" }: { className?: string }) {
  return (
    <img
      src={badge}
      alt="OpenAI Select Partner"
      className={`h-11 w-auto ${className}`}
    />
  );
}
