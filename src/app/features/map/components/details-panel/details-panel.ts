import { Component, inject, input, output } from '@angular/core';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle';
import { MapMessagesService } from '../../services/map-messages-service/map-messages-service';

@Component({
  selector: 'app-details-panel',
  imports: [],
  templateUrl: './details-panel.html',
  styleUrl: './details-panel.css',
})
export class DetailsPanelComponent {

  private readonly messagesService = inject(MapMessagesService);
  public readonly detailsPanelMsg = this.messagesService.detailsPanel;

  public click = output<void>();
  public vehicle = input<VehicleInterface | null>(null);

}
