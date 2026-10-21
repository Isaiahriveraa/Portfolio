import { prototypeProfile } from "../prototype-content";
import { getPrototypeV10Activity } from "../prototype-v10-github";
import { PrototypeV12View } from "./PrototypeV12View";

export async function PrototypeV12Commits() {
  const activity = await getPrototypeV10Activity(prototypeProfile.githubHandle);
  return <PrototypeV12View activity={activity} />;
}
