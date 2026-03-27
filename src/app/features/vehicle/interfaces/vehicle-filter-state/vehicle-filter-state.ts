export type SortField = 'name' | 'plate' | 'model';
export type SortDir = 'asc' | 'desc';

export interface VehicleFilterState {
  query: string;
  sortField: SortField;
  sortDir: SortDir;
}