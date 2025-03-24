"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useConfig, useDocumentEvents, useDocumentInfo } from "@payloadcms/ui";
import { cn, generateBlockId } from "@/lib/utils";
import { Page } from "@/payload-types";
import { fieldSchemaToJSON } from "payload/shared";
import { Block } from "@/payload/types/blocks";
import { BlockSettings } from "@/components/block-settings";
import { updatePage } from "./action";

export default function GutenbergView() {
  const { updateSavedDocumentData, savedDocumentData, docConfig } =
    useDocumentInfo();
  const { config } = useConfig();
  const { mostRecentUpdate } = useDocumentEvents();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);

  const typedSavedDocumentData = savedDocumentData as Page;

  useEffect(() => {
    const handlePreviewMessage = (event: MessageEvent) => {
      if (!event.data?.type) return;

      switch (event.data.type) {
        case "ADD_BLOCK": {
          const { blockType, dropIndex } = event.data.payload;
          const newBlock = {
            id: generateBlockId(),
            blockType: `${blockType}-block` as Block["blockType"],
            title: blockType,
            blockName: blockType,
            content: "",
            ctaText: "",
            ctaUrl: "",
            image: {
              url: "",
              alt: "",
            },
          };

          const updatedLayout = [...(typedSavedDocumentData?.layout || [])];
          updatedLayout.splice(dropIndex, 0, newBlock as any);

          updateSavedDocumentData({
            ...typedSavedDocumentData,
            layout: updatedLayout,
          });

          // Send live preview update
          const fieldSchemaJSON = fieldSchemaToJSON(
            docConfig?.fields || [],
            config
          );

          const message = {
            type: "payload-live-preview",
            data: {
              ...typedSavedDocumentData,
              layout: updatedLayout,
            },
            externallyUpdatedRelationship: mostRecentUpdate,
            fieldSchemaJSON: fieldSchemaJSON,
            locale: "en",
          };

          if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(message, "*");
          }

          // Update the page
          updatePage({
            id: typedSavedDocumentData?.id,
            layout: updatedLayout,
          });
          break;
        }
        case "MOVE_BLOCK": {
          const { blockId, sourceIndex, targetIndex, direction } =
            event.data.payload;
          const updatedLayout = [...(typedSavedDocumentData?.layout || [])];

          if (direction) {
            // Handle toolbar move (up/down)
            const newIndex =
              direction === "up"
                ? Math.max(0, sourceIndex - 1)
                : Math.min(updatedLayout.length - 1, sourceIndex + 1);

            if (newIndex !== sourceIndex) {
              const [movedBlock] = updatedLayout.splice(sourceIndex, 1);
              updatedLayout.splice(newIndex, 0, movedBlock);
            }
          } else {
            // Handle drag-and-drop move
            const [movedBlock] = updatedLayout.splice(sourceIndex, 1);
            updatedLayout.splice(targetIndex, 0, movedBlock);
          }

          updateSavedDocumentData({
            ...typedSavedDocumentData,
            layout: updatedLayout,
          });

          // Send live preview update
          const fieldSchemaJSON = fieldSchemaToJSON(
            docConfig?.fields || [],
            config
          );

          const message = {
            type: "payload-live-preview",
            data: {
              ...typedSavedDocumentData,
              layout: updatedLayout,
            },
            externallyUpdatedRelationship: mostRecentUpdate,
            fieldSchemaJSON: fieldSchemaJSON,
            locale: "en",
          };

          if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(message, "*");
          }

          // Update the page
          updatePage({
            id: typedSavedDocumentData?.id,
            layout: updatedLayout,
          });
          break;
        }
        case "REMOVE_BLOCK": {
          const { blockId } = event.data.payload;
          const updatedLayout = (typedSavedDocumentData?.layout || []).filter(
            (block) => block.id !== blockId
          );

          updateSavedDocumentData({
            ...typedSavedDocumentData,
            layout: updatedLayout,
          });

          // Send live preview update
          const fieldSchemaJSON = fieldSchemaToJSON(
            docConfig?.fields || [],
            config
          );

          const message = {
            type: "payload-live-preview",
            data: {
              ...typedSavedDocumentData,
              layout: updatedLayout,
            },
            externallyUpdatedRelationship: mostRecentUpdate,
            fieldSchemaJSON: fieldSchemaJSON,
            locale: "en",
          };

          if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(message, "*");
          }

          // Update the page
          updatePage({
            id: typedSavedDocumentData?.id,
            layout: updatedLayout,
          });
          break;
        }
        case "EDIT_BLOCK": {
          const { blockId } = event.data.payload;
          const block = typedSavedDocumentData?.layout?.find(
            (b) => b.id === blockId
          );
          if (block) {
            setEditingBlock(block as Block);
          }
          break;
        }
        case "UPDATE_BLOCK": {
          const { blockId, updates } = event.data.payload;
          const updatedLayout = typedSavedDocumentData?.layout?.map((block) =>
            block.id === blockId ? { ...block, ...updates } : block
          );

          updateSavedDocumentData({
            ...typedSavedDocumentData,
            layout: updatedLayout,
          });

          // Send live preview update
          const fieldSchemaJSON = fieldSchemaToJSON(
            docConfig?.fields || [],
            config
          );

          const message = {
            type: "payload-live-preview",
            data: {
              ...typedSavedDocumentData,
              layout: updatedLayout,
            },
            externallyUpdatedRelationship: mostRecentUpdate,
            fieldSchemaJSON: fieldSchemaJSON,
            locale: "en",
          };

          if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(message, "*");
          }

          // Update the page
          updatePage({
            id: typedSavedDocumentData?.id,
            layout: updatedLayout as any,
          });
          break;
        }
      }
    };

    window.addEventListener("message", handlePreviewMessage);
    return () => window.removeEventListener("message", handlePreviewMessage);
  }, [
    typedSavedDocumentData,
    updateSavedDocumentData,
    docConfig,
    config,
    mostRecentUpdate,
  ]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData(
      "blockType",
      e.currentTarget.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
    );
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Blocks</h2>
        <div className="space-y-2">
          {["Banner", "Call to Action", "Media"].map((block) => (
            <div
              key={block}
              className="p-3 bg-gray-50 rounded cursor-move hover:bg-gray-100 text-gray-900"
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {block}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        <div
          className={cn(
            "relative h-[800px] p-6 bg-gray-50 rounded-lg shadow-inner transition-colors duration-200",
            isDragging && "bg-blue-50/50"
          )}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
            <iframe
              ref={iframeRef}
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/preview/${typedSavedDocumentData?.id}`}
              className="w-full h-full border-0"
              title="Live Preview"
            />
          </div>
          <div className="absolute top-2 left-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
            Page Preview
          </div>
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-blue-500 font-medium text-lg">
                Drop block to add
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      {editingBlock && (
        <BlockSettings
          block={editingBlock}
          onClose={() => setEditingBlock(null)}
          onUpdate={(blockId, updates) => {
            window.parent.postMessage(
              {
                type: "UPDATE_BLOCK",
                payload: { blockId, updates },
              },
              "*"
            );
          }}
        />
      )}
    </div>
  );
}
