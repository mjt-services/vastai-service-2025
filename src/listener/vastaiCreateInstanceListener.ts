import { Asserts } from "@mjt-engine/assert";
import type { ConnectionListener } from "@mjt-engine/message";
import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";
import { cmd } from "../common/cmd";
import type { InstanceCreateResp } from "./vastaiShowInstancesListener";
import { getVastApiKey } from "../vastai/getVastApiKey";

export const vastaiCreateInstanceListener: ConnectionListener<
  VastaiConnectionMap,
  "vastai.create.instance"
> = async (props) => {
  const {
    label,
    image,
    contractId,
    diskGb = 10,
    env: InstanceEnv = {},
    exposedPortMappings = {},
    onStartCmd = "",
  } = props.detail.body;

  // vastai create instance 13293135 --image 'onerahmet/openai-whisper-asr-webservice:latest-gpu' --ssh --disk 10 --env '-p 9000:9000 -e ASR_MODEL=base -e ASR_ENGINE=openai_whisper'
  const environmentString = Object.entries(InstanceEnv)
    .map(([key, value]) => `-e ${key}=${value}`)
    .join(" ");
  const portMappingString = Object.entries(exposedPortMappings)
    .map(([key, value]) => `-p ${key}:${value}`)
    .join(" ");
  const respText = await cmd("vastai", { verbose: true })(
    "create instance",
    contractId.toString(),
    "--image",
    image,
    "--ssh",
    "--disk",
    diskGb.toString(),
    "--label",
    label ?? "unknown",
    "--env",
    "'" + [environmentString, portMappingString].join(" ").trim() + "'",
    "--onstart-cmd",
    "'" + onStartCmd + "'",
    "--raw",
    "--api-key",
    getVastApiKey()
  );
  const resp = JSON.parse(Asserts.assertValue(respText)) as InstanceCreateResp;
  const { new_contract } = resp;
  return { contractId: new_contract };
};
