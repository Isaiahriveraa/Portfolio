/**
 * A 7-row pixel font for the letters in YONIE, drawn the same height as a
 * week of the contribution graph. `#` is a lit square.
 */
export const GLYPHS: Record<string, string[]> = {
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  N: ["#...#", "##..#", "##..#", "#.#.#", "#..##", "#..##", "#...#"],
  I: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
};

/** GitHub's own contribution greens, lightest (no contributions) to darkest. */
export const CONTRIBUTION_LEVELS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"] as const;
