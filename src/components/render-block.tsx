import React, { Fragment } from "react";
import type { Page } from "@/payload-types";
import { BannerBlock } from "@/payload/blocks/banner/comp";
import { CallToActionBlock } from "@/payload/blocks/call-to-action/comp";
import { MediaBlock } from "@/payload/blocks/media/comp";

const blockComponents = {
  "banner-block": BannerBlock,
  "call-to-action-block": CallToActionBlock,
  "media-block": MediaBlock,
} as const;

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page["layout"]>[number][];
}> = (props) => {
  const { blocks } = props;
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <div className="space-y-8" key={blocks.length}>
        {blocks.map((block) => (
          <Fragment>
            {blocks.map((block, index) => {
              const { blockType } = block;
              const Block = blockComponents[blockType];

              return Block ? (
                <div className="" key={index}>
                  {/* @ts-ignore */}
                  <Block {...block} id={block.id?.toString()} />
                </div>
              ) : null;
            })}
          </Fragment>
        ))}
      </div>
    );
  }
  return null;
};
