import { Asserts } from "@mjt-engine/assert";
import type { ConnectionListener } from "@mjt-engine/message";
import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";
import { cmd } from "./common/cmd";
import { getVastApiKey } from "./getVastApiKey";
import type { InstanceCreateResp } from "./vastaiShowInstancesListener";

export const vastaiCreateInstanceListener: ConnectionListener<
  VastaiConnectionMap,
  "vastai.create.instance"
> = async (props) => {
  const {
    image,
    machineId,
    diskGb = 10,
    env: InstanceEnv = {},
    exposedPortMappings = {},
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
    machineId.toString(),
    "--image",
    image,
    "--ssh",
    "--disk",
    diskGb.toString(),
    "--env",
    "'" + [environmentString, portMappingString].join(" ") + "'",
    "--raw",
    "--api-key",
    getVastApiKey()
  );
  const resp = JSON.parse(Asserts.assertValue(respText)) as InstanceCreateResp;
  const { new_contract } = resp;
  return { contractId: new_contract };
};
