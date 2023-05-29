import crypto from "crypto";

export const Helpers = {
  randomID: () => crypto.randomUUID(),
};
