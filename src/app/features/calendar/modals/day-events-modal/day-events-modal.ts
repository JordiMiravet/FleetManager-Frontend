import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';

import { EventInterface } from '../../interfaces/event';
import { EventMessagesService } from '../../services/event-messages-service/event-messages-service';

import { VehicleService } from '../../../vehicle/services/vehicle-service/vehicle-service';

import { EditButtonComponent } from '../../../../shared/components/buttons/edit-button/edit-button';
import { DeleteButtonComponent } from '../../../../shared/components/buttons/delete-button/delete-button';
import { CreateButtonComponent } from "../../../../shared/components/buttons/create-button/create-button";

@Component({
  selector: 'app-day-events-modal',
  standalone: true,
  imports: [
    CommonModule,
    EditButtonComponent,
    DeleteButtonComponent,
    CreateButtonComponent
  ],
  templateUrl: './day-events-modal.html',
  styleUrl: './day-events-modal.css',
})

export class DayEventsModalComponent {

  private vehicleService = inject(VehicleService);
  private messagesService = inject(EventMessagesService)

  date = input<string>('');
  events = input<EventInterface[]>([]);
  
  createEvent = output<void>();
  editEvent = output<string>();
  deleteEvent = output<string>();
  
  closeModal = output<void>();

  readonly dayEventsMsg = this.messagesService.dayEvents;
  readonly ariaMsg = this.messagesService.aria.dayEvents;
  
  onCreate() {
    this.createEvent.emit();
  }

  onEdit(id: string): void {
    this.editEvent.emit(id);
  }
  
  onDelete(id: string): void {
    this.deleteEvent.emit(id);
  }

  openDetails(index: number) {
    const list = document.querySelectorAll<HTMLDetailsElement>('.event-card');
    list.forEach((detail, i) => {
      if(i !== index) {
        detail.open = false;
      }
    });
  }

  handleClose() {
    this.closeModal.emit();
  }

  getVehicleName(vehicleId: string): string {
    const vehicle = this.vehicleService.vehicles().find(v => v._id === vehicleId);
    return vehicle?.name || this.dayEventsMsg.vehicleFallback;
  }

}
