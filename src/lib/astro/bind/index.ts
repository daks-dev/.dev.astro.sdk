export type BindImageData = {
  src: ImageMetadata;
  alt?: string;
  caption?: Record<string, string>;
  [x: string]: unknown;
};
