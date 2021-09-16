export interface IArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string | number; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface IArticlesCollection {
  articles: IArticle[];
}

export interface IPagination {
  articlesPerPage: number;
  totalArticles: number;
  paginate: (pageNumber: number) => void;
}
