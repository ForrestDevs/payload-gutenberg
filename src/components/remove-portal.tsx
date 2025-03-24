"use client";

import { useEffect } from "react";

export default function RemovePortals() {
  useEffect(() => {
    // Function to remove all nextjs-portal elements
    const removePortals = () => {
      const portalElements = document.querySelectorAll("nextjs-portal");

      portalElements.forEach((portal) => {
        // Get the parent node of the portal
        const parent = portal.parentNode;

        // Move all children out of the portal before removing it
        while (portal.firstChild) {
          parent?.insertBefore(portal.firstChild, portal);
        }

        // Remove the empty portal
        portal.remove();
      });
    };

    // Initial removal
    removePortals();

    // Set up a MutationObserver to detect if new portals are added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          // Check if any nextjs-portal was added
          const hasNewPortals =
            document.querySelectorAll("nextjs-portal").length > 0;
          if (hasNewPortals) {
            removePortals();
          }
        }
      });
    });

    // Start observing the document for added nodes
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // This component doesn't render anything
}
