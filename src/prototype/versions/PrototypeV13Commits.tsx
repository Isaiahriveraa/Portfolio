import { prototypeProfile } from "../prototype-content";
import { getPrototypeV10Activity } from "../prototype-v10-github";
import { PrototypeV13View } from "./PrototypeV13View";

/** v13: v12's scroll-themed showcases with v2's type, a photo-led first-person hero, and a green contribution graph. */
export async function PrototypeV13Commits() {
  const activity = await getPrototypeV10Activity(prototypeProfile.githubHandle);
  return <PrototypeV13View activity={activity} />;
}
