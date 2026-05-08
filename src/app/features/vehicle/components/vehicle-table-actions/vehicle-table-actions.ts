import { Component, inject, output, signal } from '@angular/core';
import { SortDir, SortField, VehicleFilterState } from '../../interfaces/vehicle-filter-state/vehicle-filter-state';
import { VehicleMessagesService } from '../../i18n/vehicle-messages-service';

@Component({
  selector: 'app-vehicle-table-actions',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-table-actions.html',
  styleUrl: './vehicle-table-actions.css',
})
export class VehicleTableActionsComponent {
  private readonly messagesService = inject(VehicleMessagesService);
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
