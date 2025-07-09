export interface ArticleSearchParams {
  query: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'likes' | 'dislikes' | 'date';
}
