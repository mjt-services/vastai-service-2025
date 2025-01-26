import type { ConnectionListener } from "@mjt-engine/message";
import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";
import { cmd } from "./common/cmd";
import { getVastApiKey } from "./getVastApiKey";

export const vastaiDestroyInstanceListener: ConnectionListener<
  VastaiConnectionMap,
  "vastai.destroy.instance"
> = async (props) => {
  const { contractId } = props.detail.body;

  // vastai create destroy 13293135
  await cmd("vastai", { verbose: true })(
    "destroy instance",
    contractId.toString(),
    "--raw",
    "--api-key",
    getVastApiKey()
  );
  return { success: true };
};


