import { GLYPHS } from "@/lib/pixelFont";

/**
 * The letter Y drawn in contribution squares, used as the site mark.
 */
export function PixelMonogram() {
  return (
    <span className="grid grid-cols-5 gap-[1.5px]" aria-hidden>
      {GLYPHS.Y.flatMap((row, r) =>
        row.split("").map((ch, c) => (
          <span
            key={`${r}-${c}`}
            className="h-[3.5px] w-[3.5px] rounded-[0.5px]"
            style={{ background: ch === "#" ? "#216e39" : "#d6dbd2" }}
          />
        )),
      )}
    </span>
  );
}
