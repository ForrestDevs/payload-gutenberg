"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import { useLivePreview } from "@/payload/hooks/use-live-preview";
import { Page } from "@/payload-types";
import { RenderBlocks } from "@/components/render-block";
import { BlockToolbar } from "@/components/block-toolbar";
import { BlockSelector } from "@/components/block-selector";
import { cn } from "@/lib/utils";

interface PageClientProps {
  page: Page;
}

export function PageClient({ page: initialPage }: PageClientProps) {
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [dropZoneIndex, setDropZoneIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useLivePreview({
    initialData: initialPage,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    depth: 2,
  });

  const handleMoveBlock = useCallback(
    (blockId: string, direction: "up" | "down", sourceIndex: number) => {
      window.parent.postMessage(
        {
          type: "MOVE_BLOCK",
          payload: { blockId, direction, sourceIndex },
        },
        "*"
      );
    },
    []
  );

  const handleRemoveBlock = useCallback((blockId: string) => {
    window.parent.postMessage(
      {
        type: "REMOVE_BLOCK",
        payload: { blockId },
      },
      "*"
    );
  }, []);

  const handleEditBlock = useCallback((blockId: string) => {
    window.parent.postMessage(
      {
        type: "EDIT_BLOCK",
        payload: { blockId },
      },
      "*"
    );
  }, []);

  const handleBlockSelect = useCallback((blockType: string, index: number) => {
    window.parent.postMessage(
      {
        type: "ADD_BLOCK",
        payload: { blockType, dropIndex: index },
      },
      "*"
    );
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current) return;

    const blocks = containerRef.current.querySelectorAll("[data-block]");
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeY = e.clientY - containerRect.top;

    // If no blocks, return 0
    if (blocks.length === 0) {
      setDropZoneIndex(0);
      return;
    }

    // If above first block, return 0
    const firstBlock = blocks[0] as HTMLElement;
    if (relativeY < firstBlock.offsetTop) {
      setDropZoneIndex(0);
      return;
    }

    // If below last block, return length
    const lastBlock = blocks[blocks.length - 1] as HTMLElement;
    if (relativeY > lastBlock.offsetTop + lastBlock.offsetHeight) {
      setDropZoneIndex(blocks.length);
      return;
    }

    // Find the nearest block
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i] as HTMLElement;
      const blockMiddle = block.offsetTop + block.offsetHeight / 2;

      if (relativeY < blockMiddle) {
        setDropZoneIndex(i);
        return;
      }
    }

    setDropZoneIndex(blocks.length);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Only clear if we're leaving the container
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setDropZoneIndex(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const blockType = e.dataTransfer.getData("blockType");
      const blockId = e.dataTransfer.getData("blockId");
      const sourceIndex = e.dataTransfer.getData("sourceIndex");

      if (blockType) {
        // Adding a new block from the sidebar
        window.parent.postMessage(
          {
            type: "ADD_BLOCK",
            payload: { blockType, dropIndex: dropZoneIndex },
          },
          "*"
        );
      } else if (blockId && sourceIndex) {
        // Moving an existing block
        const sourceIdx = parseInt(sourceIndex);
        const targetIdx = dropZoneIndex ?? 0;

        // Don't send message if the block is dropped in the same position
        if (sourceIdx === targetIdx) {
          setDropZoneIndex(null);
          return;
        }

        window.parent.postMessage(
          {
            type: "MOVE_BLOCK",
            payload: {
              blockId,
              sourceIndex: sourceIdx,
              targetIndex: targetIdx,
            },
          },
          "*"
        );
      }

      setDropZoneIndex(null);
    },
    [dropZoneIndex]
  );

  const handleBlockDragStart = useCallback(
    (e: React.DragEvent, blockId: string, index: number) => {
      e.dataTransfer.setData("blockId", blockId);
      e.dataTransfer.setData("sourceIndex", index.toString());
      // Add a class to the dragged element for visual feedback
      e.currentTarget.classList.add("opacity-50");
    },
    []
  );

  const handleBlockDragEnd = useCallback((e: React.DragEvent) => {
    // Remove the opacity class when drag ends
    e.currentTarget.classList.remove("opacity-50");
  }, []);

  const handleBlockUpdate = useCallback((blockId: string, updates: any) => {
    window.parent.postMessage(
      {
        type: "UPDATE_BLOCK",
        payload: { blockId, updates },
      },
      "*"
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-black" data-theme="light">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{data.title}</h1>
        <div
          ref={containerRef}
          className="space-y-8 relative"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {data.layout?.map((block, index) => (
            <React.Fragment key={block.id}>
              {/* Drop zone above each block */}
              <div
                className={cn(
                  "h-4 transition-all duration-200 rounded-lg border-2 border-dashed relative group",
                  dropZoneIndex === index
                    ? "h-12 bg-blue-50 border-blue-500"
                    : "border-transparent hover:border-gray-300"
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {dropZoneIndex === index && (
                    <div className="text-sm text-blue-500 font-medium">
                      Drop block here
                    </div>
                  )}
                  <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BlockSelector
                      onSelect={(blockType) =>
                        handleBlockSelect(blockType, index)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Block */}
              <div
                className="relative group"
                onMouseEnter={() => setHoveredBlockId(block.id ?? "")}
                onMouseLeave={() => setHoveredBlockId(null)}
                draggable
                onDragStart={(e) =>
                  handleBlockDragStart(e, block.id ?? "", index)
                }
                onDragEnd={handleBlockDragEnd}
                data-block
              >
                <div
                  className={cn(
                    "relative rounded-lg transition-all outline-1",
                    hoveredBlockId === block.id &&
                      "outline-2 outline-blue-500/50 bg-blue-50/50"
                  )}
                  onClick={() => setActiveBlockId(block.id ?? "")}
                >
                  <RenderBlocks blocks={[block]} />
                  {activeBlockId === block.id && (
                    <BlockToolbar
                      block={block as any}
                      onRemove={handleRemoveBlock}
                      onMoveUp={() =>
                        handleMoveBlock(block.id ?? "", "up", index)
                      }
                      onMoveDown={() =>
                        handleMoveBlock(block.id ?? "", "down", index)
                      }
                      onEdit={handleEditBlock}
                      isFirst={index === 0}
                      isLast={index === (data.layout?.length ?? 0) - 1}
                    />
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Final drop zone */}
          <div
            className={cn(
              "h-4 transition-all duration-200 rounded-lg border-2 border-dashed relative group",
              dropZoneIndex === data.layout?.length
                ? "h-12 bg-blue-50 border-blue-500"
                : "border-transparent hover:border-gray-300"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {dropZoneIndex === data.layout?.length && (
                <div className="text-sm text-blue-500 font-medium">
                  Drop block here
                </div>
              )}
              <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <BlockSelector
                  onSelect={(blockType) =>
                    handleBlockSelect(blockType, data.layout?.length ?? 0)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
