import { MEDIA_SLUG } from "@/payload/collections/constants";
import { MEDIA_BLOCK_SLUG } from "../constants";
import type { Block } from "payload";

const MediaBlock: Block = {
  slug: MEDIA_BLOCK_SLUG,
  fields: [
    {
      name: "position",
      type: "select",
      defaultValue: "default",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Fullscreen",
          value: "fullscreen",
        },
      ],
    },
    {
      name: "media",
      type: "upload",
      relationTo: MEDIA_SLUG,
      required: true,
    },
  ],
  interfaceName: "MediaBlock",
} as const;

export default MediaBlock;
