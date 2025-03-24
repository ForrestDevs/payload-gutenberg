import { useField } from "@payloadcms/ui";
import { useCallback } from "react";
import { generateBlockId } from "@/lib/utils";
import type { Page } from "@/payload-types";

type Block = NonNullable<Page["layout"]>[number];

export function useBlocks() {
  const { value: blocks = [], setValue } = useField<Block[]>({
    path: "layout",
  });

  const addBlock = useCallback(
    (blockType: string, position?: number) => {
      const newBlock: Block = {
        id: generateBlockId(),
        blockType: `${blockType}-block`,
      } as Block;

      console.log("E", blocks);
      console.log("N", newBlock);

      if (typeof position === "number") {
        const newBlocks = [...blocks];
        newBlocks.splice(position, 0, newBlock);
        setValue(newBlocks);
      } else {
        setValue([...blocks, newBlock]);
      }
    },
    [blocks, setValue]
  );

  const updateBlock = useCallback(
    (blockId: string, updates: Partial<Block>) => {
      const newBlocks = blocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      );
      setValue(newBlocks);
    },
    [blocks, setValue]
  );

  const removeBlock = useCallback(
    (blockId: string) => {
      const newBlocks = blocks.filter((block) => block.id !== blockId);
      setValue(newBlocks);
    },
    [blocks, setValue]
  );

  const moveBlock = useCallback(
    (blockId: string, newPosition: number) => {
      const blockIndex = blocks.findIndex((block) => block.id === blockId);
      if (blockIndex === -1) return;

      const newBlocks = [...blocks];
      const [block] = newBlocks.splice(blockIndex, 1);
      newBlocks.splice(newPosition, 0, block);
      setValue(newBlocks);
    },
    [blocks, setValue]
  );

  return {
    blocks,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
  };
}
