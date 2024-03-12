export type Meta = {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
export interface Payload<T> {
  data: T;
  meta: Meta;
}
