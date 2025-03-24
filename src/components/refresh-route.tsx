"use client";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation.js";
import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { ready, isDocumentEvent } from "@payloadcms/live-preview";

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter();

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}
    />
  );
};

export const RefreshTest: React.FC<{
  apiRoute?: string;
  depth?: number;
}> = (props) => {
  const { apiRoute, depth } = props;
  const router = useRouter();
  const hasSentReadyMessage = useRef<boolean>(false);
  const refresh = useCallback(() => router.refresh(), [router]);
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  const onMessage = useCallback(
    (event: MessageEvent) => {
      if (isDocumentEvent(event, serverURL)) {
        if (typeof refresh === "function") {
          refresh();
        }
      }
    },
    [refresh, serverURL]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("message", onMessage);
    }

    if (!hasSentReadyMessage.current) {
      hasSentReadyMessage.current = true;

      ready({
        serverURL,
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("message", onMessage);
      }
    };
  }, [serverURL, onMessage, depth, apiRoute]);

  return null;
};
