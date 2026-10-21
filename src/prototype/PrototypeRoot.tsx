import "./prototype.css";
import * as f from "./prototype-fonts";
import { PrototypeV1Minimal } from "./versions/PrototypeV1Minimal";
import { PrototypeV2Editorial } from "./versions/PrototypeV2Editorial";
import { PrototypeV3DarkTech } from "./versions/PrototypeV3DarkTech";
import { PrototypeV4Bento } from "./versions/PrototypeV4Bento";
import { PrototypeV5RetroOs } from "./versions/PrototypeV5RetroOs";
import { PrototypeV6Brutalist } from "./versions/PrototypeV6Brutalist";
import { PrototypeV7Collage } from "./versions/PrototypeV7Collage";
import { PrototypeV8Space } from "./versions/PrototypeV8Space";
import { PrototypeV9NeonBento } from "./versions/PrototypeV9NeonBento";
import { PrototypeV10Pixels } from "./versions/PrototypeV10Pixels";
import { PrototypeV11Iuga } from "./versions/PrototypeV11Iuga";
import { PrototypeV12Commits } from "./versions/PrototypeV12Commits";
import { PrototypeV13Commits } from "./versions/PrototypeV13Commits";

export const PROTOTYPE_VERSION_COUNT = 13;

const prototypeVersions = {
  1: { Component: PrototypeV1Minimal, fonts: [f.prototypeGeist, f.prototypeGeistMono] },
  2: { Component: PrototypeV2Editorial, fonts: [f.prototypeArchivo, f.prototypeSpaceMono] },
  3: { Component: PrototypeV3DarkTech, fonts: [f.prototypeSora, f.prototypeJetBrains] },
  4: { Component: PrototypeV4Bento, fonts: [f.prototypeManrope] },
  5: { Component: PrototypeV5RetroOs, fonts: [f.prototypePixelify, f.prototypePlexMono, f.prototypeSpaceGrotesk] },
  6: { Component: PrototypeV6Brutalist, fonts: [f.prototypeBricolage] },
  7: { Component: PrototypeV7Collage, fonts: [f.prototypePixelify, f.prototypeKalam, f.prototypeDmSans, f.prototypeSilkscreen] },
  8: { Component: PrototypeV8Space, fonts: [f.prototypeBungee, f.prototypeChakra] },
  9: { Component: PrototypeV9NeonBento, fonts: [f.prototypeJetBrains, f.prototypeSpaceGrotesk] },
  10: { Component: PrototypeV10Pixels, fonts: [f.prototypeArchivo, f.prototypeGeistMono, f.prototypeSilkscreen] },
  11: { Component: PrototypeV11Iuga, fonts: [f.prototypeArchivo, f.prototypeGeistMono, f.prototypeSilkscreen] },
  12: { Component: PrototypeV12Commits, fonts: [f.prototypeGeist, f.prototypeGeistMono] },
  13: { Component: PrototypeV13Commits, fonts: [f.prototypeArchivo, f.prototypeSpaceMono] },
} as const;

export type PrototypeVersion = keyof typeof prototypeVersions;

/** Reads `?v=N`; anything else means "render the normal page". */
export function getPrototypeVersion(value: string | string[] | undefined): PrototypeVersion | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 && n <= PROTOTYPE_VERSION_COUNT ? (n as PrototypeVersion) : null;
}

export function PrototypeRoot({ version }: { version: PrototypeVersion }) {
  const { Component, fonts } = prototypeVersions[version];
  return (
    <div
      className={`prototype-root prototype-root-v${version} ${fonts.map((font) => font.variable).join(" ")}`}
      data-testid="prototype-root"
    >
      <Component />
    </div>
  );
}
