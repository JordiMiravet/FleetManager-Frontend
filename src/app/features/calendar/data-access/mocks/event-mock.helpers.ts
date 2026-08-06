import { EventInterface } from '../../models/event';
import { MOCK_EVENTS } from './event-data.mock';

export function loadMockEvents(): EventInterface[] {
    return [...MOCK_EVENTS];
}

export function getMockEventById(id: string): EventInterface | undefined {
    return MOCK_EVENTS.find(event => event._id === id);
}

export function addMockEvent(
    event: Omit<EventInterface, '_id'>
): EventInterface {
    const newEvent: EventInterface = {
        ...event,
        _id: crypto.randomUUID(),
    };

    MOCK_EVENTS.push(newEvent);

    return newEvent;
}

export function updateMockEvent(updatedEvent: EventInterface): EventInterface[] {

}

export function deleteMockEvent(id: string): EventInterface[] {

}