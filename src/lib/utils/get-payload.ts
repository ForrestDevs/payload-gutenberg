"use server";

import { getPayload as getPayloadBase } from "payload";
import config from "@/payload.config";

export const getPayload = async () => getPayloadBase({ config });
