"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlockSelectorProps {
  onSelect: (blockType: string) => void;
  className?: string;
}

const BLOCK_TYPES = [
  { id: "banner", label: "Banner" },
  { id: "call-to-action", label: "Call to Action" },
  { id: "media", label: "Media" },
];

export function BlockSelector({ onSelect, className }: BlockSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (blockType: string) => {
    onSelect(blockType);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-6 w-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
            className
          )}
        >
          <span className="sr-only">Add block</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-1">
          {BLOCK_TYPES.map((block) => (
            <button
              key={block.id}
              className="w-full rounded-md px-2 py-1.5 text-sm text-left hover:bg-gray-100 transition-colors"
              onClick={() => handleSelect(block.id)}
            >
              {block.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
