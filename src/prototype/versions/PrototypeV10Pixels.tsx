import { prototypeProfile } from "../prototype-content";
import { getPrototypeV10Activity } from "../prototype-v10-github";
import { PrototypeV10PixelsView } from "./PrototypeV10PixelsView";

/** Server wrapper: fetches real contribution data, then renders the page. */
export async function PrototypeV10Pixels() {
  const activity = await getPrototypeV10Activity(prototypeProfile.githubHandle);
  return <PrototypeV10PixelsView activity={activity} />;
}
