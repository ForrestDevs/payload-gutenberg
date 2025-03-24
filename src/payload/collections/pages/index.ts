import { CollectionConfig } from "payload";
import { PAGES_SLUG } from "../constants";
import { slugField } from "@/payload/fields/slug";
import { blocks } from "@/payload/blocks";

const Pages: CollectionConfig = {
  slug: PAGES_SLUG,
  admin: {
    components: {
      Description: {
        path: "@/payload/custom/comps/description",
      },
      views: {
        edit: {
          gutenbergView: {
            path: "/gutenberg",
            Component: {
              path: "@/payload/custom/views/gutenberg",
            },
          },
          guttenberg: {
            tab: {
              label: "Gutenberg",
              href: "/gutenberg",
            },
          },
        },
      },
    },
    livePreview: {
      url: "http://localhost:3000/server-preview",
    },
  },
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
  versions: {
    drafts: {
      autosave: {
        interval: 1,
      },
    },
  },
} as const;

export default Pages;
