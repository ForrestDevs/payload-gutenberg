import { CollectionConfig } from "payload";
import { PAGES_SLUG } from "../constants";
import { slugField } from "@/payload/fields/slug";
import { blocks } from "@/payload/blocks";

const Pages: CollectionConfig = {
  slug: PAGES_SLUG,
  fields: [
    ...slugField(),
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "layout",
      type: "blocks",
      label: "Content",
      blocks,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
  ],
} as const;

export default Pages;
