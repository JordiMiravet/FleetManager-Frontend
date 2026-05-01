import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EventInterface } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/events';

  private _allEvents = signal<EventInterface[]>([]);
  public selectedVehicleId = signal<string | null>(null);

  public calendarEvents = computed(() => {
    const vehicleId = this.selectedVehicleId();
    if (!vehicleId) return this._allEvents();
    return this._allEvents().filter(event => event.vehicleId === vehicleId);
  });

  loadEvents(): void {
    this.http.get<EventInterface[]>(this.apiUrl)
      .subscribe(events => this._allEvents.set(events));
  }

  getEventById(id: string): Observable<EventInterface> {
    return this.http.get<EventInterface>(`${this.apiUrl}/${id}`);
  }

  getEventsByDate(date: string): EventInterface[] {
    return this.calendarEvents().filter(
      event => event.date === date
    );
  }

  addEvent(event: Omit<EventInterface, '_id'>): void {
    this.http.post<EventInterface>(this.apiUrl, event)
      .subscribe(newEvent => {
        this._allEvents.update(events => [...events, newEvent]);
      });
  }

  updateEvent(updatedEvent: EventInterface): void {
    const eventData = {
      title: updatedEvent.title,
      date: updatedEvent.date,
      hourStart: updatedEvent.hourStart,
      hourEnd: updatedEvent.hourEnd,
      vehicleId: updatedEvent.vehicleId,
      comment: updatedEvent.comment || ''
    };

    this.http.put<EventInterface>(`${this.apiUrl}/${updatedEvent._id}`, eventData)
      .subscribe(event => {
        this._allEvents.update(events =>
          events.map(e => e._id === event._id 
            ? event 
            : e
          )
        );
      });
  }

  deleteEvent(id: string): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this._allEvents.update(events =>
          events.filter(e => e._id !== id)
        );
      });
  }

}