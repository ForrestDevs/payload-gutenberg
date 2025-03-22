import { CollectionConfig } from "payload";
import { MEDIA_SLUG } from "../constants";
const Media: CollectionConfig = {
  slug: MEDIA_SLUG,
  fields: [
    {
      name: "title",
      type: "text",
    },
  ],
} as const;

export default Media;
