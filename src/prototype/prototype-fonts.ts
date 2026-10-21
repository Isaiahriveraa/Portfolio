/**
 * Fonts for the redesign directions. preload is off so the normal home page
 * (no `?v`) does not download any of them.
 */
import {
  Geist,
  Geist_Mono,
  Archivo,
  Space_Mono,
  Sora,
  Manrope,
  Pixelify_Sans,
  Silkscreen,
  IBM_Plex_Mono,
  Space_Grotesk,
  Bricolage_Grotesque,
  Kalam,
  DM_Sans,
  Bungee,
  Chakra_Petch,
  JetBrains_Mono,
} from "next/font/google";

export const prototypeGeist = Geist({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-geist" });
export const prototypeGeistMono = Geist_Mono({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-geist-mono" });
export const prototypeArchivo = Archivo({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-archivo", axes: ["wdth"] });
export const prototypeSpaceMono = Space_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--prototype-space-mono" });
export const prototypeSora = Sora({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-sora" });
export const prototypeManrope = Manrope({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-manrope" });
export const prototypePixelify = Pixelify_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-pixelify" });
export const prototypeSilkscreen = Silkscreen({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--prototype-silkscreen" });
export const prototypePlexMono = IBM_Plex_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "500", "600"], variable: "--prototype-plex-mono" });
export const prototypeSpaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-space-grotesk" });
export const prototypeBricolage = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-bricolage" });
export const prototypeKalam = Kalam({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--prototype-kalam" });
export const prototypeDmSans = DM_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-dm-sans" });
export const prototypeBungee = Bungee({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--prototype-bungee" });
export const prototypeChakra = Chakra_Petch({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "500", "600", "700"], variable: "--prototype-chakra" });
export const prototypeJetBrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", preload: false, variable: "--prototype-jetbrains" });
