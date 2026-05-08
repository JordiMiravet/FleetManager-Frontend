import { Component, inject, output } from '@angular/core';
import { CreateButtonComponent } from "../../../../shared/components/buttons/create-button/create-button";
import { VehicleMessagesService } from '../../i18n/vehicle-messages-service';

@Component({
  selector: 'app-vehicle-empty-state',
  standalone: true,
  imports: [CreateButtonComponent],
  templateUrl: './vehicle-empty-state.html',
  styleUrl: './vehicle-empty-state.css',
})
export class VehicleEmptyStateComponent {

  private readonly messagesService = inject(VehicleMessagesService);
  readonly emptyStateMsg = this.messagesService.emptyState;

  readonly createVehicle = output<void>();

  onClick(){
    this.createVehicle.emit()
  }

}
