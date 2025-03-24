import { Page } from "@/payload-types";
import {
  unsubscribe,
  ready,
  isLivePreviewEvent,
  subscribe,
} from "../live-preview";
import { useCallback, useEffect, useState, useRef } from "react";

export const useLivePreview = (props: {
  depth?: number;
  initialData: Page;
  serverURL: string;
}): {
  data: Page;
  isLoading: boolean;
} => {
  const { depth = 0, initialData, serverURL } = props;
  const [data, setData] = useState<Page>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasSentReadyMessage = useRef<boolean>(false);

  //   const onMessage = useCallback((event: MessageEvent) => {
  //     setIsLoading(true);
  //     console.log("event", event.data);
  //     setData(event.data);
  //     setIsLoading(false);
  //   }, []);

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("message", onMessage);
  //   }

  const onChange = useCallback((mergedData: Page) => {
    // When a change is made, the `onChange` callback will be called with the merged data
    // Set this merged data into state so that React will re-render the UI
    setData(mergedData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Listen for `window.postMessage` events from the Admin Panel
    // When a change is made, the `onChange` callback will be called with the merged data
    const subscription = subscribe<Page>({
      callback: onChange,
      depth,
      initialData,
      serverURL,
    });

    // Once subscribed, send a `ready` message back up to the Admin Panel
    // This will indicate that the front-end is ready to receive messages
    if (!hasSentReadyMessage.current) {
      hasSentReadyMessage.current = true;

      ready({
        serverURL,
      });
    }

    // When the component unmounts, unsubscribe from the `window.postMessage` events
    return () => {
      unsubscribe(subscription);
    };
  }, [serverURL, onChange, depth, initialData]);

  return {
    data,
    isLoading,
  };
};
