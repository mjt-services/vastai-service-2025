import type { ConnectionListener } from "@mjt-engine/message";
import type {
  VastaiConnectionMap,
  VastAiInstance,
  VastAiSearchResponse,
} from "@mjt-services/vastai-common-2025";
import { cmd } from "./common/cmd";
import { Asserts } from "@mjt-engine/assert";
import { getEnv } from "./getEnv";

export const vastaiShowInstancesListener: ConnectionListener<
  VastaiConnectionMap,
  "vastai.show.instances"
> = async (props) => {
  const {} = props.detail.body;
  const env = getEnv();
  const respText = await cmd("vastai", { verbose: true })(
    "show instances",
    "--raw",
    "--api-key",
    Asserts.assertValue(env.VASTAI_API_KEY)
  );
  return JSON.parse(Asserts.assertValue(respText)) as VastAiInstance[];
};
