import type { ConnectionListener } from "@mjt-engine/message";
import type {
  VastaiConnectionMap,
  VastAiSearchResponse,
} from "@mjt-services/vastai-common-2025";
import { cmd } from "./common/cmd";
import { Asserts } from "@mjt-engine/assert";

export const vastaiSearchListener: ConnectionListener<
  VastaiConnectionMap,
  "vastai.search"
> = async (props) => {
  const { query, area = "offers" } = props.detail.body;
  const respText = await cmd("vastai", { verbose: true })(
    "search",
    area,
    `'${query}'`,
    "--raw"
  );
  return JSON.parse(Asserts.assertValue(respText)) as VastAiSearchResponse;
};
