import React from "react";
import { Page } from "@/payload-types";
import { cn } from "@/lib/utils";

type Props = Extract<
  NonNullable<Page["layout"]>[number],
  { blockType: "call-to-action-block" }
>;

export const CallToActionBlock: React.FC<
  {
    id?: string;
  } & Props
> = (props) => {
  const { richText, blockName } = props;

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="prose max-w-none mb-6">
        {richText?.root.children.map((child, index) => (
          <p key={index}>{child.type}</p>
        ))}
      </div>
    </div>
  );
};
