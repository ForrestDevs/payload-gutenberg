import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { CALL_TO_ACTION_BLOCK_SLUG } from "../constants";
const CallToActionBlock: Block = {
  slug: CALL_TO_ACTION_BLOCK_SLUG,
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
  interfaceName: "CallToActionBlock",
} as const;

export default CallToActionBlock;
