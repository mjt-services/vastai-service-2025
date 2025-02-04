import { Asserts } from "@mjt-engine/assert";
import { getEnv } from "../getEnv";

export const getVastApiKey = () => {
  const env = getEnv();
  return Asserts.assertValue(env.VASTAI_API_KEY);
};
