import type { ConnectionListener } from "@mjt-engine/message";
import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";
import { cmd } from "../common/cmd";
import { getVastApiKey } from "../vastai/getVastApiKey";

export const vastaiLabelInstanceListener: ConnectionListener<
  VastaiConnectionMap,
  "vastai.label.instance"
> = async (props) => {
  const { contractId, label } = props.detail.body;

  // vastai create destroy 13293135
  await cmd("vastai", { verbose: true })(
    "label instance",
    contractId.toString(),
    label,
    "--raw",
    "--api-key",
    getVastApiKey()
  );
  return { success: true };
};
