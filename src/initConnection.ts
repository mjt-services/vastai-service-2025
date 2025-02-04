import { Messages } from "@mjt-engine/message";
import type { Env } from "./Env";

import { assertValue } from "@mjt-engine/assert";
import type { TunnelConnectionMap } from "@mjt-services/tunnel-common-2025";
import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";
import { getEnv } from "./getEnv";
import { vastaiConnectInstanceListener } from "./listener/vastaiConnectInstanceListener";
import { vastaiCreateInstanceListener } from "./listener/vastaiCreateInstanceListener";
import { vastaiDestroyInstanceListener } from "./listener/vastaiDestroyInstanceListener";
import { vastaiSearchListener } from "./listener/vastaiSearchListener";
import { vastaiShowInstancesListener } from "./listener/vastaiShowInstancesListener";
import { vastaiLabelInstanceListener } from "./listener/vastaiLabelInstanceListener";

export const initConnection = async () => {
  const env = getEnv();
  const url = assertValue(env.NATS_URL);
  console.log("NATS_URL", url);

  const con = await Messages.createConnection<
    VastaiConnectionMap & TunnelConnectionMap,
    Env
  >({
    subscribers: {
      "vastai.search": vastaiSearchListener,
      "vastai.show.instances": vastaiShowInstancesListener,
      "vastai.create.instance": vastaiCreateInstanceListener,
      "vastai.destroy.instance": vastaiDestroyInstanceListener,
      "vastai.connect.instance": vastaiConnectInstanceListener,
      "vastai.label.instance": vastaiLabelInstanceListener,
    },
    options: { log: console.log },
    server: [url],
    token: env.NATS_AUTH_TOKEN,
    env,
  });
  console.log("initConnection: init complete");
  return con;
};
