import React, { Fragment } from "react";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getPayload } from "@/lib/utils/get-payload";
import { PageClient } from "./client";
import { RefreshTest } from "@/components/refresh-route";
import Script from "next/script";
import RemovePortals from "@/components/remove-portal";

interface PreviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const payload = await getPayload();
  const { id } = await params;

  const { docs } = await payload.find({
    collection: "pages",
    where: {
      id: {
        equals: id,
      },
    },
    depth: 2,
  });

  const page = docs[0];
  if (!page) {
    notFound();
  }

  return (
    <>
      <RemovePortals />
      <RefreshTest />
      <PageClient page={page} />
    </>
  );
}
