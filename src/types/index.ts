export interface Period {
  startDate: Date;
  endDate: Date;
}

export interface PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface CategorySales {
  category: string;
  sales: number;
  percentage?: number;
}

export interface TotalSales {
  totalSales: number;
  period: string;
}

export interface TrendingProduct {
  _id: string;
  name: string;
  totalSales: number;
  category: string;
}
