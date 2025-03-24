"use server";

import { Page } from "@/payload-types";
import { getPayload } from "@/lib/utils/get-payload";

type Block = NonNullable<Page["layout"]>[number];

export async function updatePage({
  id,
  layout,
}: {
  id: number;
  layout: Block[];
}) {
  const payload = await getPayload();

  console.log("updatePage", id, layout);
  const page = await payload.update({
    collection: "pages",
    id,
    data: {
      layout,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }
}
