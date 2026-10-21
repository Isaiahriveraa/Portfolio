import { prototypeProfile } from "../prototype-content";
import { getPrototypeV10Activity } from "../prototype-v10-github";
import { PrototypeV10PixelsView } from "./PrototypeV10PixelsView";
import { PrototypeV11IugaShowcase } from "./PrototypeV11IugaShowcase";

/** v10 with the IUGA shop and events work featured at the top of the projects section. */
export async function PrototypeV11Iuga() {
  const activity = await getPrototypeV10Activity(prototypeProfile.githubHandle);
  return <PrototypeV10PixelsView activity={activity} featured={<PrototypeV11IugaShowcase />} />;
}
