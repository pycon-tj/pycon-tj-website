/**
 * The official PyCon logo on an ivory plate.
 * The SVG itself is never altered — the wrapper only crops its empty margins
 * (overflow hidden), as allowed by the brand rules.
 */
export default function LogoPlate({
  width = 118,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-[6px]  px-[10px] py-[6px]  ${className}`}
    >
      <span
        className="relative block overflow-hidden"
        style={{ width, aspectRatio: "1030 / 440" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo must be shown untouched */}
        <img
          src="/assets/pycon-dushanbe-2026-logo-480.webp"
          srcSet="/assets/pycon-dushanbe-2026-logo-480.webp 1x, /assets/pycon-dushanbe-2026-logo-960.webp 2x"
          alt="PyCon Tajikistan — official logo"
          width={1200}
          height={600}
          // className="absolute max-w-none"
          style={{
            width: "116.5%",
            left: "-10.6%",
            top: "-18.4%",
            height: "auto",
          }}
        />
      </span>
    </span>
  );
}
