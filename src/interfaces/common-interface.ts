export interface IPaginateParams {
  perPage: number;
  currentPage: number;
}

export interface IPagination {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
}

export interface IWithPagination<T = any> {
  data: T;
  pagination: IPagination;
}

export interface ITokenInstance {
  token: string;
  expiresIn: number;
}
