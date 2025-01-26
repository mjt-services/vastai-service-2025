import { Asserts } from "@mjt-engine/assert";
import type { ConnectionListener } from "@mjt-engine/message";
import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";
import { getConnection } from "./getConnection";
import { getVastAiInstance } from "./getVastAiInstance";

export const vastaiConnectInstanceListener: ConnectionListener<
  VastaiConnectionMap,
  "vastai.connect.instance"
> = async (props) => {
  const { contractId, serviceName, targetPort } = props.detail.body;
  const instance = await getVastAiInstance(Asserts.assertValue(contractId));
  const con = await getConnection();
  const resp = await con.request({
    subject: "tunnel.add",
    request: {
      body: {
        name: serviceName,
        remoteHost: instance.ssh_host,
        remotePort: instance.ssh_port,
        targetHost: "localhost",
        targetPort,
      },
    },
  });
  console.log("tunnel.add response", resp);

  return { success: true };
};
