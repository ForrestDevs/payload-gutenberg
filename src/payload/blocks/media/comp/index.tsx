import React from "react";
import { Page } from "@/payload-types";
import { cn } from "@/lib/utils";

type Props = Extract<
  NonNullable<Page["layout"]>[number],
  { blockType: "media-block" }
>;

export const MediaBlock: React.FC<
  {
    id?: string;
  } & Props
> = (props) => {
  const { title, blockName } = props;

  return (
    <div className={cn("flex")}>
      <figure className="max-w-full">
        <div className="relative aspect-video w-full max-w-2xl">
          {title}
          {/* <Image
            src={media  .url}
            alt={media.alt}
            fill
            className="object-cover rounded-lg"
          /> */}
        </div>
        {/* {caption && (
          <figcaption className="mt-2 text-sm text-gray-600 text-center">
            {caption}
          </figcaption>
        )} */}
      </figure>
    </div>
  );
};
