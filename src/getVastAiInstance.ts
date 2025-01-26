import { Asserts } from "@mjt-engine/assert";
import type { VastAiInstance } from "@mjt-services/vastai-common-2025";
import { cmd } from "./common/cmd";
import { getVastApiKey } from "./getVastApiKey";


export const getVastAiInstance = async (contractId: number) => {
  const apiKey = getVastApiKey();
  const resp = await cmd("vastai", { verbose: true })(
    `show instance ${contractId}`,
    "--raw",
    "--api-key",
    apiKey
  );
  return JSON.parse(Asserts.assertValue(resp)) as VastAiInstance;
};
