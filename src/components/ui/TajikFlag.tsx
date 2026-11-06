/** Small CSS Tajik flag (red / white / green, 2:3:2, with a gold crown dot). Decorative. */
export default function TajikFlag({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-grid h-[18px] w-[26px] grid-rows-[2fr_3fr_2fr] overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgb(255_255_255/0.15)] ${className}`}
    >
      <img
        src="/assets/flagtjk.jpeg"
        alt=" "
        className="h-[18px] w-full object-cover"
      />
    </span>
  );
}
