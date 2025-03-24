export interface BaseBlock {
  id: string;
  blockType: string;
  title: string;
  blockName: string;
}

export interface BannerBlock extends BaseBlock {
  blockType: "banner-block";
  content: string;
  ctaText: string;
  ctaUrl: string;
}

export interface CallToActionBlock extends BaseBlock {
  blockType: "call-to-action-block";
  content: string;
  ctaText: string;
  ctaUrl: string;
}

export interface MediaBlock extends BaseBlock {
  blockType: "media-block";
  image: {
    url: string;
    alt: string;
  };
}

export type Block = BannerBlock | CallToActionBlock | MediaBlock;
