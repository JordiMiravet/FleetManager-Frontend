import { Component, inject } from '@angular/core';
import { VehicleService } from '../../services/vehicle-service/vehicle-service';
import { VehicleMessagesService } from '../../services/vehicle-messages-service/vehicle-messages-service';

@Component({
  selector: 'app-vehicle-table-pagination',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-table-pagination.html',
  styleUrl: './vehicle-table-pagination.css',
})
export class VehicleTablePaginationComponent {
  
  private vehicleService = inject(VehicleService);
  private messagesService = inject(VehicleMessagesService);

  public vehicles = this.vehicleService.vehicles;
  public paginationMsg = this.messagesService.pagination;

  // TODO: No hago lógica todavía, solo muestro el total desde VehicleService.
  // TODO: Cuando haga la paginación de verdad, habrá que pasar total, currentPage y pageSize desde el padre.
  
}
