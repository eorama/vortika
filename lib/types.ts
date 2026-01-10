export type Category = {
  id: string;
  title: string;
  description: string;
  slug: string;
  iconName: string; // Lucide icon name or custom
  image: string; // Path to image
  translations?: Record<string, number>;
};

export type Series = {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  categoryId: string;
  articleCount: number;
  categoryName?: string;
  translations?: Record<string, number>;
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML
  slug: string;
  seriesId: string;
  orderInSeries: number;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  seriesName?: string;
  translations?: Record<string, number>;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  subscribedSeries: string[];
};

export type Page = {
  id: string;
  title: string;
  content: string;
  slug: string;
  date?: string;
  modified?: string;
};
