import { EventInterface } from '../../models/event';
import { MOCK_EVENTS } from './event-data.mock';

export function loadMockEvents(): EventInterface[] {
    return [...MOCK_EVENTS];
}

export function getMockEventById(
    id: string
): EventInterface | undefined {
    return MOCK_EVENTS.find(event => event._id === id);
}

export function addMockEvent(
    events: EventInterface[],
    event: Omit<EventInterface, '_id'>
): EventInterface[] {
    let id = crypto.randomUUID();

    while (events.some(event => event._id === id)) {
        id = crypto.randomUUID();
    }

    const newEvent: EventInterface = {
        ...event,
        _id: id,
    };

    return [...events, newEvent];
}

export function updateMockEvent(
    events: EventInterface[],
    updatedEvent: EventInterface
): EventInterface[] {
    return events.map(event =>
        event._id === updatedEvent._id
            ? { ...event, ...updatedEvent }
            : event
    );
}

export function deleteMockEvent(
    events: EventInterface[],
    id: string
): EventInterface[] {
    return events.filter(event => event._id !== id);
}