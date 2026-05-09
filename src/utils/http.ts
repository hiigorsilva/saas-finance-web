export interface IHttpResponse<T> {
  statusCode: number
  body: T
}

export interface IPaginateResponse<T> {
  data: T[]
  totalCount: number
  totalPages: number
  currentPage: number
  limit: number
}
