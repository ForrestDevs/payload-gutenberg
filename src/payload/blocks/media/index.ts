import { MEDIA_SLUG } from "@/payload/collections/constants";
import { MEDIA_BLOCK_SLUG } from "../constants";
import type { Block } from "payload";

const MediaBlock: Block = {
  slug: MEDIA_BLOCK_SLUG,
  fields: [
    {
      name: "title",
      type: "text",
    },
  ],
  interfaceName: "MediaBlock",
} as const;

export default MediaBlock;
