import React from "react";
import {
  BannerBlock,
  CallToActionBlock,
  MediaBlock,
} from "@/payload/types/blocks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type BlockType = BannerBlock | CallToActionBlock | MediaBlock;

interface BlockToolbarProps {
  block: BlockType;
  onRemove: (blockId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: (blockId: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function BlockToolbar({
  block,
  onRemove,
  onMoveUp,
  onMoveDown,
  onEdit,
  isFirst = false,
  isLast = false,
}: BlockToolbarProps) {
  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm rounded-md border border-gray-200 px-2 py-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-gray-50"
        onClick={onMoveUp}
        disabled={isFirst}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-gray-50"
        onClick={onMoveDown}
        disabled={isLast}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-gray-50"
        onClick={() => onEdit(block.id ?? "")}
      >
        <Settings className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={() => onRemove(block.id ?? "")}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
