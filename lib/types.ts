export type Category = {
  id: string;
  title: string;
  description: string;
  slug: string;
  iconName: string; // Lucide icon name or custom
  image: string; // Path to image
};

export type Series = {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  categoryId: string;
  articleCount: number;
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
};

export type User = {
  id: string;
  email: string;
  name?: string;
  subscribedSeries: string[];
};
