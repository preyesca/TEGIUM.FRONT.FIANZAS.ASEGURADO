export interface IPaginate<T> {
  docs: Array<T>;
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface IRequestPaginate {
  paginate: {
      limit?: any,
      page?: any,
      search?: any
  }
}