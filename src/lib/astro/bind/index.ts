export type BindImageData = {
  src: ImageMetadata;
  alt?: string;
  caption?: Record<string, string> | null;
  [x: string]: unknown;
};
