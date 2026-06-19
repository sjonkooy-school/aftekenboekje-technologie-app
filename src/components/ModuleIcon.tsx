import { getModuleVisual } from "@/lib/module-visuals";

function IconShape({ icon }: { icon: string }) {
  switch (icon) {
    case "robot-grid":
      return (
        <>
          <rect x="18" y="18" width="60" height="60" rx="10" />
          <path d="M30 36h36M30 54h36M42 24v48M60 24v48" />
          <circle cx="48" cy="48" r="9" />
          <path d="M48 33v-9M39 24h18" />
        </>
      );
    case "vr":
      return (
        <>
          <rect x="14" y="32" width="68" height="32" rx="12" />
          <circle cx="36" cy="48" r="7" />
          <circle cx="60" cy="48" r="7" />
          <path d="M14 48H6M90 48h-8" />
        </>
      );
    case "cubes":
      return (
        <>
          <path d="M48 16l22 12v24L48 64 26 52V28z" />
          <path d="M48 16v24l22-12M48 40L26 28M48 40v24" />
          <path d="M22 62l12 7 12-7M58 70l14 8 14-8" />
        </>
      );
    case "chain":
      return (
        <>
          <circle cx="26" cy="30" r="9" />
          <circle cx="48" cy="48" r="9" />
          <circle cx="70" cy="66" r="9" />
          <path d="M33 36l8 6M55 54l8 6" />
        </>
      );
    case "orbit":
      return (
        <>
          <circle cx="48" cy="48" r="8" />
          <ellipse cx="48" cy="48" rx="34" ry="14" />
          <ellipse cx="48" cy="48" rx="14" ry="34" />
          <circle cx="76" cy="48" r="4" />
        </>
      );
    case "brush":
      return (
        <>
          <path d="M62 18l16 16-34 34-16-16z" />
          <path d="M28 52c-10 6-12 16-10 26 10 2 20 0 26-10" />
          <path d="M54 26l16 16" />
        </>
      );
    case "architecture":
      return (
        <>
          <path d="M18 76h60M24 76V38l24-16 24 16v38" />
          <path d="M36 76V52h24v24M32 44h8M56 44h8" />
        </>
      );
    case "robot":
      return (
        <>
          <rect x="22" y="30" width="52" height="42" rx="10" />
          <path d="M48 30V18M38 18h20" />
          <circle cx="38" cy="50" r="5" />
          <circle cx="58" cy="50" r="5" />
          <path d="M38 64h20M22 48H12M84 48H74" />
        </>
      );
    case "3d":
      return (
        <>
          <path d="M20 32l28-16 28 16v32L48 80 20 64z" />
          <path d="M20 32l28 16 28-16M48 48v32" />
        </>
      );
    case "coaster":
      return (
        <>
          <path d="M12 70c18-42 30-42 44 0 10 28 22 10 28-12" />
          <path d="M18 70h66M28 56h8M44 56h8M60 56h8" />
          <circle cx="34" cy="72" r="4" />
          <circle cx="58" cy="72" r="4" />
        </>
      );
    case "assembly":
      return (
        <>
          <path d="M30 64l34-34M22 72l8-8 10 10-8 8z" />
          <path d="M58 24l14-6 6 6-6 14" />
          <circle cx="32" cy="30" r="10" />
          <path d="M32 20v-8M32 48v-8M22 30h-8M50 30h-8" />
        </>
      );
    case "drone":
      return (
        <>
          <rect x="38" y="40" width="20" height="16" rx="4" />
          <path d="M38 48H22M58 48h16M48 40V24M48 56v16" />
          <circle cx="18" cy="48" r="8" />
          <circle cx="78" cy="48" r="8" />
          <circle cx="48" cy="20" r="8" />
          <circle cx="48" cy="76" r="8" />
        </>
      );
    case "chip":
      return (
        <>
          <rect x="26" y="26" width="44" height="44" rx="8" />
          <rect x="38" y="38" width="20" height="20" rx="4" />
          <path d="M18 34h8M18 48h8M18 62h8M70 34h8M70 48h8M70 62h8M34 18v8M48 18v8M62 18v8M34 70v8M48 70v8M62 70v8" />
        </>
      );
    case "clone":
      return (
        <>
          <circle cx="34" cy="32" r="10" />
          <circle cx="62" cy="32" r="10" />
          <path d="M18 72c4-18 28-18 32 0M46 72c4-18 28-18 32 0" />
          <path d="M48 28v40" />
        </>
      );
    case "code":
      return (
        <>
          <path d="M36 30L18 48l18 18M60 30l18 18-18 18M52 22L42 74" />
        </>
      );
    default:
      return <circle cx="48" cy="48" r="28" />;
  }
}

export function ModuleIcon({ title }: { title: string }) {
  const visual = getModuleVisual(title);

  return (
    <div className="app-icon" style={{ "--accent": visual.accent } as React.CSSProperties}>
      <svg aria-hidden="true" viewBox="0 0 96 96">
        <IconShape icon={visual.icon} />
      </svg>
    </div>
  );
}
