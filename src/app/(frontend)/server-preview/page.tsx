import { RefreshTest } from "@/components/refresh-route";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Fragment } from "react";
import { RenderBlocks } from "@/components/render-block";

export default async function Page() {
  const payload = await getPayload({ config });

  const page = await payload.findByID({
    collection: "pages",
    id: 1,
    draft: true,
  });

  console.log(page);
  return (
    <Fragment>
      <RefreshTest />
      <h1>{page.title}</h1>
      <RenderBlocks blocks={page.layout || []} />
    </Fragment>
  );
}
