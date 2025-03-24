"use client";

import React from "react";
import { Button, useDocumentInfo } from "@payloadcms/ui";
import { useRouter } from "next/navigation";

export default function CustomDescription() {
  const router = useRouter();
  const { id } = useDocumentInfo();
  return (
    <div>
      <Button
        onClick={() => {
          router.push(`/admin/collections/pages/${id}/gutenberg`);
        }}
      >
        Launch Gutenberg
      </Button>
    </div>
  );
}
