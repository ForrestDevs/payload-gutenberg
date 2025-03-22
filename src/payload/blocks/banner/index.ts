import type { Block } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { BANNER_BLOCK_SLUG } from "../constants";
const BannerBlock: Block = {
  slug: BANNER_BLOCK_SLUG,
  fields: [
    {
      name: "style",
      type: "select",
      defaultValue: "info",
      options: [
        { label: "Info", value: "info" },
        { label: "Warning", value: "warning" },
        { label: "Error", value: "error" },
        { label: "Success", value: "success" },
      ],
      required: true,
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: "BannerBlock",
} as const;

export default BannerBlock;
