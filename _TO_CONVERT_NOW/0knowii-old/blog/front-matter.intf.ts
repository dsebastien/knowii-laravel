export interface FrontMatter {
  /**
   * Override the default slug if needed
   */
  slug?: string;
  title: string;
  summary: string;
  publishedOn: string;
  image: string;
  /**
   * Image details will be added automatically
   */
  imageDetails?: {
    width: number;
    height: number;
    src: string;
  };
  author?: string;
  /**
   * Image to use for the author. Default will be used if not provided
   */
  authorImage?: string;
  /**
   * Link for the author avatar
   */
  authorLink?: string;
  /**
   * Whether the post is published or not
   */
  published: boolean;
  /**
   * To be used for highlighting posts
   */
  featured?: boolean;
  /**
   * To be used for display (tags)
   */
  categories: string[];
  /**
   * Used as page meta keywords if provided
   */
  keywords: string[];
  /**
   * Used to override the canonical URL of the page
   */
  canonicalUrl?: string;
  /**
   * Added automatically
   */
  wordCount?: number;
  /**
   * Added automatically
   */
  readingTime?: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}
