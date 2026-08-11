import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DataSource } from './data-source.type';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  private readonly _current = signal<DataSource>(environment.dataSource);

  public readonly current = this._current.asReadonly();

  isMock(): boolean {
    return this._current() === 'mock';
  }

  isApi(): boolean {
    return this._current() === 'api';
  }

}