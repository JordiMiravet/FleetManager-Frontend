import { EventInterface } from '../../models/event';
import { MOCK_EVENTS } from './event-data.mock';

export function loadMockEvents(): EventInterface[] {
    return [...MOCK_EVENTS];
}

export function getMockEventById(id: string): EventInterface | undefined {

}

export function addMockEvent(event: Omit<EventInterface, '_id'>): EventInterface {

}

export function updateMockEvent(updatedEvent: EventInterface): EventInterface[] {

}

export function deleteMockEvent(id: string): EventInterface[] {

}