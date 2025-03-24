// @ts-nocheck

"use client";

import React from "react";
import { Block } from "@/payload/types/blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";

interface BlockSettingsProps {
  block: Block;
  onClose: () => void;
  onUpdate: (blockId: string, updates: Partial<Block>) => void;
}

export function BlockSettings({
  block,
  onClose,
  onUpdate,
}: BlockSettingsProps) {
  const handleChange = (field: keyof Block, value: string) => {
    onUpdate(block.id ?? "", { [field]: value });
  };

  const handleImageChange = (url: string) => {
    onUpdate(block.id ?? "", {
      image: { url, alt: block.image?.alt || "" },
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Block Settings</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={block.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("title", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blockName">Block Name</Label>
          <Input
            id="blockName"
            value={block.blockName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("blockName", e.target.value)
            }
          />
        </div>

        {block.blockType === "banner-block" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={block.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange("content", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaText">CTA Text</Label>
              <Input
                id="ctaText"
                value={block.ctaText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("ctaText", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaUrl">CTA URL</Label>
              <Input
                id="ctaUrl"
                value={block.ctaUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("ctaUrl", e.target.value)
                }
              />
            </div>
          </>
        )}

        {block.blockType === "call-to-action-block" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={block.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange("content", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaText">CTA Text</Label>
              <Input
                id="ctaText"
                value={block.ctaText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("ctaText", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaUrl">CTA URL</Label>
              <Input
                id="ctaUrl"
                value={block.ctaUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("ctaUrl", e.target.value)
                }
              />
            </div>
          </>
        )}

        {block.blockType === "media-block" && (
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={block.image?.url || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleImageChange(e.target.value)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
