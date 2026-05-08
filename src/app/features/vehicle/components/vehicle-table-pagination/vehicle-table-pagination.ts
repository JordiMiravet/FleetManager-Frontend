import { Component, inject } from '@angular/core';
import { VehicleService } from '../../data-access/vehicle-service';
import { VehicleMessagesService } from '../../i18n/vehicle-messages-service';

@Component({
  selector: 'app-vehicle-table-pagination',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-table-pagination.html',
  styleUrl: './vehicle-table-pagination.css',
})
export class VehicleTablePaginationComponent {
  
  private readonly vehicleService = inject(VehicleService);
  private readonly messagesService = inject(VehicleMessagesService);

  public vehicles = this.vehicleService.vehicles;
  public paginationMsg = this.messagesService.pagination;

  // TODO: No hago lógica todavía, solo muestro el total desde VehicleService.
  // TODO: Cuando haga la paginación de verdad, habrá que pasar total, currentPage y pageSize desde el padre.
  
}
