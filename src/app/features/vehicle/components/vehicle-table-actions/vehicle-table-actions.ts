import { Component, inject, output, signal } from '@angular/core';
import { VehicleMessagesService } from '../../services/vehicle-messages-service/vehicle-messages-service';
import { SortDir, SortField, VehicleFilterState } from '../../interfaces/vehicle-filter-state/vehicle-filter-state';

@Component({
  selector: 'app-vehicle-table-actions',
  imports: [],
  templateUrl: './vehicle-table-actions.html',
  styleUrl: './vehicle-table-actions.css',
})
export class VehicleTableActionsComponent {
  private messagesService = inject(VehicleMessagesService);
  public readonly actionsMsg = this.messagesService.tableActions;

  public query = signal<string>('');
  public sortField = signal<SortField>('name');
  public sortDir = signal<SortDir>('asc');

  filterChange = output<VehicleFilterState>();

  onQueryChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.emit();
  }
  onSortFieldChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SortField;
    this.sortField.set(value);
    this.emit();
  }

  toggleSortDir(): void {
    this.sortDir.update(dir => dir === 'asc' ? 'desc' : 'asc');
    this.emit();
  }

  private emit(): void {
    this.filterChange.emit({
      query: this.query(),
      sortField: this.sortField(),
      sortDir: this.sortDir()
    });
  }
}
