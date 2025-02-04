import { Asserts } from "@mjt-engine/assert";
import type { ConnectionListener } from "@mjt-engine/message";
import type {
  VastaiConnectionMap,
  VastAiInstance,
} from "@mjt-services/vastai-common-2025";
import { cmd } from "../common/cmd";
import { getEnv } from "../getEnv";
import { getVastApiKey } from "../vastai/getVastApiKey";

// {'success': True, 'new_contract': 7835610}
export type InstanceCreateResp = { success: boolean; new_contract: number };

export const vastaiShowInstancesListener: ConnectionListener<
  VastaiConnectionMap,
  "vastai.show.instances"
> = async (props) => {
  const {} = props.detail.body;
  const env = getEnv();
  const respText = await cmd("vastai", { verbose: false})(
    "show instances",
    "--raw",
    "--api-key",
    getVastApiKey()
  );
  return JSON.parse(Asserts.assertValue(respText)) as VastAiInstance[];
};
