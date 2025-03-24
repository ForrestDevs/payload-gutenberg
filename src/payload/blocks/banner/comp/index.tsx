import React from "react";
import { BannerBlock as BannerBlockType, Page } from "@/payload-types";
import { cn } from "@/lib/utils";
import RichText from "@/components/rich-text";
type Props = Extract<
  NonNullable<Page["layout"]>[number],
  { blockType: "banner-block" }
>;

export const BannerBlock: React.FC<
  {
    id?: string;
  } & Props
> = (props) => {
  const { style, content } = props;

  const styles = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
    success: "bg-green-50 text-green-800 border-green-200",
  };

  return (
    <div className={cn("p-4 rounded-lg border", styles[style])}>
      <RichText content={content} />
    </div>
  );
};
