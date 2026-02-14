export interface Image {
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

export interface ImageInput {
  id?: string;
  url?: string;
  file?: File;
  alt: string;
  caption?: string;
}
