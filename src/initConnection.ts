import { Messages } from "@mjt-engine/message";
import type { Env } from "./Env";

import { vastaiSearchListener } from "./vastaiSearchListener";
import { assertValue } from "@mjt-engine/assert";
import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";
import { getEnv } from "./getEnv";
import { vastaiShowInstancesListener } from "./vastaiShowInstancesListener";
import {
  vastaiCreateInstanceListener,
  vastaiDestroyInstanceListener,
} from "./vastaiCreateInstanceListener";

export const initConnection = async () => {
  const env = getEnv();
  const url = assertValue(env.NATS_URL);
  console.log("NATS_URL", url);

  await Messages.createConnection<VastaiConnectionMap, Env>({
    subscribers: {
      "vastai.search": vastaiSearchListener,
      "vastai.show.instances": vastaiShowInstancesListener,
      "vastai.create.instance": vastaiCreateInstanceListener,
      "vastai.destroy.instance": vastaiDestroyInstanceListener,
    },
    options: { log: console.log },
    server: [url],
    token: env.NATS_AUTH_TOKEN,
    env,
  });
  console.log("initConnection: init complete");
};
